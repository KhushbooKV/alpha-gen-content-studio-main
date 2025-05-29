import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  useCase: string;
  onTemplateSelect: (templateUrl: string) => void;
}

const TemplateSelectionModal = ({ isOpen, onClose, useCase, onTemplateSelect }: TemplateSelectionModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const inAppTemplates = [
    "/lovable-uploads/70cc6535-19ef-49d1-8e0f-305a873f7501.png",
    "/lovable-uploads/212699cb-3369-4ce7-8b11-9129bea3b22b.png",
    "/lovable-uploads/559714e0-53ce-4c9a-9c11-4ee5578fd48a.png",
    "/lovable-uploads/e8b61609-ce89-4058-9a53-5ee995df62aa.png"
  ];

  const paidAdTemplates = [
    "/lovable-uploads/51cd0bdf-647f-4fbd-8a9e-58be4c47f8d8.png",
    "/lovable-uploads/58f13147-bdaf-4ff0-9f79-90bbddda16f5.png",
    "/lovable-uploads/2ec20866-f0f8-4b5a-b68a-e5490504521c.png",
    "/lovable-uploads/b34bd81a-4928-43b7-b93e-1c6dd0d393b7.png"
  ];

  const templates = useCase === "inApp" ? inAppTemplates : paidAdTemplates;

  const handleTemplateSelect = (templateUrl: string) => {
    setSelectedTemplate(templateUrl);
  };

  const handleConfirm = () => {
    if (selectedTemplate) {
      onTemplateSelect(selectedTemplate);
      onClose();
      setSelectedTemplate("");
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedTemplate("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Template</DialogTitle>
          <DialogDescription>
            Choose a template for your {useCase === "inApp" ? "In-App" : "Paid Ad"} image
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
            {templates.map((template, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate === template ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent className="p-4">
                  <img 
                    src={template} 
                    alt={`Template ${index + 1}`} 
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <p className="text-center mt-2 text-sm text-gray-600">
                    Template {index + 1}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedTemplate}
            className="bg-primary hover:bg-primary/90"
          >
            Select Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;
