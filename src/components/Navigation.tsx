
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Sparkles, Image, Video, Library, BarChart3, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ContentGenerationModal from "@/components/ContentGenerationModal";

export const Navigation = () => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showScrollButton = scrollY > 200;
  const showLogo = scrollY > 200;

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Conditional Rendering with Animation */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/6aa65cf0-6825-4a5e-b016-73d95f2a8174.png" 
                  alt="PhysicsWallah" 
                  className={`h-8 w-auto transition-all duration-300 ${
                    showLogo ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
                  }`} 
                />
                <div className="flex items-center space-x-2">
                  
                  
                </div>
              </Link>
            </div>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Models Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <span>Models</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/content" className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Content Generation</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/image" className="flex items-center space-x-2">
                      <Image className="h-4 w-4" />
                      <span>Image Generation</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/video" className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span>Video Generation</span>
                      <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Beta</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link 
                to="/library" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/library') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary'
                }`}
              >
                <Library className="h-4 w-4" />
                <span>Content Hub</span>
              </Link>

              <Link 
                to="/analytics" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/analytics') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>

              <Link 
                to="/templates" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/templates') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Templates</span>
              </Link>

              <Link 
                to="/faqs" 
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/faqs') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span>FAQs</span>
              </Link>
            </div>

            {/* CTA Button - Conditional Rendering */}
            <div className="flex items-center">
              <Button 
                className={`bg-primary hover:bg-primary/90 text-white transition-all duration-300 ${
                  showScrollButton ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                }`} 
                onClick={() => setIsModalOpen(true)}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Generation Modal */}
      <ContentGenerationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};
