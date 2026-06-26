import { useAuth } from '../contexts/AuthContext';
import { Mail, Phone, Building, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { userProfile } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#56051a] to-[#7a1e3a] px-6 py-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold">
            {userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <h2 className="text-xl font-bold text-white mt-3">{userProfile?.name || 'User'}</h2>
          <span className="inline-block mt-1 px-3 py-1 text-xs font-medium uppercase tracking-wide bg-white/20 text-white rounded-full">
            {userProfile?.role || 'member'}
          </span>
        </div>

        <div className="p-6 space-y-4">
          <ProfileRow icon={Mail} label="Email" value={userProfile?.email} />
          <ProfileRow icon={Phone} label="Phone" value={userProfile?.phone || 'Not set'} />
          <ProfileRow icon={Building} label="Department" value={userProfile?.department || 'Not assigned'} />
          <ProfileRow icon={Calendar} label="Joined" value={userProfile?.joinedAt ? new Date(userProfile.joinedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'} />
        </div>
      </div>
    </div>
  );
}

function ProfileRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
      <Icon className="w-5 h-5 text-slate-400" />
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm text-slate-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
