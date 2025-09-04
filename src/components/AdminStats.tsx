import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Clock, TrendingUp, Users, Calendar } from "lucide-react";

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

interface AdminStatsProps {
  messages: ContactMessage[];
}

const AdminStats = ({ messages }: AdminStatsProps) => {
  const totalMessages = messages.length;
  const unreadMessages = messages.filter(msg => !msg.is_read).length;
  const readMessages = totalMessages - unreadMessages;

  // Messages from last 7 days
  const recentMessages = messages.filter(msg => {
    const messageDate = new Date(msg.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return messageDate > weekAgo;
  }).length;

  // Messages by service type
  const serviceBreakdown = messages.reduce((acc, msg) => {
    const service = msg.service || 'General Inquiry';
    acc[service] = (acc[service] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularService = Object.entries(serviceBreakdown)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  // Average response time (mock data for now)
  const avgResponseTime = "2.5 hours";

  const stats = [
    {
      title: "Total Messages",
      value: totalMessages,
      icon: Mail,
      description: "All time messages",
      color: "text-blue-600"
    },
    {
      title: "Unread Messages",
      value: unreadMessages,
      icon: MessageSquare,
      description: "Pending review",
      color: "text-red-600"
    },
    {
      title: "Read Messages",
      value: readMessages,
      icon: MessageSquare,
      description: "Processed messages",
      color: "text-green-600"
    },
    {
      title: "This Week",
      value: recentMessages,
      icon: Calendar,
      description: "Last 7 days",
      color: "text-purple-600"
    },
    {
      title: "Popular Service",
      value: mostPopularService,
      icon: TrendingUp,
      description: "Most requested",
      color: "text-orange-600"
    },
    {
      title: "Avg Response",
      value: avgResponseTime,
      icon: Clock,
      description: "Average time",
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;