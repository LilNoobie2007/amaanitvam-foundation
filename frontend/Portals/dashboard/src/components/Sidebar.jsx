import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Megaphone,
  FolderKanban,
  CalendarCheck,
  UserCircle,
  LogOut,
  BarChart3,
  Building2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);

  const role = String(userProfile?.role || '').toLowerCase();
  const isAdmin = role === 'admin' || role === 'super_admin';

  const displayName =
    userProfile?.name ||
    userProfile?.displayName ||
    userProfile?.email?.split('@')[0] ||
    'Dashboard User';

  const displayEmail = userProfile?.email || '';
  const displayRole = (role || 'dashboard').replace('_', ' ').toUpperCase();

  const initials = useMemo(() => {
    return (
      displayName
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'DU'
    );
  }, [displayName]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `sidebar-nav-link ${isActive ? 'active' : ''}`;

  return (
    <aside className="dashboard-sidebar fixed top-0 left-0 z-50 flex h-screen w-64 flex-col">
      <div className="dashboard-sidebar__brand px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          {!logoError ? (
            <img
              src="/logo.jpg"
              alt="Amaanitvam Foundation"
              className="dashboard-sidebar__logo h-12 w-12 rounded bg-white object-contain p-1"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="dashboard-sidebar__logo-fallback flex h-12 w-12 shrink-0 items-center justify-center rounded bg-white text-sm font-extrabold text-[#5d0f2d]">
              AF
            </div>
          )}

          <div className="min-w-0">
            <h1 className="brand-title text-2xl font-bold tracking-tight leading-none uppercase">
              Amaanitvam
            </h1>
            <p className="brand-subtitle text-[11px] uppercase tracking-[0.25em] font-semibold mt-1 leading-none">
              Foundation
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <p className="admin-panel-label px-1 pb-4">Dashboard Panel</p>

        <p className="sidebar-section-title px-4 pt-2 mb-3">Overview</p>

        <NavLink to="/dashboard" end className={navLinkClass}>
          <LayoutDashboard className="w-[18px] h-[18px]" />
          <span>Dashboard</span>
        </NavLink>

        <p className="sidebar-section-title px-4 pt-6 mb-3">Team</p>

        <NavLink to="/meetings" className={navLinkClass}>
          <CalendarDays className="w-[18px] h-[18px]" />
          <span>Meetings</span>
        </NavLink>

        <NavLink to="/tasks" className={navLinkClass}>
          <ClipboardList className="w-[18px] h-[18px]" />
          <span>Tasks</span>
        </NavLink>

        <NavLink to="/announcements" className={navLinkClass}>
          <Megaphone className="w-[18px] h-[18px]" />
          <span>Announcements</span>
        </NavLink>

        <NavLink to="/projects" className={navLinkClass}>
          <FolderKanban className="w-[18px] h-[18px]" />
          <span>Projects</span>
        </NavLink>

        <NavLink to="/departments" className={navLinkClass}>
          <Building2 className="w-[18px] h-[18px]" />
          <span>Departments</span>
        </NavLink>

        <p className="sidebar-section-title px-4 pt-6 mb-3">My Workspace</p>

        {isAdmin && (
          <NavLink to="/member-reports" className={navLinkClass}>
            <BarChart3 className="w-[18px] h-[18px]" />
            <span>Reports</span>
          </NavLink>
        )}

        <NavLink to="/attendance" className={navLinkClass}>
          <CalendarCheck className="w-[18px] h-[18px]" />
          <span>Attendance</span>
        </NavLink>

        <p className="sidebar-section-title px-4 pt-6 mb-3">Account</p>

        <NavLink to="/profile" className={navLinkClass}>
          <UserCircle className="w-[18px] h-[18px]" />
          <span>My Profile</span>
        </NavLink>
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d8a15f] text-sm font-bold text-[#5d0f2d]">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white" title={displayName}>
              {displayName}
            </p>

            {displayEmail && (
              <p className="truncate text-[11px] text-white/55" title={displayEmail}>
                {displayEmail}
              </p>
            )}

            <span className="mt-1 inline-block rounded bg-[#d8a15f] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#5d0f2d]">
              {displayRole}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
            className="rounded-lg p-2 text-[#d8a15f]/70 transition-colors duration-300 hover:bg-[#d8a15f]/10 hover:text-[#d8a15f]"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}