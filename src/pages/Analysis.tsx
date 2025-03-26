
import React from 'react';
import Layout from '@/components/Layout';
import AnalysisResults from '@/components/AnalysisResults';

const Analysis: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <AnalysisResults />
      </div>
    </Layout>
  );
};

export default Analysis;
