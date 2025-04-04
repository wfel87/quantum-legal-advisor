
import React from 'react';
import Layout from '@/components/Layout';
import { ShieldCheck, Lock, Server, Database, FileCheck, Users, Globe, LockKeyhole } from 'lucide-react';

const Security: React.FC = () => {
  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: 'Top-Secret Clearance',
      description: 'Platform meets SCIF (Sensitive Compartmented Information Facility) requirements with multi-level security classification.'
    },
    {
      icon: Lock,
      title: 'Quantum Encryption',
      description: 'Post-quantum cryptographic algorithms resistant to both classical and quantum computing attacks.'
    },
    {
      icon: Server,
      title: 'Air-Gapped Systems',
      description: 'Physically isolated networks for the most sensitive operations with strict access controls.'
    },
    {
      icon: Database,
      title: 'Data Sovereignty',
      description: 'Geographic data storage controls ensure compliance with national security requirements and regulations.'
    },
    {
      icon: FileCheck,
      title: 'Intelligence Controls',
      description: 'Built-in compliance with IC directives, NIST standards, and FedRAMP High certification requirements.'
    },
    {
      icon: Globe,
      title: 'Cross-Domain Solutions',
      description: 'Secure information exchange between networks of different security classifications while preventing data leakage.'
    },
    {
      icon: Users,
      title: 'Identity Verification',
      description: 'Multi-factor authentication with biometric verification and hardware security keys for authorized personnel.'
    },
    {
      icon: LockKeyhole,
      title: 'Continuous Monitoring',
      description: 'Real-time threat detection with automated incident response capabilities and comprehensive audit logging.'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Government-Grade Security</h1>
          <p className="text-lg text-muted-foreground">
            QuantumGov is engineered with unprecedented security measures to protect the most sensitive national security information and intelligence operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityFeatures.slice(0, 4).map((feature, index) => (
            <div 
              key={index} 
              className="rounded-xl glass-card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl glass-card p-8 mb-12 bg-gradient-to-r from-slate-50 to-blue-50">
          <h2 className="text-2xl font-bold mb-4">Intelligence Community Approved</h2>
          <p className="mb-4">
            QuantumGov has been designed from the ground up to meet the stringent security requirements of intelligence agencies and defense departments.
            Our platform is certified for use with classified information and sensitive operations.
          </p>
          <p className="mb-4">
            The system employs a defense-in-depth approach with multiple security layers to protect against sophisticated adversaries, 
            including nation-state actors and advanced persistent threats (APTs).
          </p>
          <p>
            All operations are conducted with zero-trust security principles, ensuring continuous verification regardless of 
            user clearance level or network location. Every access request is fully authenticated, authorized, and encrypted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityFeatures.slice(4, 8).map((feature, index) => (
            <div 
              key={index} 
              className="rounded-xl glass-card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Compliance & Certifications</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['NIST 800-53', 'FIPS 140-3', 'FedRAMP High', 'CMMC Level 5', 'ICD 503', 'FISA 702 Compliance', 'EO 14028', 'CNSS 1253'].map((cert, index) => (
              <div key={index} className="py-3 px-6 rounded-full bg-primary/10 font-medium">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Security;
