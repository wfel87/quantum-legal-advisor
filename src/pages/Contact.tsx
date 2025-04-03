
import React from 'react';
import Layout from '@/components/Layout';
import { ContactForm } from '@/components/contact/ContactForm';
import { useContactForm } from '@/hooks/useContactForm';

const Contact: React.FC = () => {
  const { isSubmitting, submissionError, handleSubmit } = useContactForm();

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a Demo</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fill out the form below and one of our representatives will contact you to schedule a personalized demo of DocuScan.
          </p>
        </div>
        
        <ContactForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submissionError={submissionError}
        />
      </div>
    </Layout>
  );
};

export default Contact;
