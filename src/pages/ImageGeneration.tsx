import { useState } from "react";
import { Image, Sparkles, Download, Save, Palette, Settings, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import TemplateSelectionModal from "@/components/TemplateSelectionModal";

const ImageGeneration = () => {
  const {
    toast
  } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [useCase, setUseCase] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // K12 fields
  const [h1Text, setH1Text] = useState("");
  const [h2Text, setH2Text] = useState("");
  const [batchName, setBatchName] = useState("");
  const [classDetails, setClassDetails] = useState("");
  const [price, setPrice] = useState("");

  // Testimonial fields
  const [testimonial, setTestimonial] = useState("");
  const [studentName, setStudentName] = useState("");
  const [examScore, setExamScore] = useState("");
  const [studentImageUrl, setStudentImageUrl] = useState("");
  const [studentImageType, setStudentImageType] = useState("");
  const [backgroundImageType, setBackgroundImageType] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [uploadedBackgroundFile, setUploadedBackgroundFile] = useState<File | null>(null);
  const [uploadedStudentFile, setUploadedStudentFile] = useState<File | null>(null);

  // Paid Ad fields
  const [tagline, setTagline] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleUseCaseChange = (value: string) => {
    setUseCase(value);
    if (value === "inApp" || value === "paidAd") {
      setShowTemplateModal(true);
    }
  };

  const handleTemplateSelect = (templateUrl: string) => {
    setSelectedTemplate(templateUrl);
    setGeneratedImage(""); // Clear any previously generated image
  };

  const handleBackgroundFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedBackgroundFile(file);
      // Create a URL for preview (in a real app, you'd upload to a server)
      const fileUrl = URL.createObjectURL(file);
      setBackgroundImageUrl(fileUrl);
      toast({
        title: "Background File Uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
  };
  const handleStudentFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedStudentFile(file);
      // Create a URL for preview (in a real app, you'd upload to a server)
      const fileUrl = URL.createObjectURL(file);
      setStudentImageUrl(fileUrl);
      toast({
        title: "Student Image Uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
  };
  const handlePost = async () => {
    const payload = {
     template_name: useCase ,
     testimonial:testimonial,
    // student_img:studentImageUrl,
    student_name:studentName,
    exam_score:examScore
    };
  
    try {
      const res = await fetch('https://n8n.penpencil.co/webhook/f38c4ceb-48bc-4c83-8ee3-a1c54c1975da', {
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
        console.log('data',data);
        
          setGeneratedImage(data?.imgUrl);

        
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
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again later.",
      });
    }
  };
  
  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate AI image generation
    setTimeout(() => {
       handlePost()
      setIsGenerating(false);
      toast({
        title: "Image Generated!",
        description: "Your AI-powered image is ready for download."
      });
    }, 3000);
  };

  const handleSave = () => {
    toast({
      title: "Image Saved",
      description: "Image has been saved to your library."
    });
  };
  const handleDownload = () => {
    toast({
      title: "Downloaded",
      description: "Image has been downloaded to your device."
    });
  };
  const isFormValid = () => {
    if (!useCase) return false;
    switch (useCase) {
      case "testimonial":
        return testimonial && studentName && examScore && studentImageUrl && backgroundImageType;
      case "paidAd":
        return h1Text && h2Text && batchName && tagline && actualPrice && offerPrice && studentImageUrl && backgroundImageType;
      case "inApp":
        return h1Text && h2Text && batchName && classDetails && price;
      default:
        return false;
    }
  };
  const renderStudentImageField = () => <>
      <div className="space-y-2">
        <Label htmlFor="studentImage">Student Image</Label>
        <Select value={studentImageType} onValueChange={setStudentImageType}>
          <SelectTrigger>
            <SelectValue placeholder="Select student image option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="url">Enter URL</SelectItem>
            <SelectItem value="upload">Upload from Device</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {studentImageType === "url" && <div className="space-y-2">
          <Label htmlFor="studentImageUrl">Student Image URL</Label>
          <Input id="studentImageUrl" placeholder="Enter student image URL" value={studentImageUrl} onChange={e => setStudentImageUrl(e.target.value)} />
        </div>}

      {studentImageType === "upload" && <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentFileUpload">Upload Student Image</Label>
            <div className="flex items-center gap-2">
              <Input id="studentFileUpload" type="file" accept="image/*" onChange={handleStudentFileUpload} className="hidden" />
              <Button type="button" variant="outline" onClick={() => document.getElementById('studentFileUpload')?.click()} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                {uploadedStudentFile ? uploadedStudentFile.name : "Choose Student Image"}
              </Button>
            </div>
            {uploadedStudentFile && <p className="text-sm text-gray-500">
                File selected: {uploadedStudentFile.name}
              </p>}
          </div>
        </div>}
    </>;
  const renderBackgroundImageField = () => <>
      <div className="space-y-2">
        <Label htmlFor="backgroundImage">Background Image</Label>
        <Select value={backgroundImageType} onValueChange={setBackgroundImageType}>
          <SelectTrigger>
            <SelectValue placeholder="Select background image option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Use Default</SelectItem>
            <SelectItem value="upload">Upload Manually</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {backgroundImageType === "upload" && <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backgroundImageUrl">Background Image URL</Label>
            <Input id="backgroundImageUrl" placeholder="Enter background image URL" value={backgroundImageUrl} onChange={e => setBackgroundImageUrl(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundFileUpload">Or Upload from Device</Label>
            <div className="flex items-center gap-2">
              <Input id="backgroundFileUpload" type="file" accept="image/*" onChange={handleBackgroundFileUpload} className="hidden" />
              <Button type="button" variant="outline" onClick={() => document.getElementById('backgroundFileUpload')?.click()} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                {uploadedBackgroundFile ? uploadedBackgroundFile.name : "Choose Background Image"}
              </Button>
            </div>
            {uploadedBackgroundFile && <p className="text-sm text-gray-500">
                File selected: {uploadedBackgroundFile.name}
              </p>}
          </div>
        </div>}
    </>;
  const renderUseCaseFields = () => {
    switch (useCase) {
      case "testimonial":
        return <>
            <div className="space-y-2">
              <Label htmlFor="testimonial">Testimonial</Label>
              <Textarea id="testimonial" placeholder="Enter testimonial text" value={testimonial} onChange={e => setTestimonial(e.target.value)} className="min-h-24" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input id="studentName" placeholder="Enter student name" value={studentName} onChange={e => setStudentName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="examScore">Exam Score</Label>
              <Input id="examScore" placeholder="Enter exam score" value={examScore} onChange={e => setExamScore(e.target.value)} />
            </div>

            {renderStudentImageField()}
            {renderBackgroundImageField()}
          </>;
      case "paidAd":
        return <>
            <div className="space-y-2">
              <Label htmlFor="h1">H1</Label>
              <Input id="h1" placeholder="Enter main heading" value={h1Text} onChange={e => setH1Text(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="h2">H2</Label>
              <Input id="h2" placeholder="Enter sub heading" value={h2Text} onChange={e => setH2Text(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchName">Batch Name</Label>
              <Input id="batchName" placeholder="Enter batch name" value={batchName} onChange={e => setBatchName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" placeholder="Enter tagline" value={tagline} onChange={e => setTagline(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualPrice">Actual Price</Label>
              <Input id="actualPrice" placeholder="Enter actual price" value={actualPrice} onChange={e => setActualPrice(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offerPrice">Offer Price</Label>
              <Input id="offerPrice" placeholder="Enter offer price" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} />
            </div>

            {renderStudentImageField()}
            {renderBackgroundImageField()}
          </>;
      case "inApp":
        return <>
            <div className="space-y-2">
              <Label htmlFor="h1">H1</Label>
              <Input id="h1" placeholder="Enter main heading" value={h1Text} onChange={e => setH1Text(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="h2">H2</Label>
              <Input id="h2" placeholder="Enter sub heading" value={h2Text} onChange={e => setH2Text(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchName">Batch Name</Label>
              <Input id="batchName" placeholder="Enter batch name" value={batchName} onChange={e => setBatchName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classDetails">Class Details</Label>
              <Input id="classDetails" placeholder="Enter class details" value={classDetails} onChange={e => setClassDetails(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
          </>;
      default:
        return null;
    }
  };

  const getTemplatePreview = () => {
    if (selectedTemplate) {
      return selectedTemplate;
    }
    if (useCase === "testimonial") {
      return "/lovable-uploads/973412d0-d028-4cde-bec9-e124ea62dd8a.png";
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Generation</h1>
        <p className="text-gray-600">Create stunning visuals with AI-powered image generation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-primary" />
              <span>Image Configuration</span>
            </CardTitle>
            <CardDescription>
              Configure your image based on use case
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="useCase">Use Case</Label>
              <Select value={useCase} onValueChange={handleUseCaseChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="testimonial">Testimonial</SelectItem>
                  <SelectItem value="paidAd">Paid Ad</SelectItem>
                  <SelectItem value="inApp">In-App</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {useCase && (
              <div className="space-y-4">
                {renderUseCaseFields()}
              </div>
            )}

            {useCase && (
              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Advanced Settings</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="ultra">Ultra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="variations">Variations</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Image</SelectItem>
                        <SelectItem value="2">2 Images</SelectItem>
                        <SelectItem value="4">4 Images</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <Button 
              onClick={handleGenerate} 
              className="w-full bg-primary hover:bg-primary/90" 
              disabled={isGenerating || !isFormValid()}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Image...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {generatedImage ? (
              <div className="space-y-4">
                <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                  <img src={generatedImage} alt="Generated content" className="w-full h-64 object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-500">Ready</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4 mr-2" />
                    Save to Library
                  </Button>
                </div>
                
                <div className="text-center">
                  <Button variant="ghost" size="sm" className="text-primary">
                    Generate More Variations
                  </Button>
                </div>
              </div>
            ) : getTemplatePreview() ? (
              <div className="space-y-4">
                <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                  <img src={getTemplatePreview()} alt="Template preview" className="w-full h-auto object-contain" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-500">
                      {selectedTemplate ? "Selected Template" : "Template Preview"}
                    </Badge>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600">
                  {selectedTemplate 
                    ? `Selected template for ${useCase.toUpperCase()} use case. Fill in the form and click "Generate Image" to create your custom image.`
                    : `This is a template preview for the ${useCase.toUpperCase()} use case. Fill in the form and click "Generate Image" to create your custom image.`
                  }
                </p>
              </div>
            ) : (
              <div className="text-center py-16">
                <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Create</h3>
                <p className="text-gray-500">Select a use case and fill in the details to create an image</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <TemplateSelectionModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        useCase={useCase}
        onTemplateSelect={handleTemplateSelect}
      />
    </div>
  );
};

export default ImageGeneration;
