import { useState, useEffect } from 'react';
import { Award, Search, Download, CheckCircle, XCircle, ShieldCheck, Upload } from 'lucide-react';
import api from '../config/api';
import toast from 'react-hot-toast';

export default function Certificates() {
  const [uploadingCertId, setUploadingCertId] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/certificates');
      setCertificates(res.data.certificates || res.data || []);
    } catch (err) {
      toast.error('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verifyId.trim()) {
      toast.error('Please enter a certificate ID');
      return;
    }
    setVerifying(true);
    setVerifyResult(null);
    try {
      const res = await api.get(`/certificates/verify/${verifyId.trim()}`);
      setVerifyResult(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setVerifyResult({ success: false, message: 'Certificate not found. This certificate ID is invalid.' });
      } else {
        toast.error('Verification failed');
      }
    } finally {
      setVerifying(false);
    }
  };

  const downloadCertificate = async (id) => {
    try {
      const response = await api.get(`/admin/certificates/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to download certificate');
    }
  };
  
  
  const uploadCertificatePdf = async (id, file) => {
  if (!file) return;

  if (file.type !== 'application/pdf') {
    toast.error('Please upload a PDF file only');
    return;
  }

  const formData = new FormData();
  formData.append('certificate', file);

  setUploadingCertId(id);

  try {
    await api.put(`/admin/certificates/${id}/file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    toast.success('Certificate PDF uploaded successfully');
    fetchCertificates();
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to upload certificate PDF');
  } finally {
    setUploadingCertId(null);
  }
};
  
  

  const SkeletonRow = () => (
    <tr className="border-b border-slate-50">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Certificate Management</h1>
        <button
          onClick={() => { setShowVerifyModal(true); setVerifyResult(null); setVerifyId(''); }}
          className="bg-[#56051a] hover:bg-[#7a1e3a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          Verify Certificate
        </button>
      </div>

      {/* Issued Certificates Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Issued Certificates</h2>
          <p className="text-sm text-slate-500 mt-1">All certificates issued by Amaanitvam Foundation</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Certificate ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Issued To</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Issue Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
              ) : certificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <Award className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-medium">No certificates issued yet</p>
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-800 font-mono font-semibold">
                      {cert.certificateId || '\u2014'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{cert.issuedTo}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{cert.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{cert.domain || '\u2014'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {cert.issueDate || cert.createdAt
                        ? new Date(cert.issueDate || cert.createdAt).toLocaleDateString('en-IN')
                        : '\u2014'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {cert.isValid !== false ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                          <CheckCircle className="w-3 h-3" /> Valid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700">
                          <XCircle className="w-3 h-3" /> Revoked
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-2">
  <label className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer">
    <Upload className="w-3 h-3" />
    {uploadingCertId === cert._id ? 'Uploading...' : 'Upload PDF'}

    <input
      type="file"
      accept="application/pdf"
      className="hidden"
      disabled={uploadingCertId === cert._id}
      onChange={(e) => uploadCertificatePdf(cert._id, e.target.files?.[0])}
    />
  </label>

  <button
    onClick={() => downloadCertificate(cert._id)}
    className="bg-slate-50 text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
  >
    <Download className="w-3 h-3" />
    Download
  </button>

  {cert.pdfUploadedAt && (
    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
      PDF uploaded
    </span>
  )}
</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verify Certificate Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-[slideUp_0.25s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Verify Certificate</h2>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Certificate ID</label>
                <input
                  type="text"
                  value={verifyId}
                  onChange={(e) => setVerifyId(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#56051a]/20 focus:border-[#56051a]/30 font-mono uppercase"
                  placeholder="e.g. AF-2026-001"
                />
              </div>
              <button
                type="submit"
                disabled={verifying}
                className="w-full bg-[#56051a] hover:bg-[#7a1e3a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                {verifying ? 'Verifying...' : 'Verify'}
              </button>
            </form>

            {verifyResult && (
              <div className="mt-6">
                {verifyResult.success ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-emerald-800">Certificate Verified</span>
                    </div>
                    <div className="space-y-2 text-sm text-emerald-900">
                      <p><span className="font-medium">ID:</span> {verifyResult.certificate.certificateId}</p>
                      <p><span className="font-medium">Issued To:</span> {verifyResult.certificate.issuedTo}</p>
                      <p><span className="font-medium">Type:</span> {verifyResult.certificate.type}</p>
                      <p><span className="font-medium">Domain:</span> {verifyResult.certificate.domain || '\u2014'}</p>
                      <p><span className="font-medium">Issue Date:</span> {new Date(verifyResult.certificate.issueDate).toLocaleDateString('en-IN')}</p>
                      <p><span className="font-medium">Status:</span> {verifyResult.certificate.isValid ? '✅ Valid' : '❌ Revoked'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">Invalid Certificate</span>
                    </div>
                    <p className="text-sm text-red-700 mt-2">{verifyResult.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
