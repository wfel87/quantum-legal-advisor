
import React from 'react';
import Layout from '@/components/Layout';
import { ShieldCheck, Lock, Server, Database, FileCheck, UserCheck } from 'lucide-react';

const Security: React.FC = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All documents are encrypted in transit and at rest using AES-256 encryption standards, ensuring your legal documents remain secure.'
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Our platform is hosted on SOC 2 compliant servers with redundant backups and disaster recovery protocols.'
    },
    {
      icon: Database,
      title: 'Data Isolation',
      description: 'Your organization\'s data is completely isolated from other customers, preventing any cross-contamination of sensitive information.'
    },
    {
      icon: FileCheck,
      title: 'Compliance Controls',
      description: 'Built-in compliance with GDPR, CCPA, HIPAA, and other major regulatory frameworks relevant to legal document management.'
    },
    {
      icon: UserCheck,
      title: 'Role-Based Access',
      description: 'Granular permission controls allow you to determine exactly who can access, modify, or share specific documents within your organization.'
    },
    {
      icon: ShieldCheck,
      title: 'Regular Security Audits',
      description: 'Our systems undergo rigorous quarterly security assessments by independent third-party experts to identify and address potential vulnerabilities.'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Security</h1>
          <p className="text-lg text-muted-foreground">
            DocuScan is built with security as a foundation, not an afterthought. Our robust security measures ensure your legal documents remain private, protected, and compliant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
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

        <div className="rounded-xl glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Security Commitment</h2>
          <p className="mb-4">
            At DocuScan, we understand that legal documents often contain highly sensitive and confidential information. 
            That's why we've implemented security measures that exceed industry standards to ensure your data remains protected.
          </p>
          <p className="mb-4">
            Our security infrastructure is designed with a defense-in-depth approach, incorporating multiple layers of protection 
            to guard against unauthorized access, data breaches, and service disruptions.
          </p>
          <p>
            We maintain strict compliance with relevant legal and regulatory requirements for data handling and storage. 
            Our platform is regularly audited by independent security experts to validate our security controls and identify any areas for improvement.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Security Certifications</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['ISO 27001', 'SOC 2', 'GDPR Compliant', 'HIPAA Compliant'].map((cert, index) => (
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
