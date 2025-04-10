
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import UploadSection from '@/components/UploadSection';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <div className="mt-24">
        <Testimonials />
        <UploadSection />
      </div>
    </Layout>
  );
};

export default Index;
