
import React, { useState } from 'react';
import { 
  FileText, ArrowRight, Plus, Trash2, 
  Eye, AlertTriangle, Check, Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult 
} from 'react-beautiful-dnd';
import { toast } from 'sonner';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';

// Types for workflow steps
type StepType = 'upload' | 'analyze' | 'risk-assessment' | 'compliance' | 'summary';

interface WorkflowStep {
  id: string;
  type: StepType;
  title: string;
  description: string;
  icon: React.ElementType;
}

const WorkflowBuilder: React.FC = () => {
  // Predefined steps that can be added to a workflow
  const availableSteps: WorkflowStep[] = [
    {
      id: 'upload',
      type: 'upload',
      title: 'Document Upload',
      description: 'Upload legal documents for analysis',
      icon: FileText
    },
    {
      id: 'analyze',
      type: 'analyze',
      title: 'Document Analysis',
      description: 'Extract key terms and clauses',
      icon: Eye
    },
    {
      id: 'risk-assessment',
      type: 'risk-assessment',
      title: 'Risk Assessment',
      description: 'Identify potential legal risks',
      icon: AlertTriangle
    },
    {
      id: 'compliance',
      type: 'compliance',
      title: 'Compliance Check',
      description: 'Verify regulatory compliance',
      icon: Check
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Summary Generation',
      description: 'Create plain-language summary',
      icon: FileText
    }
  ];

  // Current workflow steps
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    availableSteps[0], // Start with upload by default
    availableSteps[1]  // And analysis
  ]);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Add a step to the workflow
  const addStep = (step: WorkflowStep) => {
    // Prevent duplicates in workflow
    if (workflowSteps.some(s => s.id === step.id)) {
      toast.error('This step is already in your workflow');
      return;
    }
    
    setWorkflowSteps([...workflowSteps, step]);
    toast.success(`Added ${step.title} to workflow`);
  };

  // Remove a step from the workflow
  const removeStep = (index: number) => {
    // Don't allow removing the upload step (always first)
    if (index === 0) {
      toast.error('The upload step cannot be removed');
      return;
    }
    
    const newSteps = [...workflowSteps];
    newSteps.splice(index, 1);
    setWorkflowSteps(newSteps);
    toast.success('Step removed from workflow');
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    // Don't allow moving the upload step from first position
    if (result.source.index === 0) {
      toast.error('The upload step must remain first');
      return;
    }
    
    // Don't allow moving a step to the first position
    if (result.destination.index === 0) {
      toast.error('No step can replace the upload step');
      return;
    }
    
    const items = Array.from(workflowSteps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setWorkflowSteps(items);
  };

  // Save the current workflow
  const saveWorkflow = () => {
    // In a real app, this would save to a database
    toast.success('Workflow saved successfully');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Workflow Builder</h2>
          <Button onClick={() => setIsSettingsOpen(!isSettingsOpen)} variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
        <p className="text-muted-foreground">
          Customize your document analysis workflow by arranging the steps below
        </p>
      </div>
      
      <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen} className="mb-8">
        <CollapsibleContent className="rounded-xl glass-card p-4 mb-4">
          <h3 className="font-medium mb-2">Workflow Settings</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Configure additional settings for your workflow
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Workflow Name</label>
              <input 
                type="text" 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                placeholder="My Legal Workflow"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Analysis Level</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="basic">Basic (Text Analysis)</option>
                <option value="advanced">Advanced (AI Analysis)</option>
                <option value="quantum">Quantum (Premium Only)</option>
              </select>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="rounded-xl glass-card p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Current Workflow</h3>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="workflow">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {workflowSteps.map((step, index) => (
                  <Draggable 
                    key={step.id} 
                    draggableId={step.id} 
                    index={index}
                    isDragDisabled={index === 0} // First step can't be dragged
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center p-4 rounded-lg border bg-card relative ${
                          index === 0 ? 'opacity-90' : ''
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
                        
                        {index !== 0 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeStep(index)}
                            className="ml-2"
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      
      <div className="rounded-xl glass-card p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Available Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableSteps.filter(step => step.id !== 'upload').map((step) => (
            <div 
              key={step.id}
              className="p-4 rounded-lg border bg-card cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => addStep(step)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <step.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={saveWorkflow} 
          className="bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          Save Workflow
        </Button>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
