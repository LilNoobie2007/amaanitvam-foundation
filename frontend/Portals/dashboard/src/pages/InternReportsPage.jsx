import { useState, useEffect } from 'react';
import { BarChart3, Loader2 } from 'lucide-react';
import api from '../config/api';
import toast from 'react-hot-toast';

export default function InternReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Placeholder logic for now since backend routes might not exist yet
    // api.get('/reports').then(({ data }) => setReports(data.reports || [])).catch(() => toast.error('Failed to load reports')).finally(() => setLoading(false));
    setLoading(false);
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 text-[#56051a] animate-spin" /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Intern Reports</h1>
        <p className="text-sm text-slate-500 mt-1">View and manage intern performance reports</p>
      </div>
      {reports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <BarChart3 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-slate-400">No reports found. Backend implementation pending (Task assigned to Person 2).</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Map reports here */}
        </div>
      )}
    </div>
  );
}
