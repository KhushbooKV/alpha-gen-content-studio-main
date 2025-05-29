
import { useState } from "react";
import { FileText, Sparkles, Copy, Star, Search, Filter, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Templates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates = [
    {
      id: 1,
      title: "Course Launch Announcement",
      description: "Perfect template for announcing new courses with excitement and urgency",
      category: "Marketing",
      channel: ["WhatsApp", "Email", "Push"],
      rating: 4.9,
      uses: 1250,
      tags: ["launch", "course", "announcement"],
      preview: "🚀 New Course Alert! Master JEE Physics with our latest comprehensive course. Limited seats available - Enroll now!"
    },
    {
      id: 2,
      title: "Student Motivation Message",
      description: "Inspire and motivate students during exam preparation",
      category: "Educational",
      channel: ["WhatsApp", "Push"],
      rating: 4.8,
      uses: 980,
      tags: ["motivation", "exam", "student"],
      preview: "💪 You've got this! Every hour of study brings you closer to your dream. Keep pushing forward, success is waiting!"
    },
    {
      id: 3,
      title: "Limited Time Offer",
      description: "Create urgency for special offers and discounts",
      category: "Sales",
      channel: ["Email", "WhatsApp"],
      rating: 4.7,
      uses: 2100,
      tags: ["offer", "discount", "urgency"],
      preview: "⏰ Last 24 Hours! Get 50% OFF on NEET preparation course. Don't miss this opportunity to achieve your medical dreams!"
    },
    {
      id: 4,
      title: "Test Reminder",
      description: "Remind students about upcoming tests and mock exams",
      category: "Assessment",
      channel: ["Push", "WhatsApp"],
      rating: 4.6,
      uses: 750,
      tags: ["test", "reminder", "exam"],
      preview: "📝 Reminder: Your JEE Mock Test is scheduled for tomorrow at 2 PM. Login 15 minutes early to avoid any technical issues."
    },
    {
      id: 5,
      title: "Achievement Celebration",
      description: "Celebrate student achievements and milestones",
      category: "Educational",
      channel: ["WhatsApp", "Email"],
      rating: 4.9,
      uses: 560,
      tags: ["achievement", "celebration", "milestone"],
      preview: "🎉 Congratulations! You've completed 75% of your course. Your dedication is inspiring. Keep up the excellent work!"
    },
    {
      id: 6,
      title: "Doubt Clearing Session",
      description: "Announce doubt clearing sessions and interactive classes",
      category: "Educational",
      channel: ["WhatsApp", "Push"],
      rating: 4.8,
      uses: 890,
      tags: ["doubt", "session", "interactive"],
      preview: "🤔 Got doubts? Join our live doubt clearing session today at 7 PM. Our expert teachers are ready to help you succeed!"
    }
  ];

  const categories = [
    { id: "all", name: "All Templates", count: templates.length },
    { id: "Marketing", name: "Marketing", count: templates.filter(t => t.category === "Marketing").length },
    { id: "Educational", name: "Educational", count: templates.filter(t => t.category === "Educational").length },
    { id: "Sales", name: "Sales", count: templates.filter(t => t.category === "Sales").length },
    { id: "Assessment", name: "Assessment", count: templates.filter(t => t.category === "Assessment").length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: any) => {
    toast({
      title: "Template Applied",
      description: `"${template.title}" template has been loaded in the content generator.`,
    });
  };

  const handleCopyTemplate = (template: any) => {
    navigator.clipboard.writeText(template.preview);
    toast({
      title: "Template Copied",
      description: "Template content copied to clipboard!",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Templates</h1>
        <p className="text-gray-600">Ready-to-use templates for all your content needs</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search templates, tags, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Filter className="h-4 w-4 text-gray-500 mt-2" />
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{template.title}</CardTitle>
                  <CardDescription className="text-sm">{template.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{template.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <Badge variant="outline" className="text-xs">
                  {template.category}
                </Badge>
                <span className="text-xs text-gray-500">{template.uses} uses</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Channel Support */}
              <div>
                <div className="text-xs text-gray-600 mb-1">Supported Channels:</div>
                <div className="flex flex-wrap gap-1">
                  {template.channel.map((ch) => (
                    <Badge key={ch} variant="secondary" className="text-xs">
                      {ch}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="text-xs text-gray-600 mb-1">Tags:</div>
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Preview:</div>
                <p className="text-sm text-gray-800 italic">"{template.preview}"</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
                <Button
                  onClick={() => handleCopyTemplate(template)}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Templates;
