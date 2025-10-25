import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmail, signInWithGoogle } from '@/features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, status, error } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(signInWithEmail(data));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };
  
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
    if (status === 'failed' && error) {
      toast({
        title: 'Login Failed',
        description: error,
        variant: 'destructive',
      });
    }
  }, [user, status, error, navigate, from, toast]);

  return (
    <>
      <Helmet>
        <title>Admin Login | StreetWise Global Network</title>
      </Helmet>
      <div className="container flex min-h-[70vh] items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Admin Login</CardTitle>
            <CardDescription>Access the StreetWise Dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="my-4 flex items-center before:flex-1 before:border-t before:border-border after:flex-1 after:border-t after:border-border">
              <span className="mx-4 text-xs text-muted-foreground">OR</span>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={status === 'loading'}>
              {/* Placeholder for Google Icon */}
              Sign In with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}