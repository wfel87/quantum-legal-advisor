
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import LegalDocumentUpload from '@/components/LegalDocumentUpload';

const LegalAdvisor: React.FC = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto py-10 px-4 md:px-6 animate-fade-in">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Legal Advisor</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get AI-powered legal advice and document analysis with our quantum computing technology
          </p>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="advice">Legal Advice</TabsTrigger>
            <TabsTrigger value="documents">Document Analysis</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Check</TabsTrigger>
          </TabsList>
          
          <TabsContent value="advice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Ask for Legal Advice
                </CardTitle>
                <CardDescription>
                  Get instant answers to your legal questions from our AI advisor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 border rounded-lg bg-muted/50">
                  <p className="text-center text-muted-foreground">
                    You need to be logged in to access this feature.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Contract Review",
                  description: "Get your contracts reviewed for potential issues",
                  icon: FileText
                },
                {
                  title: "Risk Assessment",
                  description: "Identify legal risks in your business operations",
                  icon: AlertTriangle
                },
                {
                  title: "Compliance Guide",
                  description: "Ensure your business complies with relevant laws",
                  icon: CheckCircle
                }
              ].map((item, index) => (
                <Card key={index} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Document Analysis
                </CardTitle>
                <CardDescription>
                  Upload contracts, agreements, or any legal documents for AI-powered analysis. We support PDF and Word formats.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LegalDocumentUpload />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Compliance Check
                </CardTitle>
                <CardDescription>
                  Check if your business complies with regulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 border rounded-lg bg-muted/50">
                  <p className="text-center text-muted-foreground">
                    You need to be logged in to access this feature.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LegalAdvisor;
