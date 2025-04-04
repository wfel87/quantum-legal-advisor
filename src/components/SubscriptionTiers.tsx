
import React from 'react';
import { Check, Shield, AtomIcon, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SubscriptionTiers: React.FC = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      name: 'Standard',
      description: 'Essential security capabilities for governmental agencies',
      price: 'Contact Sales',
      icon: Shield,
      iconColor: 'bg-blue-50 text-blue-500',
      features: [
        'Secure document storage',
        'Automated threat detection',
        'Basic intelligence analysis',
        'Limited user accounts (10)',
        'Standard support SLA',
        'Single-agency access'
      ],
      cta: 'Request Access',
      highlight: false
    },
    {
      name: 'Enhanced',
      description: 'Advanced security for intelligence operations',
      price: 'Contact Sales',
      icon: Database,
      iconColor: 'bg-purple-50 text-purple-500',
      features: [
        'Everything in Standard',
        'Advanced risk assessment',
        'Threat prediction',
        'Inter-agency collaboration',
        'Secure communication channels',
        'Priority support SLA',
        'Multi-agency access (5)'
      ],
      cta: 'Request Access',
      highlight: true
    },
    {
      name: 'Elite',
      description: 'Quantum-powered intelligence for highest security needs',
      price: 'Contact Sales',
      icon: AtomIcon,
      iconColor: 'bg-amber-50 text-amber-500',
      features: [
        'Everything in Enhanced',
        'Quantum-powered analytics',
        'Pattern recognition algorithms',
        'Real-time global threat monitoring',
        'Top-Secret clearance capabilities',
        'Custom quantum solutions',
        'Unlimited agency access',
        'Dedicated security team'
      ],
      cta: 'Request Access',
      highlight: false
    }
  ];

  const handleSelectTier = (tier: string) => {
    // In a real application, this would handle subscription selection
    // and payment processing
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-6 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">QuantumGov Access Levels</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the security level that meets your agency's operational requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name} 
            className={`rounded-xl glass-card p-6 flex flex-col hover-scale relative ${
              tier.highlight 
                ? 'border-2 border-primary shadow-lg' 
                : 'border border-border'
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
            )}
            
            <div className={`w-12 h-12 rounded-lg ${tier.iconColor} flex items-center justify-center mb-4`}>
              <tier.icon size={24} />
            </div>
            
            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <p className="text-muted-foreground mb-4">{tier.description}</p>
            
            <div className="mb-6">
              <span className="text-xl font-bold">{tier.price}</span>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className="w-full justify-center"
              variant={tier.highlight ? "default" : "outline"}
              onClick={() => handleSelectTier(tier.name)}
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionTiers;
