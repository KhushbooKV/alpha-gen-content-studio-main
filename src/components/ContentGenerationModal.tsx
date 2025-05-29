
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Palette, Video, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContentGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContentGenerationModal = ({
  open,
  onOpenChange
}: ContentGenerationModalProps) => {
  const navigate = useNavigate();
  
  const contentOptions = [{
    title: "Content",
    description: "Generate text content for WhatsApp, Email, SMS, and Push Notifications",
    icon: Sparkles,
    route: "/content",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  }, {
    title: "Creative",
    description: "Create stunning images and visual content for your campaigns",
    icon: Palette,
    route: "/image",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }, {
    title: "Video",
    description: "Generate engaging video content for your marketing needs",
    icon: Video,
    route: "/video",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }];

  const handleOptionClick = (route: string) => {
    onOpenChange(false);
    navigate(route);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Select Your Model
          </DialogTitle>
          <p className="text-gray-600 text-center">Select the type of content you want to generate</p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {contentOptions.map(option => {
            const IconComponent = option.icon;
            const isVideo = option.title === "Video";
            
            return (
              <Card 
                key={option.title} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105" 
                onClick={() => handleOptionClick(option.route)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${option.color}`} />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    className="w-full" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(option.route);
                    }}
                  >
                    {isVideo ? "Beta" : "Get Started"}
                    {!isVideo && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentGenerationModal;
