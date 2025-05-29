import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Users, Zap, ArrowRight, Star, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ContentGenerationModal from "@/components/ContentGenerationModal";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const topPerformingContent = [{
    title: "Physics Wallah New Course Launch",
    channel: "WhatsApp",
    performance: "+45% CTR",
    type: "Marketing",
    rating: 4.8
  }, {
    title: "JEE Preparation Tips",
    channel: "Push Notification",
    performance: "+32% Opens",
    type: "Educational",
    rating: 4.9
  }, {
    title: "Limited Time Offer - NEET",
    channel: "Email",
    performance: "+28% Conversions",
    type: "Sales",
    rating: 4.7
  }, {
    title: "Chemistry Lab Sessions",
    channel: "WhatsApp",
    performance: "+38% CTR",
    type: "Educational",
    rating: 4.6
  }, {
    title: "Mock Test Series",
    channel: "Push Notification",
    performance: "+41% Opens",
    type: "Assessment",
    rating: 4.8
  }];
  const quickTips = ["Use specific tone guidelines for better AI output", "Include target audience details for personalized content", "Test different content variations for optimal performance", "Leverage voice input for faster content briefs"];
  const briefFAQs = [{
    question: "How do I generate content?",
    answer: "Navigate to Content Generation, fill in your requirements, and click 'Generate Content'."
  }, {
    question: "Which channels are supported?",
    answer: "WhatsApp, Email, SMS, Push Notifications, and Social Media."
  }, {
    question: "How does voice input work?",
    answer: "Click the microphone icon to record your content requirements directly."
  }, {
    question: "Can I collaborate with my team?",
    answer: "Yes! Content is tagged by department and team for easy collaboration."
  }, {
    question: "How long is content stored?",
    answer: "All generated content is saved in your library for 30 days."
  }];
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative overflow-hidden">
        {/* Background Logo with Parallax */}
        <div className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-5 pointer-events-none transition-transform duration-100 ease-out" style={{
        backgroundImage: `url('/lovable-uploads/7329657c-a2f4-40dd-8a79-c874019d84fb.png')`,
        backgroundSize: '90%',
        transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`
      }} />
        
        <div className="text-center relative z-10">
          <div className="flex justify-center mb-6">
            
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Spend more time doing
            <span className="block text-primary">stuff that matters</span>
          </h1>
          
          <p className="text-xl mb-12 max-w-3xl mx-auto text-zinc-500">What took hours now takes seconds, without compromising quality</p>
          
          <div className="flex justify-center">
            <Button size="lg" onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-white px-12 py-6 font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-2xl">
              <Sparkles className="h-8 w-8 mr-3" />
              Generate
              <ArrowRight className="h-8 w-8 ml-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            
          </Card>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            
          </Card>
        </div>
      </div>

      {/* Top Performing Content Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 my-[240px]">
        <div className="text-center mb-12 my-[43px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Performing Content</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what's working best across all channels and teams
          </p>
        </div>
        
        <Carousel opts={{
        align: "start",
        loop: true
      }} plugins={[AutoPlay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })]} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {topPerformingContent.map((content, index) => <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {content.channel}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{content.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{content.title}</CardTitle>
                    <CardDescription>{content.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Performance</span>
                      <span className="text-sm font-semibold text-green-600">{content.performance}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>)}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Brief FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
              <HelpCircle className="h-6 w-6 text-primary" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
            <CardDescription>
              Quick answers to common questions about Alpha Gen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {briefFAQs.map((faq, index) => <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
            <div className="mt-6 text-center">
              <Link to="/faqs">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                  View All FAQs
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
      </div>

      {/* Content Generation Modal */}
      <ContentGenerationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>;
};

export default Index;
