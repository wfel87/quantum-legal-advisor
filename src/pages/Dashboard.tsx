
import React from 'react';
import Layout from '@/components/Layout';
import DashboardComponent from '@/components/Dashboard';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <DashboardComponent />
      </div>
    </Layout>
  );
};

export default Dashboard;
