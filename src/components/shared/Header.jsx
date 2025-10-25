import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/programs', label: 'Programs' },
  { href: '/counties', label: 'Counties' },
  { href: '/media', label: 'Media' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          StreetWise
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavLink to={link.href} className={({ isActive }) =>
                  cn(navigationMenuTriggerStyle(), isActive && "bg-accent")
                }>
                  {link.label}
                </NavLink>
              </NavigationMenuItem>
            ))}
            {user && (
              <NavigationMenuItem>
                <Link to="/admin" className={cn(navigationMenuTriggerStyle(), "font-semibold text-primary")}>
                  Admin
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/get-involved">Donate</Link>
          </Button>
          {/* Mobile Menu Trigger (for Phase 2) */}
        </div>
      </div>
    </header>
  );
}