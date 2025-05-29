
import { Video, Clock, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VideoGeneration = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Generation</h1>
        <p className="text-gray-600">AI-powered video creation (Coming Soon)</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="relative overflow-hidden">
          {/* Blurred background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-orange-100 opacity-60"></div>
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          
          <CardContent className="relative z-10 text-center py-20">
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-10 w-10 text-primary" />
              </div>
              
              <Badge className="mb-6 bg-accent text-white">
                <Clock className="h-3 w-3 mr-1" />
                Coming Soon
              </Badge>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI Video Generation
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Create stunning educational videos, promotional content, and course materials 
                with our upcoming AI video generation technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Scripts</h3>
                <p className="text-sm text-gray-600">AI-generated scripts tailored for educational content</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Video className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Auto Editing</h3>
                <p className="text-sm text-gray-600">Automated video editing with professional transitions</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick Export</h3>
                <p className="text-sm text-gray-600">Multiple format exports for different platforms</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" disabled className="bg-gray-300 text-gray-500 cursor-not-allowed">
                <Video className="h-5 w-5 mr-2" />
                Generate Video (Coming Soon)
              </Button>
              
              <p className="text-sm text-gray-500">
                Expected launch: Q2 2024 • Join our waitlist to be notified
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="text-lg">Educational Videos</CardTitle>
              <CardDescription>Physics concepts, problem solving, course previews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="opacity-75">
            <CardHeader>
              <CardTitle className="text-lg">Marketing Content</CardTitle>
              <CardDescription>Course promotions, success stories, testimonials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <Video className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoGeneration;
