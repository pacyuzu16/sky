import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminStats from "@/components/AdminStats";
import AdminFilters, { FilterOptions } from "@/components/AdminFilters";
import { 
  LogOut, 
  Mail, 
  Phone, 
  Calendar, 
  Settings, 
  Eye, 
  MessageSquare,
  RefreshCw,
  Lock,
  EyeOff,
  Download,
  Archive
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    service: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter and sort messages
  const filteredMessages = useMemo(() => {
    let filtered = messages.filter(message => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          message.name.toLowerCase().includes(searchLower) ||
          message.email.toLowerCase().includes(searchLower) ||
          message.message.toLowerCase().includes(searchLower) ||
          (message.service && message.service.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status !== 'all') {
        if (filters.status === 'read' && !message.is_read) return false;
        if (filters.status === 'unread' && message.is_read) return false;
      }

      // Service filter
      if (filters.service !== 'all') {
        if (message.service !== filters.service) return false;
      }

      return true;
    });

    // Sort messages
    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return filters.sortOrder === 'asc' 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
    });

    return filtered;
  }, [messages, filters]);

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Date'],
      ...filteredMessages.map(msg => [
        msg.name,
        msg.email,
        msg.phone || '',
        msg.service || '',
        msg.message.replace(/"/g, '""'),
        msg.is_read ? 'Read' : 'Unread',
        new Date(msg.created_at).toLocaleString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-messages-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Check admin authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    const loginTime = localStorage.getItem('admin_login_time');
    
    if (!isAuthenticated || !loginTime) {
      navigate('/admin/login');
      return;
    }

    // Check if session expired (24 hours)
    const now = Date.now();
    const sessionAge = now - parseInt(loginTime);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (sessionAge > maxAge) {
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_login_time');
      toast({
        title: "Session Expired",
        description: "Please login again",
        variant: "destructive"
      });
      navigate('/admin/login');
      return;
    }

    fetchMessages();
  }, [navigate, toast]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, is_read: true } : msg
      ));

      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage({ ...selectedMessage, is_read: true });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark message as read",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
    navigate('/');
    toast({
      title: "Logged Out",
      description: "Admin session ended",
    });
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ setting_value: newPassword })
        .eq('setting_key', 'admin_password');

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password changed successfully",
      });
      
      setShowPasswordChange(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password",
        variant: "destructive"
      });
    }
  };

  const unreadCount = messages.filter(msg => !msg.is_read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/e6415b3c-d84e-4730-85db-6ff2ff190be3.png" 
              alt="Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Skyline Consultancy & Engineering</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              onClick={fetchMessages}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Password Change Section */}
        {showPasswordChange && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Change Admin Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button onClick={changePassword}>
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Stats */}
        <AdminStats messages={messages} />

        {/* Filters and Export */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex-1 w-full sm:w-auto">
            <AdminFilters 
              onFilterChange={setFilters} 
              totalMessages={messages.length}
              filteredCount={filteredMessages.length}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="whitespace-nowrap"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Messages List */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Contact Messages</CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {filteredMessages.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[32rem] overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-foreground">{message.name}</h4>
                          {!message.is_read && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                        <p className="text-sm text-foreground line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredMessages.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {messages.length === 0 ? 'No messages yet' : 'No messages match your filters'}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Message Details */}
          <Card>
            <CardHeader>
              <CardTitle>Message Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMessage ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedMessage.name}
                    </h3>
                    {!selectedMessage.is_read && (
                      <Button
                        size="sm"
                        onClick={() => markAsRead(selectedMessage.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{selectedMessage.email}</span>
                    </div>
                    
                    {selectedMessage.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{selectedMessage.phone}</span>
                      </div>
                    )}
                    
                    {selectedMessage.service && (
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{selectedMessage.service}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h4 className="font-medium text-foreground mb-2">Message:</h4>
                    <p className="text-sm text-foreground whitespace-pre-wrap bg-muted/50 p-3 rounded-lg">
                      {selectedMessage.message}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Reply via Email
                    </Button>
                    
                    {selectedMessage.phone && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`tel:${selectedMessage.phone}`)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a message to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;