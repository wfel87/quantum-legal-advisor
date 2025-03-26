
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import UploadSection from '@/components/UploadSection';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <UploadSection />
    </Layout>
  );
};

export default Index;
