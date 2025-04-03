
import React from 'react';
import Layout from '@/components/Layout';
import SubscriptionTiers from '@/components/SubscriptionTiers';

const Subscription: React.FC = () => {
  return (
    <Layout>
      <div className="pt-20">
        <SubscriptionTiers />
      </div>
    </Layout>
  );
};

export default Subscription;
