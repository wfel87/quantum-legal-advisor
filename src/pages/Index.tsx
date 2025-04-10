
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import UploadSection from '@/components/UploadSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <div className="mt-12 text-center">
        <div className="max-w-2xl mx-auto px-4 mb-12">
          <div className="inline-flex items-center text-primary gap-2 mb-2">
            <Scale className="h-5 w-5" />
            <span className="font-medium">New Feature</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Our Legal Advisor</h2>
          <p className="text-muted-foreground mb-6">
            Upload contracts, agreements, or any legal documents for AI-powered analysis. 
            We support PDF and Word formats.
          </p>
          <Button asChild className="hover-scale">
            <Link to="/legal-advisor">Try Legal Advisor</Link>
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <Testimonials />
        <UploadSection />
      </div>
    </Layout>
  );
};

export default Index;
