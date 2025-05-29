import { BarChart3, TrendingUp, Users, MessageSquare, Calendar, ArrowUp, ArrowDown, Target, Zap, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend } from "recharts";

const Analytics = () => {
  const performanceData = [
    { name: "WhatsApp", content: 24, ctr: 12.5, conversions: 892, revenue: 445000, color: "#25D366" },
    { name: "Email", content: 18, ctr: 8.2, conversions: 567, revenue: 283500, color: "#4B6EF5" },
    { name: "Push", content: 32, ctr: 15.8, conversions: 445, revenue: 222500, color: "#F29E38" },
    { name: "SMS", content: 15, ctr: 18.3, conversions: 312, revenue: 156000, color: "#8B5CF6" },
    { name: "Social", content: 12, ctr: 6.7, conversions: 234, revenue: 117000, color: "#10B981" }
  ];

  const campaignData = [
    { week: "Week 1", ctr: 8.2, conversions: 456, revenue: 228000, campaigns: 5 },
    { week: "Week 2", ctr: 10.1, conversions: 678, revenue: 339000, campaigns: 7 },
    { week: "Week 3", ctr: 12.8, conversions: 892, revenue: 446000, campaigns: 8 },
    { week: "Week 4", ctr: 11.5, conversions: 734, revenue: 367000, campaigns: 6 }
  ];

  const ctrTrendData = [
    { date: "Jan 1", whatsapp: 12.1, email: 7.8, push: 15.2, sms: 17.9 },
    { date: "Jan 7", whatsapp: 11.8, email: 8.1, push: 16.1, sms: 18.2 },
    { date: "Jan 14", whatsapp: 12.5, email: 8.5, push: 15.8, sms: 18.8 },
    { date: "Jan 21", whatsapp: 13.2, email: 8.2, push: 16.4, sms: 17.5 },
    { date: "Jan 28", whatsapp: 12.8, email: 7.9, push: 15.9, sms: 18.1 }
  ];

  const topCampaigns = [
    {
      name: "JEE 2025 Launch Campaign",
      channel: "WhatsApp",
      ctr: 15.8,
      conversions: 892,
      revenue: 445000,
      roi: 340,
      status: "Active",
      trend: "up"
    },
    {
      name: "NEET Prep Intensive",
      channel: "Email", 
      ctr: 12.3,
      conversions: 567,
      revenue: 283500,
      roi: 285,
      status: "Active",
      trend: "up"
    },
    {
      name: "Mock Test Series Promo",
      channel: "Push",
      ctr: 18.7,
      conversions: 445,
      revenue: 222500,
      roi: 220,
      status: "Completed",
      trend: "up"
    },
    {
      name: "Weekend Special Offer",
      channel: "SMS",
      ctr: 21.2,
      conversions: 312,
      revenue: 156000,
      roi: 195,
      status: "Active",
      trend: "down"
    },
    {
      name: "Success Stories Campaign",
      channel: "Social",
      ctr: 8.9,
      conversions: 234,
      revenue: 117000,
      roi: 145,
      status: "Paused",
      trend: "down"
    }
  ];

  const audienceSegmentData = [
    { segment: "JEE Aspirants", ctr: 14.2, conversions: 1245, value: 35, color: "#4B6EF5" },
    { segment: "NEET Students", ctr: 12.8, conversions: 987, value: 28, color: "#F29E38" },
    { segment: "Class 11", ctr: 10.5, conversions: 654, value: 18, color: "#10B981" },
    { segment: "Droppers", ctr: 16.3, conversions: 432, value: 12, color: "#8B5CF6" },
    { segment: "Others", ctr: 8.1, conversions: 232, value: 7, color: "#6B7280" }
  ];

  // Custom label function for the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, segment }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
          <p className="text-gray-600">Comprehensive performance tracking with CTR and campaign-level insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">26</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+4</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg CTR</p>
                <p className="text-2xl font-bold text-gray-900">12.8%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+2.3%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Conversions</p>
                <p className="text-2xl font-bold text-gray-900">2,450</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+18%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹12.2L</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+24%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg ROI</p>
                <p className="text-2xl font-bold text-gray-900">245%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+15%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* CTR Trends by Channel */}
        <Card>
          <CardHeader>
            <CardTitle>CTR Trends by Channel</CardTitle>
            <CardDescription>Click-through rates over time for each channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ctrTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'CTR']} />
                <Line type="monotone" dataKey="whatsapp" stroke="#25D366" strokeWidth={2} name="WhatsApp" />
                <Line type="monotone" dataKey="email" stroke="#4B6EF5" strokeWidth={2} name="Email" />
                <Line type="monotone" dataKey="push" stroke="#F29E38" strokeWidth={2} name="Push" />
                <Line type="monotone" dataKey="sms" stroke="#8B5CF6" strokeWidth={2} name="SMS" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Weekly campaign metrics and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="conversions" stackId="1" stroke="#4B6EF5" fill="#4B6EF5" fillOpacity={0.6} name="Conversions" />
                <Area type="monotone" dataKey="ctr" stackId="2" stroke="#F29E38" fill="#F29E38" fillOpacity={0.6} name="CTR %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Channel Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>CTR and conversion metrics by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ctr" fill="#4B6EF5" name="CTR %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Audience Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Segments</CardTitle>
            <CardDescription>Performance by target audience</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={audienceSegmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {audienceSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, 'Share']}
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                      const data = payload[0].payload;
                      return `${data.segment} - CTR: ${data.ctr}%`;
                    }
                    return label;
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color }}>
                      {audienceSegmentData.find(item => item.value.toString() === value.toString())?.segment || value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Best Performing Channel</span>
              <Badge className="bg-green-100 text-green-800">SMS (18.3% CTR)</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Top Converting Campaign</span>
              <Badge className="bg-blue-100 text-blue-800">JEE 2025 Launch</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Highest ROI</span>
              <Badge className="bg-purple-100 text-purple-800">340% ROI</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Best Audience</span>
              <Badge className="bg-yellow-100 text-yellow-800">Droppers (16.3% CTR)</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Campaign Table */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Details</CardTitle>
          <CardDescription>Comprehensive view of all campaign metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">ROI</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCampaigns.map((campaign, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{campaign.channel}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    {campaign.ctr}%
                  </TableCell>
                  <TableCell className="text-right">{campaign.conversions}</TableCell>
                  <TableCell className="text-right">₹{(campaign.revenue / 1000).toFixed(0)}K</TableCell>
                  <TableCell className="text-right font-medium">{campaign.roi}%</TableCell>
                  <TableCell>
                    {campaign.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
