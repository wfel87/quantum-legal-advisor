
import React, { useEffect } from 'react';
import AppSidebar from './AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { setOpen } = useSidebar();
  
  // Listen for mouse movement near the edge to detect hover intention
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If mouse is within 20px of the left edge, show the sidebar
      if (e.clientX <= 20) {
        setOpen(true);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setOpen]);

  return (
    <>
      <AppSidebar />
      <SidebarInset className="pt-4 px-4 md:px-6">
        <div className="flex items-center h-12 mb-4">
          <SidebarTrigger className="mr-4 text-primary" />
          <h1 className="text-2xl font-bold">DocuScan</h1>
        </div>
        <div className="flex-grow">
          {children}
        </div>
      </SidebarInset>
    </>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-background/90">
        <LayoutContent>
          {children}
        </LayoutContent>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
