import { cn } from '@/lib/utils';
import { signOutUser } from '@/features/auth/authSlice';
import { LayoutDashboard, Users, FileText, Image, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/volunteers', label: 'Volunteers', icon: Users },
  { href: '/admin/reports', label: 'Reports', icon: FileText },
  { href: '/admin/media', label: 'Media', icon: Image },
];

export function AdminNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOutUser());
    navigate('/');
  };

  return (
    <nav className="flex flex-col space-y-2">
      {adminLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          end={link.href === '/admin/dashboard'}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              isActive && 'bg-primary/10 text-primary font-medium'
            )
          }
        >
          <link.icon className="h-5 w-5" />
          <span>{link.label}</span>
        </NavLink>
      ))}
      <Button variant="ghost" onClick={handleLogout} className="justify-start px-3 text-muted-foreground">
        <LogOut className="mr-3 h-5 w-5" />
        Logout
      </Button>
    </nav>
  );
}