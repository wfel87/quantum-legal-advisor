
import React from 'react';
import Layout from '@/components/Layout';
import WorkflowBuilder from '@/components/WorkflowBuilder';

const Workflow: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <WorkflowBuilder />
      </div>
    </Layout>
  );
};

export default Workflow;
