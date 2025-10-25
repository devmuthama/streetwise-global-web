import { useGetVolunteersQuery, useApproveVolunteerMutation } from '@/features/admin/adminApiSlice';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/shared/Spinner';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

export function AdminVolunteersPage() {
  const [statusFilter, setStatusFilter] = useState('pending');
  const { data: volunteers, error, isLoading } = useGetVolunteersQuery(statusFilter);
  const [approveVolunteer, { isLoading: isApproving }] = useApproveVolunteerMutation();
  const { toast } = useToast();

  const handleApprove = async (id, newStatus) => {
    try {
      await approveVolunteer({ id, status: newStatus }).unwrap();
      toast({ title: 'Success', description: `Volunteer status updated to ${newStatus}.` });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update status.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Volunteers</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && <div className="flex justify-center py-10"><Spinner size="lg" /></div>}
      {error && <p className="text-destructive">Failed to load volunteers.</p>}
      
      {volunteers && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>County</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volunteers.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.full_name}</TableCell>
                <TableCell>{v.email}</TableCell>
                <TableCell>{v.county_interest}</TableCell>
                <TableCell>{v.status}</TableCell>
                <TableCell>
                  {v.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApprove(v.id, 'approved')} disabled={isApproving}>Approve</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleApprove(v.id, 'rejected')} disabled={isApproving}>Reject</Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}