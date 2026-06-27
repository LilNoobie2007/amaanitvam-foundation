import { useState, useEffect } from 'react';
import { Heart, Download, IndianRupee, CalendarDays } from 'lucide-react';
import api from '../config/api';
import toast from 'react-hot-toast';

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
const [campaigns, setCampaigns] = useState([]);

const [showCampaignModal, setShowCampaignModal] = useState(false);

const [campaignForm, setCampaignForm] = useState({
  title: '',
  description: '',
  goalAmount: '',
  status: 'active'
});
  useEffect(() => {
  fetchDonations();
  fetchCampaigns();
}, []);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/donations');
      setDonations(res.data.donations || res.data || []);
    } catch (err) {
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };
const fetchCampaigns = async () => {
  try {
    const res = await api.get('/admin/campaigns');
    setCampaigns(res.data.campaigns || []);
  } catch (err) {
    console.error(err);
    toast.error('Failed to load campaigns');
  }
};
const createCampaign = async (e) => {
  e.preventDefault();

  try {
    await api.post('/admin/campaigns', campaignForm);

    toast.success('Campaign created successfully');

    setShowCampaignModal(false);

    setCampaignForm({
      title: '',
      description: '',
      goalAmount: '',
      status: 'active'
    });

    fetchCampaigns();
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to create campaign');
  }
};
  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  const thisMonthAmount = donations
    .filter((d) => {
      if (!d.createdAt) return false;
      const date = new Date(d.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const exportCSV = () => {
    if (donations.length === 0) {
      toast.error('No donations to export');
      return;
    }
    const headers = ['Donor Name', 'Email', 'Amount', 'Payment ID', 'Date', 'Status'];
    const rows = donations.map((d) => [
      d.name || d.donorName || 'Anonymous',
      d.email || '',
      d.amount || 0,
      d.paymentId || d.razorpay_payment_id || '',
      d.createdAt ? new Date(d.createdAt).toLocaleDateString('en-IN') : '',
      d.status || 'paid',
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `donations_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully!');
  };

  const getStatusBadge = (status) => {
    const styles = {
      paid: 'bg-emerald-50 text-emerald-700',
      pending: 'bg-amber-50 text-amber-700',
      failed: 'bg-red-50 text-red-700',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
        {status}
      </span>
    );
  };

  const SkeletonRow = () => (
    <tr className="border-b border-slate-50">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );

  const statCards = [
    { title: 'Total Donations', value: `₹${totalAmount.toLocaleString('en-IN')}`, icon: IndianRupee, bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
    { title: 'This Month', value: `₹${thisMonthAmount.toLocaleString('en-IN')}`, icon: CalendarDays, bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
    { title: 'Total Transactions', value: donations.length, icon: Heart, bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  ];

  return (
    <>
    <div>
      {/* Topbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Donations</h1>
       <div className="flex gap-3">

  <button
    onClick={() => setShowCampaignModal(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
  >
    + Add Campaign
  </button>

  <button
    onClick={exportCSV}
    className="bg-[#56051a] hover:bg-[#7a1e3a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
  >
    <Download className="w-4 h-4" />
    Export CSV
  </button>

</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <div className={`${card.bgColor} ${card.textColor} rounded-lg w-10 h-10 flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            {loading ? (
              <div className="h-9 bg-slate-200 rounded animate-pulse w-28 mt-3" />
            ) : (
              <p className="text-3xl font-bold text-slate-800 mt-3">{card.value}</p>
            )}
          </div>
        ))}
      </div>
         {/* Campaign Section */}

<div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 mb-8">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-xl font-bold text-slate-800">
      Fundraising Campaigns
    </h2>

    <span className="text-sm text-slate-500">
      {campaigns.length} Campaigns
    </span>

  </div>

  {campaigns.length === 0 ? (

    <div className="text-center py-10 text-slate-400">

      No Campaigns Yet

    </div>

  ) : (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {campaigns.map((campaign) => {

        const progress =
          campaign.goalAmount > 0
            ? (campaign.raisedAmount / campaign.goalAmount) * 100
            : 0;

        return (

          <div
            key={campaign._id}
            className="border rounded-xl p-5 hover:shadow-md transition"
          >

            <h3 className="font-bold text-lg">

              {campaign.title}

            </h3>

            <p className="text-sm text-slate-500 mt-2">

              {campaign.description}

            </p>

            <div className="mt-4">

              <div className="flex justify-between text-sm">

                <span>

                  ₹{campaign.raisedAmount.toLocaleString("en-IN")}

                </span>

                <span>

                  ₹{campaign.goalAmount.toLocaleString("en-IN")}

                </span>

              </div>

              <div className="w-full h-2 bg-slate-200 rounded-full mt-2">

                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{
                    width: `${Math.min(progress,100)}%`
                  }}
                />

              </div>

            </div>

            <div className="mt-4">

              <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 capitalize">

                {campaign.status}

              </span>

            </div>

          </div>

        );

      })}

    </div>

  )}

</div>
      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Donor Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : donations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-medium">No donations found</p>
                    <p className="text-xs text-slate-400 mt-1">Donations will appear here once received.</p>
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation._id || donation.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{donation.name || donation.donorName || 'Anonymous'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{donation.email || '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-semibold">
                      ₹{(donation.amount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono text-xs">
                      {donation.paymentId || donation.razorpay_payment_id || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {donation.createdAt ? new Date(donation.createdAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                    <td className="px-6 py-4 text-sm">{getStatusBadge(donation.status || 'paid')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {/* Add Campaign Modal */}

{showCampaignModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Add Campaign
      </h2>

      <form onSubmit={createCampaign} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Title
          </label>

          <input
            type="text"
            required
            value={campaignForm.title}
            onChange={(e) =>
              setCampaignForm({
                ...campaignForm,
                title: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>

          <textarea
            rows="3"
            value={campaignForm.description}
            onChange={(e) =>
              setCampaignForm({
                ...campaignForm,
                description: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Goal Amount
          </label>

          <input
            type="number"
            required
            value={campaignForm.goalAmount}
            onChange={(e) =>
              setCampaignForm({
                ...campaignForm,
                goalAmount: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>

          <select
            value={campaignForm.status}
            onChange={(e) =>
              setCampaignForm({
                ...campaignForm,
                status: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-3">

          <button
            type="button"
            onClick={() => setShowCampaignModal(false)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-[#56051a] text-white px-5 py-2 rounded-lg"
          >
            Create Campaign
          </button>

        </div>

      </form>

    </div>

  </div>
)}
  </>
  );
}
