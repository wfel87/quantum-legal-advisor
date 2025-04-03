
import React, { useState } from 'react';
import { FileText, ArrowRight, Eye, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PublicWorkflowPreview: React.FC = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSignUpClick = () => {
    navigate('/subscription');
  };

  const handleTryFeatureClick = () => {
    toast.info('This feature requires a full account', {
      description: 'Sign up to access all workflow features'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Workflow Builder (Preview)</h2>
        <p className="text-muted-foreground">
          Build customized document analysis workflows to automate your legal processes
        </p>
      </div>

      {/* Preview CTA banner */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Streamline Your Document Workflow</h3>
              <p className="text-sm text-muted-foreground mb-2">
                This is a preview of our full workflow builder. Sign up to access all features.
              </p>
            </div>
            <Button onClick={handleSignUpClick} className="whitespace-nowrap">
              Get Full Access <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sample Workflow */}
      <div className="rounded-xl glass-card p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Sample Workflow</h3>
        
        <div className="space-y-3">
          {[
            {
              id: 'upload',
              title: 'Document Upload',
              description: 'Upload legal documents for analysis',
              icon: FileText
            },
            {
              id: 'analyze',
              title: 'Document Analysis',
              description: 'Extract key terms and clauses',
              icon: Eye
            },
            {
              id: 'risk-assessment',
              title: 'Risk Assessment',
              description: 'Identify potential legal risks',
              icon: AlertTriangle,
              locked: !isExpanded
            },
            {
              id: 'compliance',
              title: 'Compliance Check',
              description: 'Verify regulatory compliance',
              icon: Check,
              locked: !isExpanded
            }
          ].map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center p-4 rounded-lg border bg-card relative ${
                step.locked ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">
                    {index + 1}. {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {step.locked && (
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  onClick={handleTryFeatureClick}
                >
                  Unlock
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm"
          >
            {isExpanded ? 'Show Less' : 'Show More Steps'}
          </Button>
        </div>
      </div>
      
      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          {
            title: 'Drag & Drop Builder',
            description: 'Build custom workflows by dragging and dropping steps',
            unlocked: true
          },
          {
            title: 'Custom Configuration',
            description: 'Customize each step with specific settings',
            unlocked: false
          },
          {
            title: 'Save Templates',
            description: 'Save workflows as templates for future use',
            unlocked: false
          },
          {
            title: 'Share & Collaborate',
            description: 'Share workflows with team members',
            unlocked: false
          }
        ].map((feature, index) => (
          <Card key={index} className={feature.unlocked ? '' : 'opacity-70'}>
            <CardContent className="p-6">
              <h4 className="text-lg font-medium mb-2 flex items-center">
                {feature.title}
                {!feature.unlocked && (
                  <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              
              {!feature.unlocked && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  onClick={handleTryFeatureClick}
                >
                  Try Feature
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* CTA Footer */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ready to build your own workflows?</CardTitle>
          <CardDescription>
            Sign up for full access to all workflow builder features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Button onClick={handleSignUpClick} size="lg">
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicWorkflowPreview;
