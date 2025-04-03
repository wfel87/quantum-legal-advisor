
import React from 'react';
import Layout from '@/components/Layout';
import QuantumDashboard from '@/components/QuantumDashboard';

const QuantumDashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <QuantumDashboard />
      </div>
    </Layout>
  );
};

export default QuantumDashboardPage;
