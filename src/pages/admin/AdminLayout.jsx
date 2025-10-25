import { AdminNav } from '@/components/shared/AdminNav';
import { Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <AdminNav />
        </aside>
        <main className="md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}