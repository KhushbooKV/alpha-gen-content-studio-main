
import { Link2, Download, FileText, Table, Cloud, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Integrations = () => {
  const { toast } = useToast();

  const integrations = [
    {
      name: "Google Sheets",
      description: "Export content directly to Google Sheets for team collaboration",
      icon: Table,
      status: "connected",
      features: ["Real-time sync", "Batch export", "Custom formatting"],
      color: "bg-green-100 text-green-700"
    },
    {
      name: "Google Docs",
      description: "Save generated content as formatted Google Docs",
      icon: FileText,
      status: "available",
      features: ["Auto formatting", "Template support", "Version control"],
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Google Drive", 
      description: "Store and organize all generated content in Google Drive",
      icon: Cloud,
      status: "connected",
      features: ["Folder organization", "Sharing controls", "Cloud storage"],
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      name: "Zapier",
      description: "Connect with 5000+ apps through Zapier automation",
      icon: Zap,
      status: "coming-soon",
      features: ["Workflow automation", "Trigger actions", "Multi-app sync"],
      color: "bg-purple-100 text-purple-700"
    }
  ];

  const exportFormats = [
    {
      name: "CSV Export",
      description: "Export content data in CSV format",
      icon: FileText,
      supported: true
    },
    {
      name: "DOCX Export",
      description: "Download as Microsoft Word documents",
      icon: FileText,
      supported: true
    },
    {
      name: "PDF Export",
      description: "Generate PDF reports and content",
      icon: FileText,
      supported: true
    },
    {
      name: "JSON Export",
      description: "Export structured data for developers",
      icon: FileText,
      supported: true
    }
  ];

  const handleConnect = (integration: string) => {
    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${integration}`,
    });
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Exporting content in ${format} format...`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
        <p className="text-gray-600">Connect Alpha Gen with your favorite tools and platforms</p>
      </div>

      {/* Connected Apps */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Connected Apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${integration.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <div>
                      {integration.status === "connected" && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                      {integration.status === "available" && (
                        <Badge variant="outline">Available</Badge>
                      )}
                      {integration.status === "coming-soon" && (
                        <Badge className="bg-gray-100 text-gray-600">Coming Soon</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {integration.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-3">
                      {integration.status === "connected" ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            Configure
                          </Button>
                          <Button variant="outline" size="sm" color="red">
                            Disconnect
                          </Button>
                        </>
                      ) : integration.status === "available" ? (
                        <Button 
                          onClick={() => handleConnect(integration.name)}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          <Link2 className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      ) : (
                        <Button disabled className="flex-1">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Export Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {exportFormats.map((format, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <format.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{format.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{format.description}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleExport(format.name)}
                  disabled={!format.supported}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* API Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link2 className="h-5 w-5 text-primary" />
            <span>API Access</span>
          </CardTitle>
          <CardDescription>
            Integrate Alpha Gen directly into your existing workflows with our API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Available Endpoints</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">POST</code>
                  Generate Content
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">GET</code>
                  Retrieve Library
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">GET</code>
                  Analytics Data
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs mr-2">POST</code>
                  Batch Operations
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Getting Started</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <code className="text-sm text-gray-800">
                    curl -X POST https://api.alphagen.pw/v1/generate<br/>
                    -H "Authorization: Bearer YOUR_API_KEY"<br/>
                    -H "Content-Type: application/json"
                  </code>
                </div>
                <Button className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  View API Documentation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;
