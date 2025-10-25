import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

const counties = [
  'Nairobi',
  'Nakuru',
  'Kiambu',
  'Machakos',
  'Kajiado',
  'Other',
];

const volunteerSchema = z.object({
  full_name: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  county_interest: z.string().min(1, 'Please select a county'),
  skills: z.string().optional(),
});

export function VolunteerForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('volunteers').insert([
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          county_interest: formData.county_interest,
          skills: formData.skills,
        },
      ]);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Your volunteer application has been submitted.',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit application.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input id="full_name" {...register('full_name')} />
        {errors.full_name && <p className="text-sm text-destructive">{errors.full_name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input id="phone" {...register('phone')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="county_interest">County of Interest</Label>
        <Select name="county_interest" onValueChange={(value) => control.setValue('county_interest', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a county" />
          </SelectTrigger>
          <SelectContent>
            {counties.map((county) => (
              <SelectItem key={county} value={county}>
                {county}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.county_interest && <p className="text-sm text-destructive">{errors.county_interest.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills or Interests (Optional)</Label>
        <Textarea id="skills" {...register('skills')} placeholder="Tell us what you're good at..." />
      </div>
      
      {/* TODO: Add Data Consent Checkbox */}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}