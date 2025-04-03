
import React, { useState } from 'react';
import { 
  FileText, AlertTriangle, Calendar, Clipboard, 
  Users, DollarSign, Clock, ChevronDown, ChevronUp, BarChart3, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock analysis data
const mockAnalysis = {
  documentName: 'Employment Agreement - John Smith',
  documentType: 'Employment Contract',
  dateAdded: '2023-09-15',
  parties: [
    { name: 'ABC Corporation', role: 'Employer' },
    { name: 'John Smith', role: 'Employee' }
  ],
  keyTerms: [
    { term: 'Employment Term', description: '3 years with automatic 1-year renewal', isRisky: false },
    { term: 'Compensation', description: '$95,000 per annum, paid bi-weekly', isRisky: false },
    { term: 'Probation Period', description: '90 days from commencement', isRisky: false },
    { term: 'Termination Notice', description: '30 days written notice required', isRisky: true },
    { term: 'Intellectual Property', description: 'All work product belongs to Employer', isRisky: false },
    { term: 'Non-Compete', description: '1 year after termination within 100 mile radius', isRisky: true },
    { term: 'Confidentiality', description: 'Perpetual obligation to maintain confidentiality', isRisky: false }
  ],
  obligations: [
    { party: 'Employee', description: 'Must work exclusively for Employer', deadline: 'Duration of employment' },
    { party: 'Employee', description: 'Must return all company property upon termination', deadline: '7 days from termination date' },
    { party: 'Employer', description: 'Must provide health insurance benefits', deadline: 'From employment start date' },
    { party: 'Employer', description: 'Annual performance review', deadline: 'Every 12 months from start date' }
  ],
  risks: [
    { 
      description: 'Termination notice period may be shorter than industry standard', 
      severity: 'Medium',
      recommendation: 'Consider extending notice period to 60 days'
    },
    { 
      description: 'Non-compete clause may face enforceability challenges in certain jurisdictions', 
      severity: 'High',
      recommendation: 'Narrow geographic scope or reduce duration to improve enforceability'
    },
    { 
      description: 'Intellectual property clause does not specify treatment of pre-existing IP', 
      severity: 'Medium',
      recommendation: 'Add language to exclude pre-existing IP owned by employee'
    }
  ]
};

const AnalysisResults: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 md:p-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Document Analysis Preview</h1>
          <p className="text-muted-foreground">
            Experience our powerful AI-driven document analysis capabilities. Sign up for full access.
          </p>
        </div>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: Clipboard, 
              title: 'Key Terms Identified', 
              value: '7+', 
              color: 'bg-blue-50 text-blue-500' 
            },
            { 
              icon: AlertTriangle, 
              title: 'Potential Risks', 
              value: '3+', 
              color: 'bg-red-50 text-red-500' 
            },
            { 
              icon: Clock, 
              title: 'Obligations', 
              value: '4+', 
              color: 'bg-green-50 text-green-500' 
            },
          ].map((stat, index) => (
            <div key={index} className="rounded-xl glass-card p-6 hover-scale">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <h3 className="text-lg font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Full Analysis Locked
            </CardTitle>
            <CardDescription>
              Sign up to see the complete analysis with all details and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card/50">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Document Type
                </h3>
                <p className="text-muted-foreground">Employment Contract</p>
              </div>
              <div className="p-4 rounded-lg border bg-card/50">
                <h3 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Added On
                </h3>
                <p className="text-muted-foreground">2023-09-15</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg border">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Key Terms Preview</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Employment Term: 3 years with automatic renewal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Compensation: $95,000 per annum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Probation Period: 90 days</span>
                  </li>
                </ul>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="text-center p-6">
                  <Lock className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
                  <p className="text-muted-foreground mb-4">
                    Sign up to access the full analysis and all premium features
                  </p>
                  <Button onClick={() => navigate('/subscription')}>
                    Sign Up Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button size="lg" onClick={() => navigate('/subscription')}>
            Sign Up for Full Access
          </Button>
        </div>
      </div>
    );
  }

  // Full view for authenticated users
  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{mockAnalysis.documentName}</h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            {mockAnalysis.documentType}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Added on {new Date(mockAnalysis.dateAdded).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            icon: Clipboard, 
            title: 'Key Terms Identified', 
            value: mockAnalysis.keyTerms.length, 
            color: 'bg-blue-50 text-blue-500' 
          },
          { 
            icon: AlertTriangle, 
            title: 'Potential Risks', 
            value: mockAnalysis.risks.length, 
            color: 'bg-red-50 text-red-500' 
          },
          { 
            icon: Clock, 
            title: 'Obligations', 
            value: mockAnalysis.obligations.length, 
            color: 'bg-green-50 text-green-500' 
          },
        ].map((stat, index) => (
          <div key={index} className="rounded-xl glass-card p-6 hover-scale">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <h3 className="text-lg font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="summary" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="parties">Parties</TabsTrigger>
          <TabsTrigger value="terms">Key Terms</TabsTrigger>
          <TabsTrigger value="obligations">Obligations</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="animate-slide-in">
          <div className="rounded-xl glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Document Summary
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Document Type</h3>
                <p className="text-muted-foreground">
                  {mockAnalysis.documentType}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Key Parties</h3>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysis.parties.map((party, index) => (
                    <div key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {party.name} ({party.role})
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Key Findings</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Standard employment agreement with typical provisions</li>
                  <li>Contains potentially problematic non-compete clause</li>
                  <li>Intellectual property clause requires clarification</li>
                  <li>Termination notice period shorter than industry standard</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recommended Actions</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Review and potentially revise non-compete clause</li>
                  <li>Consider extending termination notice period</li>
                  <li>Clarify intellectual property provisions</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="parties" className="animate-slide-in">
          <div className="rounded-xl glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Parties
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAnalysis.parties.map((party, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card">
                  <h3 className="font-medium">{party.name}</h3>
                  <p className="text-muted-foreground">{party.role}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="terms" className="animate-slide-in">
          <div className="rounded-xl glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Clipboard className="mr-2 h-5 w-5 text-primary" />
              Key Terms
            </h2>
            
            <div className="space-y-4">
              {mockAnalysis.keyTerms.map((term, index) => (
                <div key={index} className={`p-4 rounded-lg border ${term.isRisky ? 'border-red-200 bg-red-50' : 'bg-card'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{term.term}</h3>
                      <p className="text-muted-foreground">{term.description}</p>
                    </div>
                    {term.isRisky && (
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Risk Identified
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="obligations" className="animate-slide-in">
          <div className="rounded-xl glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Obligations
            </h2>
            
            <div className="space-y-4">
              <Accordion type="multiple" className="w-full">
                {['Employee', 'Employer'].map((partyType) => (
                  <AccordionItem key={partyType} value={partyType}>
                    <AccordionTrigger className="text-lg font-medium">
                      {partyType} Obligations
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        {mockAnalysis.obligations
                          .filter(o => o.party === partyType)
                          .map((obligation, index) => (
                            <div key={index} className="p-4 rounded-lg border bg-card">
                              <h3 className="font-medium">{obligation.description}</h3>
                              <p className="text-sm text-muted-foreground">
                                Deadline: {obligation.deadline}
                              </p>
                            </div>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="risks" className="animate-slide-in">
          <div className="rounded-xl glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
              Identified Risks
            </h2>
            
            <div className="space-y-4">
              {mockAnalysis.risks.map((risk, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <h3 className="font-medium">{risk.description}</h3>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                      {risk.severity} Risk
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Recommendation:</span> {risk.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="hover-scale">
          Download Analysis
        </Button>
        <Button className="hover-scale">
          Share Analysis
        </Button>
      </div>
    </div>
  );
};

// Helper component for the preview
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default AnalysisResults;
