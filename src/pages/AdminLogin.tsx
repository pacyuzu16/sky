import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [userCaptcha, setUserCaptcha] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Generate simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer = 0;
    let captchaText = `${num1} ${operation} ${num2}`;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
    }
    
    setCaptcha(captchaText);
    setCaptchaAnswer(answer);
  };

  useState(() => {
    generateCaptcha();
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check captcha first
      if (parseInt(userCaptcha) !== captchaAnswer) {
        toast({
          title: "Error",
          description: "Incorrect captcha. Please try again.",
          variant: "destructive"
        });
        generateCaptcha();
        setUserCaptcha("");
        setIsLoading(false);
        return;
      }

      // Verify password against database
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'admin_password')
        .single();

      if (error) throw error;

      if (data.setting_value === password) {
        // Store admin session in localStorage
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_login_time', Date.now().toString());
        
        toast({
          title: "Success",
          description: "Admin login successful",
        });
        
        navigate('/admin');
      } else {
        toast({
          title: "Error",
          description: "Invalid password",
          variant: "destructive"
        });
        generateCaptcha();
        setUserCaptcha("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive"
      });
      generateCaptcha();
      setUserCaptcha("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Admin Login
          </CardTitle>
          <p className="text-muted-foreground">
            Enter your admin credentials to access the dashboard
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Admin Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Bot Protection Captcha */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Security Check
              </label>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-muted p-3 rounded-lg font-mono text-lg">
                  {captcha} = ?
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateCaptcha}
                >
                  Refresh
                </Button>
              </div>
              <Input
                type="number"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                placeholder="Enter the answer"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Login to Admin Panel
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;