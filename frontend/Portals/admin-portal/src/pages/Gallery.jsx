import { useState, useEffect } from 'react';
import { Image, Upload, Trash2, Loader2, Plus, Eye, X } from 'lucide-react';
import api from '../config/api';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editFile, setEditFile] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await api.get('/gallery');
      setImages(data.images || []);
    } catch (err) {
      setError('Failed to load gallery images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !newTitle) {
      setError('Please provide a title and select an image');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('image', selectedFile);

    try {
      await api.post('/admin/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsModalOpen(false);
      setNewTitle('');
      setSelectedFile(null);
      fetchImages(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (img) => {
    setEditingImage(img);
    setEditTitle(img.title);
    setEditFile(null);
    setIsEditModalOpen(true);
  };

  const handleEditFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditFile(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle) {
      setError('Title cannot be empty');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', editTitle);
    if (editFile) {
      formData.append('image', editFile);
    }

    try {
      await api.put(`/admin/gallery/${editingImage._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditModalOpen(false);
      setEditingImage(null);
      setEditTitle('');
      setEditFile(null);
      fetchImages(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await api.delete(`/admin/gallery/${id}`);
      setImages(images.filter(img => img._id !== id));
    } catch (err) {
      console.error('Failed to delete image', err);
      alert('Failed to delete image');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gallery Management</h1>
          <p className="text-sm text-slate-500 mt-1">Add or remove images from the main website gallery</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#56051a] hover:bg-[#56051a]/90 text-white rounded-xl font-medium transition-all shadow-sm shadow-[#56051a]/20"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {error && !isModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-[#56051a] animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Images Found</h3>
          <p className="text-slate-500">The gallery is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group">
              <div className="aspect-[4/3] relative bg-slate-100">
                <img 
                  src={`${api.defaults.baseURL.replace('/api', '')}${img.imageUrl}`} 
                  alt={img.title} 
                  className="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => setViewingImage(img)}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg transition-colors"
                    title="View Image"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleEditClick(img)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
                    title="Edit Image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(img._id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100">
                <h3 className="font-semibold text-slate-900 truncate" title={img.title}>
                  {img.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Added on {new Date(img.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative animate-[slideUp_0.25s_ease-out]">
            <button 
              onClick={() => setViewingImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-[60vh] bg-slate-100 flex items-center justify-center overflow-hidden">
              <img 
                src={`${api.defaults.baseURL.replace('/api', '')}${viewingImage.imageUrl}`} 
                alt={viewingImage.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-white">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{viewingImage.title}</h2>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
                <p><span className="font-semibold">Uploaded On:</span> {new Date(viewingImage.createdAt).toLocaleString()}</p>
                <p><span className="font-semibold">Type:</span> {viewingImage.contentType || 'N/A'}</p>
                <p><span className="font-semibold">ID:</span> {viewingImage._id}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Add New Image</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6">
              {error && isModalOpen && (
                <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Image Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Project Manthan Event"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#56051a]/20 focus:border-[#56051a]/30 transition-all outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Upload Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[#56051a] hover:text-[#56051a]/80 focus-within:outline-none">
                          <span>{selectedFile ? selectedFile.name : 'Upload a file'}</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleFileSelect}
                            required
                          />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !selectedFile || !newTitle}
                  className="flex items-center gap-2 px-4 py-2 bg-[#56051a] text-white text-sm font-medium rounded-xl hover:bg-[#56051a]/90 disabled:opacity-50 transition-colors"
                >
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {uploading ? 'Uploading...' : 'Save Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Edit Image</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6">
              {error && isEditModalOpen && (
                <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Image Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Project Manthan Event"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#56051a]/20 focus:border-[#56051a]/30 transition-all outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Upload New Image (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label htmlFor="edit-file-upload" className="relative cursor-pointer rounded-md font-medium text-[#56051a] hover:text-[#56051a]/80 focus-within:outline-none">
                          <span>{editFile ? editFile.name : 'Upload a new file to replace the old one'}</span>
                          <input 
                            id="edit-file-upload" 
                            name="edit-file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            onChange={handleEditFileSelect}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">Leave empty to keep current image</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !editTitle}
                  className="flex items-center gap-2 px-4 py-2 bg-[#56051a] text-white text-sm font-medium rounded-xl hover:bg-[#56051a]/90 disabled:opacity-50 transition-colors"
                >
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {uploading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
