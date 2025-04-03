
import React from 'react';
import Layout from '@/components/Layout';
import PricingTiers from '@/components/PricingTiers';

const Pricing: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <PricingTiers />
      </div>
    </Layout>
  );
};

export default Pricing;
