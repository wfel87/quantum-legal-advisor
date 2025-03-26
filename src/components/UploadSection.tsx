
import React, { useState } from 'react';
import { Upload, FileText, X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const UploadSection: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const newFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf' || 
             file.type === 'application/msword' || 
             file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (newFiles.length === 0) {
      toast.error('Please upload PDF or Word documents only');
      return;
    }
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        file => file.type === 'application/pdf' || 
               file.type === 'application/msword' || 
               file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      
      if (newFiles.length === 0) {
        toast.error('Please upload PDF or Word documents only');
        return;
      }
      
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const analyzeDocuments = () => {
    if (files.length === 0) {
      toast.error('Please upload at least one document');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate document analysis
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Documents analyzed successfully');
      navigate('/analysis');
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-6">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Upload Your Legal Documents</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload contracts, agreements, or any legal documents for AI-powered analysis. We support PDF and Word formats.
        </p>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 animate-fade-in
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`
        }
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">Drag & drop your documents here</h3>
          <p className="text-muted-foreground mb-6">or</p>
          
          <input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="file-upload">
            <Button as="span" className="cursor-pointer hover-scale">
              Select Files
            </Button>
          </label>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="mt-8 animate-slide-in">
          <h3 className="font-medium mb-4">Selected Documents</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-8 text-center animate-slide-in">
          <Button 
            size="lg" 
            className="hover-scale"
            onClick={analyzeDocuments}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Documents...
              </>
            ) : (
              <>
                Analyze Documents
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
