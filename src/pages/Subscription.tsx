
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AtomIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Subscription: React.FC = () => {
  return (
    <Layout>
      <div className="container max-w-md mx-auto py-16 px-4">
        <AuthForm />
      </div>
    </Layout>
  );
};

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle login here
    console.log('Login with:', loginEmail, loginPassword);
    navigate('/dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, handle signup here
    console.log('Signup with:', signupEmail, signupPassword);
    navigate('/dashboard');
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 flex items-center flex-col text-center">
        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground mb-4">
          <AtomIcon size={24} />
        </div>
        <CardTitle className="text-2xl">Welcome to DocuScan</CardTitle>
        <CardDescription>
          Sign in to your account or create a new one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Forgot password?
                  </Button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Subscription;
