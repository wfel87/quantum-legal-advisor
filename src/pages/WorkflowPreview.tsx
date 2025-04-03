
import React from 'react';
import Layout from '@/components/Layout';
import PublicWorkflowPreview from '@/components/PublicWorkflowPreview';

const WorkflowPreview: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <PublicWorkflowPreview />
      </div>
    </Layout>
  );
};

export default WorkflowPreview;
