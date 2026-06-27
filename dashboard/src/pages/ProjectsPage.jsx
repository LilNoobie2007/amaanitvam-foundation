import { useState, useEffect } from 'react';
import { FolderKanban, Loader2, Plus, Edit2 } from 'lucide-react';
import api from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function ProjectsPage() {
  const { userProfile } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', progress: 0 });
  const [users, setUsers] = useState([]);
  const isAdmin = userProfile?.role === 'admin' || userProfile?.role === 'super_admin';

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.projects || []);
      if (isAdmin) {
        const res = await api.get('/admin/members');
        setUsers(res.data.members || []);
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formData);
        toast.success('Project updated');
      } else {
        await api.post('/projects/create', formData);
        toast.success('Project created');
      }
      setShowCreate(false);
      setEditingId(null);
      setFormData({ title: '', description: '', progress: 0, assignedMembers: [] });
      fetchProjects();
    } catch { toast.error(editingId ? 'Failed to update project' : 'Failed to create project'); }
  };

  const openEdit = (p) => {
    setFormData({ title: p.title || p.name, description: p.description || '', progress: p.progress || 0, assignedMembers: p.assignedMembers?.map(m => m._id) || [] });
    setEditingId(p._id);
    setShowCreate(true);
  };

  const toggleMember = (userId) => {
    setFormData(prev => ({
      ...prev,
      assignedMembers: prev.assignedMembers.includes(userId)
        ? prev.assignedMembers.filter(id => id !== userId)
        : [...(prev.assignedMembers || []), userId]
    }));
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 text-[#56051a] animate-spin" /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">Track project progress</p>
        </div>
        {isAdmin && (
          <button onClick={() => { setEditingId(null); setFormData({ title: '', description: '', progress: 0, assignedMembers: [] }); setShowCreate(true); }} className="px-4 py-2 bg-[#56051a] text-white rounded-xl font-medium text-sm hover:bg-[#7a1e3a] transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Project
          </button>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 mb-4">{editingId ? 'Edit Project' : 'Create Project'}</h2>
            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              {isAdmin ? (
                <div><label className="block text-sm font-medium mb-1">Title</label><input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-xl text-sm" /></div>
              ) : (
                <div className="mb-2"><h3 className="font-semibold text-slate-800">{formData.title}</h3></div>
              )}
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-xl text-sm" rows="3"></textarea></div>
              <div><label className="block text-sm font-medium mb-1">Progress (%)</label><input type="number" min="0" max="100" required value={formData.progress} onChange={e => setFormData({...formData, progress: e.target.value})} className="w-full px-3 py-2 border rounded-xl text-sm" /></div>
              
              {isAdmin && (
                <div>
                  <label className="block text-sm font-medium mb-2">Assign Members (Private Project)</label>
                  <div className="max-h-40 overflow-y-auto border rounded-xl p-2 space-y-1">
                    {users.map(u => (
                      <label key={u._id} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.assignedMembers?.includes(u._id)}
                          onChange={() => toggleMember(u._id)}
                          className="rounded text-[#56051a] focus:ring-[#56051a]"
                        />
                        <span className="text-sm">{u.name} <span className="text-xs text-slate-400">({u.role})</span></span>
                      </label>
                    ))}
                    {users.length === 0 && <p className="text-xs text-slate-500 text-center">No members found</p>}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#56051a] rounded-xl hover:bg-[#7a1e3a]">{editingId ? 'Save' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <FolderKanban className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-400">No projects yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(p => (
            <div key={p._id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow relative">
              <button onClick={() => openEdit(p)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#56051a] hover:bg-slate-100 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <div className="flex justify-between items-start mb-3 pr-10">
                <div>
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    {p.title || p.name}
                    {p.status === 'pending_approval' && <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-lg border bg-purple-100 text-purple-700 border-purple-200">Pending Approval</span>}
                  </h3>
                </div>
                <span className="text-sm font-bold text-[#56051a]">{p.progress || 0}%</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{p.description || 'No description'}</p>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3">
                <div className="bg-[#56051a] h-2.5 rounded-full transition-all duration-500" style={{ width: `${p.progress || 0}%` }}></div>
              </div>
              
              {p.status === 'pending_approval' && isAdmin && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <button onClick={async () => {
                    try {
                      await api.put(`/projects/${p._id}`, { status: 'completed', progress: 100 });
                      fetchProjects();
                    } catch { toast.error('Error approving project'); }
                  }} className="px-3 py-1.5 flex-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium hover:bg-emerald-100 text-center">
                    Approve
                  </button>
                  <button onClick={async () => {
                    try {
                      await api.put(`/projects/${p._id}`, { status: 'ongoing', progress: 90 });
                      fetchProjects();
                    } catch { toast.error('Error rejecting project'); }
                  }} className="px-3 py-1.5 flex-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 text-center">
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
