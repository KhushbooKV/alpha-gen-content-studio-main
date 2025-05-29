
import { useState } from "react";
import { Search, BookOpen, Lightbulb, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-700",
      faqs: [
        {
          question: "How do I generate my first piece of content?",
          answer: "Navigate to the Content Generation page, fill in the required fields like department, channel type, and content brief, then click 'Generate Content'. The AI will create tailored content based on your inputs."
        },
        {
          question: "Which channels are supported?",
          answer: "Alpha Gen supports WhatsApp, Email, SMS, Push Notifications, and Social Media content generation. Each channel has specific formatting and best practices built into the AI."
        },
        {
          question: "How does the voice input feature work?",
          answer: "Click the microphone icon in the requirement brief field to record your content requirements. The AI will transcribe and structure your speech into the appropriate form fields automatically."
        }
      ]
    },
    {
      title: "Content Optimization",
      icon: Lightbulb,
      color: "bg-green-100 text-green-700",
      faqs: [
        {
          question: "How can I improve content performance?",
          answer: "Use specific tonality guidelines, include detailed target audience information, provide pricing details when relevant, and reference successful past content. The more context you provide, the better the AI output."
        },
        {
          question: "What makes content perform better on different channels?",
          answer: "WhatsApp content performs better with emojis and casual tone, Email content needs clear subject lines and structured formatting, Push notifications require urgency and brevity, SMS needs concise messaging under 160 characters."
        },
        {
          question: "How do I use the sample content feature effectively?",
          answer: "Provide examples of your best-performing content in the sample content field. The AI will analyze the style, tone, and structure to create similar high-performing content."
        }
      ]
    },
    {
      title: "Features & Functionality",
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-700",
      faqs: [
        {
          question: "How long is content stored in the library?",
          answer: "All generated content is automatically saved to your Content Library for 30 days. You can favorite important content to ensure easy access and download content for permanent storage."
        },
        {
          question: "Can I collaborate with my team on content?",
          answer: "Yes! Content is tagged by department and team. You can filter the library by team, share content links, and export content for team collaboration through Google Sheets and Docs integrations."
        },
        {
          question: "What analytics are available?",
          answer: "The Analytics dashboard shows content performance by channel, team productivity, weekly trends, and top-performing content. You can track CTR, open rates, and engagement metrics across all channels."
        }
      ]
    },
    {
      title: "Troubleshooting",
      icon: AlertCircle,
      color: "bg-red-100 text-red-700", 
      faqs: [
        {
          question: "The AI generated content doesn't match my requirements",
          answer: "Try providing more specific details in the requirement brief, select the appropriate tonality, include target audience details, and reference sample content. The AI learns from more detailed inputs."
        },
        {
          question: "Voice input is not working",
          answer: "Ensure your browser has microphone permissions enabled for the Alpha Gen website. Chrome and Firefox work best for voice input functionality. Check your browser settings if issues persist."
        },
        {
          question: "Content generation is taking too long",
          answer: "Generation typically takes 15-30 seconds. If it's taking longer, try refreshing the page and generating again. Complex content with multiple requirements may take up to 60 seconds."
        }
      ]
    }
  ];

  const quickTips = [
    "Always specify your target audience (JEE/NEET students, parents, etc.)",
    "Include pricing information for promotional content",
    "Use the tonality field to match your brand voice", 
    "Provide sample content for consistency with past campaigns",
    "Tag content appropriately for easy library searching",
    "Test different variations of the same content brief"
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600">Everything you need to know about using Alpha Gen effectively</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Quick Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span>Quick Tips for Better Results</span>
          </CardTitle>
          <CardDescription>
            Follow these best practices to get the most out of Alpha Gen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {filteredFAQs.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span>{category.title}</span>
                  <Badge variant="secondary">{category.faqs.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Accordion type="multiple" className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}

      {/* Contact Support */}
      <Card className="mt-8">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Contact Support Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQs;
