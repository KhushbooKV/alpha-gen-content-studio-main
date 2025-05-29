import { useState } from "react";
import { Search, Filter, Star, Calendar, Tag, TrendingUp, Lightbulb, Clock, Target, MessageSquare, Zap, BookOpen, CheckCircle, Award, Eye, Type, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
const ContentLibrary = () => {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterChannel, setFilterChannel] = useState("");
  const topPerformingContent = [{
    id: 1,
    title: "JEE 2025 Course Launch - Last 3 Days Left!",
    channel: "WhatsApp",
    ctr: 45.2,
    opens: 12580,
    clicks: 5682,
    conversions: 892,
    timeOfBroadcast: "6:30 PM",
    occasion: "Course Launch Deadline",
    bestPractices: ["Urgency in headline", "Clear deadline mention", "Action-oriented CTA"],
    cta: "Enroll Now - Limited Seats!",
    audience: "JEE Aspirants",
    sentiment: "Urgent",
    author: "Priya Sharma",
    date: "2024-01-15"
  }, {
    id: 2,
    title: "🎯 NEET Biology - Master Cell Structure in 30 Minutes",
    channel: "Email",
    ctr: 38.4,
    opens: 8940,
    clicks: 3432,
    conversions: 567,
    timeOfBroadcast: "4:00 PM",
    occasion: "Post-School Study Time",
    bestPractices: ["Emoji for attention", "Specific time promise", "Clear learning outcome"],
    cta: "Start Learning Now",
    audience: "NEET Students",
    sentiment: "Educational",
    author: "Dr. Rahul Kumar",
    date: "2024-01-14"
  }, {
    id: 3,
    title: "Success Alert: Arjun Scored 99.8% - See His Strategy",
    channel: "Push",
    ctr: 55.1,
    opens: 6780,
    clicks: 3735,
    conversions: 445,
    timeOfBroadcast: "8:00 AM",
    occasion: "Morning Motivation",
    bestPractices: ["Social proof", "Specific achievement", "Promise of strategy"],
    cta: "Watch Success Story",
    audience: "All Students",
    sentiment: "Inspirational",
    author: "Success Team",
    date: "2024-01-13"
  }];
  const tipOfTheWeek = {
    quote: "Headlines with specific numbers and urgency drive 3x higher engagement than generic ones",
    author: "Content Intelligence AI",
    insight: "Our analysis shows that combining urgency ('Last 3 Days') with specific numbers ('99.8%') creates irresistible headlines that students can't ignore.",
    example: "From: 'Learn Physics' → To: 'Master 15 JEE Physics Concepts in 3 Days - 99% Success Rate'"
  };
  const bestPracticesCards = [{
    title: "Perfect Brief Format",
    icon: <BookOpen className="h-5 w-5 text-blue-600" />,
    color: "blue",
    practices: ["Clear objective with metrics (e.g., '25% enrollment increase')", "Specific audience definition (JEE 2025, Tier 2-3 cities)", "One-line value proposition", "Success metrics defined upfront"]
  }, {
    title: "Content Structure",
    icon: <Target className="h-5 w-5 text-green-600" />,
    color: "green",
    practices: ["Numbers + Benefits + Urgency in headlines", "Action-oriented CTAs with scarcity", "Social proof integration (student success stories)", "Channel-optimized formatting"]
  }, {
    title: "High-Impact Elements",
    icon: <Zap className="h-5 w-5 text-purple-600" />,
    color: "purple",
    practices: ["Power words: Limited, Exclusive, Proven, Guaranteed", "Emotional triggers: Fear of missing out, Achievement", "Visual elements: Emojis for attention, bold for emphasis", "Time-sensitive language"]
  }, {
    title: "Quality Checklist",
    icon: <CheckCircle className="h-5 w-5 text-orange-600" />,
    color: "orange",
    practices: ["Headline includes specific numbers or timeframes", "Clear value proposition in first 10 words", "Strong action-oriented CTA present", "A/B test variation planned"]
  }];
  const filteredContent = topPerformingContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = !filterChannel || filterChannel === "all" || item.channel === filterChannel;
    return matchesSearch && matchesChannel;
  });
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Hub</h1>
        <p className="text-gray-600">
      </p>
      </div>

      {/* Tip of the Week - Compact & Glorified */}
      <div className="mb-8 relative">
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 text-amber-300 text-6xl opacity-20">"</div>
          <div className="absolute bottom-4 right-4 text-amber-300 text-6xl opacity-20 rotate-180">"</div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="h-6 w-6 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800 uppercase tracking-wide">Tip of the Week</span>
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              "{tipOfTheWeek.quote}"
            </blockquote>
            
            
            
            
          </div>
        </div>
      </div>

      {/* Best Practices Cards */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <CheckCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bestPracticesCards.map((card, index) => <Card key={index} className={`hover:shadow-lg transition-all border-${card.color}-200 hover:border-${card.color}-300`}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${card.color}-100`}>
                    {card.icon}
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {card.practices.map((practice, idx) => <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className={`h-4 w-4 text-${card.color}-600 mt-0.5 flex-shrink-0`} />
                      <span className="text-sm text-gray-700">{practice}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>)}
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search content or author..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
            </div>
            
            <Select value={filterChannel} onValueChange={setFilterChannel}>
              <SelectTrigger>
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Push">Push Notification</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Content */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Top Performing Content</h2>
        </div>

        {filteredContent.map((content, index) => <Card key={content.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      #{index + 1} Top Performer
                    </Badge>
                    <Badge variant="secondary">{content.channel}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{content.title}</CardTitle>
                  <CardDescription className="text-sm">
                    By {content.author} • {content.date}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Metrics */}
                <div className="lg:col-span-1">
                  <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CTR</span>
                      <span className="text-lg font-bold text-green-600">{content.ctr}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Opens</span>
                      <span className="font-medium">{content.opens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Clicks</span>
                      <span className="font-medium">{content.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Conversions</span>
                      <span className="font-bold text-blue-600">{content.conversions}</span>
                    </div>
                  </div>
                </div>

                {/* Campaign Insights */}
                <div className="lg:col-span-1">
                  <h4 className="font-semibold text-gray-900 mb-3">Campaign Insights</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-600">Broadcast Time</span>
                        <p className="font-medium">{content.timeOfBroadcast}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-600">Occasion</span>
                        <p className="font-medium">{content.occasion}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <div>
                        <span className="text-sm text-gray-600">Audience</span>
                        <p className="font-medium">{content.audience}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Factors */}
                <div className="lg:col-span-1">
                  <h4 className="font-semibold text-gray-900 mb-3">Success Factors</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Best Practices Used</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {content.bestPractices.map((practice, idx) => <Badge key={idx} variant="outline" className="text-xs">
                            {practice}
                          </Badge>)}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">CTA Used</span>
                      <p className="font-medium text-blue-600 mt-1">"{content.cta}"</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Content Sentiment</span>
                      <Badge variant="secondary" className="ml-2">{content.sentiment}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex space-x-3">
                  <Button size="sm" variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    Use as Template
                  </Button>
                  <Button size="sm" variant="outline">
                    View Full Analysis
                  </Button>
                  <Button size="sm" variant="outline">
                    A/B Test Variation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {filteredContent.length === 0 && <div className="text-center py-16">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>}
    </div>;
};
export default ContentLibrary;