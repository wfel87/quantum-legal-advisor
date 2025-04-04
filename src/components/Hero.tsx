
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Database, LockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('[data-animate]');
    
    if (elements) {
      elements.forEach((el, index) => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 100 + index * 150);
      });
    }
  }, []);

  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <div ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20 px-6 md:px-10">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <div data-animate className="mb-4 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary"></span>
            <span>Introducing QuantumGov for government agencies</span>
          </div>
          
          <h1 data-animate className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight text-balance mb-6">
            Quantum-powered intelligence and security platform
          </h1>
          
          <p data-animate className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl text-balance">
            Harness the power of quantum computing for advanced intelligence analysis, secure communications, and inter-agency collaboration with military-grade encryption.
          </p>
          
          <div data-animate className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="hover-scale group" onClick={() => navigate('/dashboard')}>
              Request Access <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
            <Button variant="outline" size="lg" className="hover-scale" onClick={() => navigate('/contact')}>
              Schedule Demo
            </Button>
          </div>
          
          <div data-animate className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Shield, 
                title: "Top-Secret Clearance", 
                description: "SCIF-compliant platform with multi-level security classification for sensitive data.",
                path: "/security"
              },
              { 
                icon: Database, 
                title: "Quantum Intelligence", 
                description: "Process vast datasets and identify patterns with quantum-powered analytics.",
                path: "/workflow-preview"
              },
              { 
                icon: LockKeyhole, 
                title: "Zero-Trust Security", 
                description: "Post-quantum cryptography with advanced authentication protocols.",
                path: "/security"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl glass-card hover-scale cursor-pointer"
                onClick={() => handleFeatureClick(feature.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleFeatureClick(feature.path);
                  }
                }}
                aria-label={`Learn more about ${feature.title}`}
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
