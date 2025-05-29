import { useState } from "react";
import { Mic, Sparkles, Save, Copy, Edit3, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const ContentGeneration = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [contentId, setContentId] = useState<string>('');

  const [formData, setFormData] = useState({
    Department: "",
    Category: "",
    Channel_Type: "",
    Content_Type: "",
    Use_Case: "",
    Requirement_Brief: "",
    Tonality: [] as string[],
    Target_Audience: "",
    Language: "",
    Occasion: "",
    Sample_Content: "",
    Batch_Name: "",
    Actual_Price: "",
    Offer_Price: "",
    Discount_Percent: ""
  });

  const tonalityOptions = [
    "informative",
    "sales-driven", 
    "urgency",
    "motivational",
    "humour",
    "celebration",
    "fomo",
    "social-proofing",
    "emotional-damage"
  ];

  const handleTonalityChange = (Tonality: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        Tonality: [...formData.Tonality, Tonality]
      });
    } else {
      setFormData({
        ...formData,
        Tonality: formData.Tonality.filter(t => t !== Tonality)
      });
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const sampleContent = generateSampleContent();
      handlePost()
      toast({
        title: "Content Generated!",
        description: "Your AI-powered content is ready for review.",
      });
    }, 2000);
  };

  const generateSampleContent = () => {
    const { Channel_Type, Content_Type, Tonality } = formData;
    
    if (Channel_Type === "whatsapp") {
      return "🎯 *Physics Wallah Exclusive Offer!*\n\nHey Physics Champions! 🚀\n\nReady to crack JEE 2025? Join our comprehensive course with:\n✅ Expert faculty guidance\n✅ Live doubt sessions\n✅ Practice tests & mock exams\n\n💥 *Limited Time: 40% OFF*\nOriginal Price: ₹15,000\n*Your Price: ₹9,000*\n\n🔥 Offer valid till tomorrow!\nDon't miss out! \n\nRegister now: [Link]\n\n#PhysicsWallah #JEE2025 #Success";
    }
    
    if (Channel_Type === "email") {
      return "Subject: 🚀 Your JEE Success Journey Starts Here - 40% OFF!\n\nHi [Name],\n\nReady to transform your JEE preparation? Physics Wallah's comprehensive course is designed to make you exam-ready!\n\n🎯 What you'll get:\n• Expert faculty with proven track record\n• Live interactive classes\n• Comprehensive study material\n• Regular mock tests and assessments\n• Doubt clearing sessions\n\n💰 Special Offer: Save ₹6,000!\nOriginal Price: ₹15,000\nToday's Price: ₹9,000\n\n⏰ Hurry! Offer expires in 24 hours.\n\n[ENROLL NOW - BUTTON]\n\nBest regards,\nTeam Physics Wallah";
    }
    
    return "🎯 Physics Wallah Alert!\n\nJEE 2025 preparation made easy! Join our expert-led course with 40% discount. Limited time offer - Register today!\n\n💰 Save ₹6,000 | Original: ₹15,000 → Now: ₹9,000\n\nTap to enroll: [Link]";
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice recognition feature will be available soon!",
    });
  };

  const handleSave = () => {
    toast({
      title: "Content Saved",
      description: "Content has been saved to your library for 30 days.",
    });
  };

  const handleCopy = () => {
    const contentToCopy = isEditing ? editedContent : generatedContent;
    navigator.clipboard.writeText(contentToCopy);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(generatedContent);
  };

  const handleSaveEdit = () => {
    setGeneratedContent(editedContent);
    setIsEditing(false);
    toast({
      title: "Content Updated",
      description: "Your manual edits have been saved.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(generatedContent);
  };

  const handlePost = async () => {
    const payload = {
      title: "create content",
      tags: Array.isArray(formData) ? formData : [formData], // ensure tags is array
    };
  
    try {
      const res = await fetch('http://localhost:4000/mario/contents/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-agent':''
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const errorText = await res.text(); // get error message from server
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }
  
      const data = await res.json();
  
      if (data) {
        setTimeout(() => {
          handleGetContent(data?.data?.content)

        },5000)
        
        toast({
          title: "Content Generated!",
          description: "Your AI-powered content is ready for review.",
        });
      } else {
        // setContentId("No content received");
        toast({
          title: "Warning",
          description: "No content was returned from the API.",
        });
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setContentId(`Error occurred: ${error.message}`);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again later.",
      });
    }
  };
  
  
  const handleGetContent = async (contentId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/mario/contents/${contentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user-agent':''
        },
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if(data) {
        setGeneratedContent(data?.data?.body);
        setEditedContent(data?.data?.body);
        setIsGenerating(false);
      }
  
    } catch (error: any) {
      console.error("Error calling API:", error);
      toast({
        title: "Error",
        description: "Failed to fetch content. Please check the API URL and try again.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Generation</h1>
        <p className="text-gray-600">Create AI-powered content for all your marketing channels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Content Brief</span>
            </CardTitle>
            <CardDescription>
              Fill in the details to generate tailored content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.Department} onValueChange={(value) => setFormData({...formData, Department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drip">Drip</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="youtube">Youtube</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.Category} onValueChange={(value) => setFormData({...formData, Category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11th-iit-jee">11th - IIT-JEE</SelectItem>
                    <SelectItem value="12th-iit-jee">12th - IIT-JEE</SelectItem>
                    <SelectItem value="dropper-iit-jee">Dropper - IIT-JEE</SelectItem>
                    <SelectItem value="11th-neet">11th - NEET</SelectItem>
                    <SelectItem value="12th-neet">12th - NEET</SelectItem>
                    <SelectItem value="dropper-neet">Dropper - NEET</SelectItem>
                    <SelectItem value="upsc">UPSC</SelectItem>
                    <SelectItem value="mba">MBA</SelectItem>
                    <SelectItem value="ssc">SSC</SelectItem>
                    <SelectItem value="defence">Defence</SelectItem>
                    <SelectItem value="vernacular">Vernacular</SelectItem>
                    <SelectItem value="power-batch">Power Batch</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchName">Batch Name</Label>
              <Input 
                placeholder="Enter batch name"
                value={formData.Batch_Name}
                onChange={(e) => setFormData({...formData, Batch_Name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channelType">Channel Type</Label>
              <Select value={formData.Channel_Type} onValueChange={(value) => setFormData({...formData, Channel_Type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="push">Push Notification</SelectItem>
                  <SelectItem value="whatsapp">Whatsapp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="in-app">In-App</SelectItem>
                  <SelectItem value="osm">OSM</SelectItem>
                  <SelectItem value="rcs">RCS</SelectItem>
                  <SelectItem value="paid-ads">Paid Ads</SelectItem>
                  <SelectItem value="landing-page">Landing Page</SelectItem>
                  <SelectItem value="whatsapp-repeat">Whatsapp Repeat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <Select value={formData.Content_Type} onValueChange={(value) => setFormData({...formData, Content_Type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="carousel">Carousel</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="nudge">Nudge</SelectItem>
                    <SelectItem value="timer">Timer</SelectItem>
                    <SelectItem value="progress-bar">Progress Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Use Case</Label>
                <Select value={formData.Use_Case} onValueChange={(value) => setFormData({...formData, Use_Case: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="batch-launch">Batch Launch</SelectItem>
                    <SelectItem value="batch-promo">Batch Promo</SelectItem>
                    <SelectItem value="offer-discount">Offer / Discount</SelectItem>
                    <SelectItem value="result-celebration">Result Celebration</SelectItem>
                    <SelectItem value="coupon">Coupon</SelectItem>
                    <SelectItem value="demo-class">Demo Class</SelectItem>
                    <SelectItem value="batch-awareness">Batch Awareness</SelectItem>
                    <SelectItem value="admit-card-collection">Admit Card Collection and Orientation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tonality">Tonality</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {formData.Tonality.length > 0 
                      ? `${formData.Tonality.length} selected`
                      : "Select tonality"
                    }
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-white">
                  {tonalityOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={formData.Tonality.includes(option)}
                      onCheckedChange={(checked) => handleTonalityChange(option, checked)}
                    >
                      {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {formData.Tonality.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.Tonality.map((tone) => (
                    <Badge key={tone} variant="secondary" className="text-xs">
                      {tone.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirementBrief">Requirement Brief</Label>
              <div className="relative">
                <Textarea 
                  placeholder="Describe your content requirements in detail..."
                  value={formData.Requirement_Brief}
                  onChange={(e) => setFormData({...formData, Requirement_Brief: e.target.value})}
                  className="min-h-20"
                />
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-2 right-2 p-2"
                  onClick={handleVoiceInput}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input 
                placeholder="JEE aspirants, NEET students, Class 11-12..."
                value={formData.Target_Audience}
                onChange={(e) => setFormData({...formData, Target_Audience: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={formData.Language} onValueChange={(value) => setFormData({...formData, Language: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hinglish">Hinglish</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Select value={formData.Occasion} onValueChange={(value) => setFormData({...formData, Occasion: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jee-main-exam">JEE-Main Exam</SelectItem>
                    <SelectItem value="jee-advance-exam">JEE-Advance Exam</SelectItem>
                    <SelectItem value="neet-exam">NEET Exam</SelectItem>
                    <SelectItem value="12th-boards">12th Boards</SelectItem>
                    <SelectItem value="10th-boards">10th Boards</SelectItem>
                    <SelectItem value="diwali">Diwali</SelectItem>
                    <SelectItem value="republic-day">Republic Day</SelectItem>
                    <SelectItem value="independence-day">Independence Day</SelectItem>
                    <SelectItem value="childrens-day">Children's Day</SelectItem>
                    <SelectItem value="teachers-day">Teacher's Day</SelectItem>
                    <SelectItem value="holi">Holi</SelectItem>
                    <SelectItem value="dusshera">Dusshera</SelectItem>
                    <SelectItem value="vishwas-diwas">Vishwas Diwas</SelectItem>
                    <SelectItem value="foundation-day">Foundation Day</SelectItem>
                    <SelectItem value="guru-poornima">Guru Poornima</SelectItem>
                    <SelectItem value="raksha-bandhan">Raksha Bandhan</SelectItem>
                    <SelectItem value="new-year">New Year</SelectItem>
                    <SelectItem value="na">N/A</SelectItem>
                    <SelectItem value="new-event">New Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actualPrice">Actual Price (₹)</Label>
                <Input 
                  placeholder="15000"
                  value={formData.Actual_Price}
                  onChange={(e) => setFormData({...formData, Actual_Price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offerPrice">Offer Price (₹)</Label>
                <Input 
                  placeholder="9000"
                  value={formData.Offer_Price}
                  onChange={(e) => setFormData({...formData, Offer_Price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountPercent">Discount %</Label>
                <Input 
                  placeholder="40"
                  value={formData.Discount_Percent}
                  onChange={(e) => setFormData({...formData, Discount_Percent: e.target.value})}
                />
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Content */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>
              AI-generated content with manual editing capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 min-h-64">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{"Content"}</Badge>
                    <div className="flex space-x-2">
                      {!isEditing ? (
                        <>
                          <Button size="sm" variant="outline" onClick={handleEdit}>
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleSave}>
                            <Save className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button size="sm" variant="outline" onClick={handleSaveEdit}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  {isEditing ? (
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="min-h-48 bg-white"
                      placeholder="Edit your content here..."
                    />
                  ) : (
                    <div className="whitespace-pre-wrap text-sm">{generatedContent}</div>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    Save to Library
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate</h3>
                <p className="text-gray-500">Fill in the form and click generate to create your content</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentGeneration;
