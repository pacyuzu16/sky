import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Calendar, 
  Globe,
  Smartphone,
  Monitor,
  RefreshCw
} from "lucide-react";

interface VisitorData {
  date: string;
  visitors: number;
  pageViews: number;
  avgSession: string;
  bounceRate: number;
  mobile: number;
  desktop: number;
}

const VisitorAnalytics = () => {
  const [analytics, setAnalytics] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  // Mock data generation - replace with real analytics API
  const generateMockData = (days: number): VisitorData[] => {
    const data: VisitorData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const baseVisitors = Math.floor(Math.random() * 100) + 50;
      const pageViews = Math.floor(baseVisitors * (2 + Math.random() * 2));
      
      data.push({
        date: date.toISOString().split('T')[0],
        visitors: baseVisitors,
        pageViews: pageViews,
        avgSession: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        bounceRate: Math.floor(Math.random() * 30) + 20,
        mobile: Math.floor(baseVisitors * 0.6),
        desktop: Math.floor(baseVisitors * 0.4)
      });
    }
    
    return data;
  };

  const loadAnalytics = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const days = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    setAnalytics(generateMockData(days));
    setLoading(false);
  };

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const totalVisitors = analytics.reduce((sum, day) => sum + day.visitors, 0);
  const totalPageViews = analytics.reduce((sum, day) => sum + day.pageViews, 0);
  const avgBounceRate = analytics.length > 0 
    ? Math.round(analytics.reduce((sum, day) => sum + day.bounceRate, 0) / analytics.length)
    : 0;
  const totalMobile = analytics.reduce((sum, day) => sum + day.mobile, 0);
  const totalDesktop = analytics.reduce((sum, day) => sum + day.desktop, 0);
  const mobilePercentage = totalVisitors > 0 ? Math.round((totalMobile / totalVisitors) * 100) : 0;

  const stats = [
    {
      title: "Total Visitors",
      value: totalVisitors.toLocaleString(),
      icon: Users,
      description: `Last ${selectedPeriod}`,
      color: "text-blue-600",
      trend: "+12%"
    },
    {
      title: "Page Views",
      value: totalPageViews.toLocaleString(),
      icon: Eye,
      description: `Last ${selectedPeriod}`,
      color: "text-green-600",
      trend: "+8%"
    },
    {
      title: "Avg Session",
      value: analytics.length > 0 ? analytics[analytics.length - 1].avgSession : "0:00",
      icon: Clock,
      description: "Latest average",
      color: "text-purple-600",
      trend: "+5%"
    },
    {
      title: "Bounce Rate",
      value: `${avgBounceRate}%`,
      icon: TrendingUp,
      description: "Average rate",
      color: "text-orange-600",
      trend: "-3%"
    },
    {
      title: "Mobile Traffic",
      value: `${mobilePercentage}%`,
      icon: Smartphone,
      description: "Mobile visitors",
      color: "text-indigo-600",
      trend: "+15%"
    },
    {
      title: "Desktop Traffic",
      value: `${100 - mobilePercentage}%`,
      icon: Monitor,
      description: "Desktop visitors",
      color: "text-teal-600",
      trend: "-7%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Visitor Analytics
          </h3>
          <p className="text-muted-foreground">
            Track website traffic and user engagement
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="text-xs"
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={loadAnalytics}
            disabled={loading}
            className="text-xs"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className="text-xs text-green-600 bg-green-50"
                >
                  {stat.trend}
                </Badge>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Recent Daily Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading analytics...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.slice(-7).reverse().map((day, index) => (
                <div 
                  key={day.date} 
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">
                        {new Date(day.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg session: {day.avgSession}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{day.visitors}</div>
                      <div className="text-xs text-muted-foreground">Visitors</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{day.pageViews}</div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">{day.bounceRate}%</div>
                      <div className="text-xs text-muted-foreground">Bounce</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorAnalytics;