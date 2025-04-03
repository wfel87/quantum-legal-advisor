
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import UploadSection from '@/components/UploadSection';
import Testimonials from '@/components/Testimonials';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Testimonials />
      <UploadSection />
    </Layout>
  );
};

export default Index;
