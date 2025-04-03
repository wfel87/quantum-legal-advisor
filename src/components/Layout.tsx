
import React from 'react';
import AppSidebar from './AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="pt-4 px-4 md:px-6">
          <div className="flex items-center h-12 mb-4">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-2xl font-bold">DocuScan</h1>
          </div>
          <div className="flex-grow">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
