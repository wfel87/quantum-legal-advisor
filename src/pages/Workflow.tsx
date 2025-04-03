
import React from 'react';
import Layout from '@/components/Layout';
import WorkflowBuilder from '@/components/WorkflowBuilder';

const Workflow: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <WorkflowBuilder />
      </div>
    </Layout>
  );
};

export default Workflow;
