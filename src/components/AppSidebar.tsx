
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  AtomIcon, 
  FileText, 
  Workflow, 
  Scale, 
  Settings
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const AppSidebar = () => {
  const location = useLocation();
  
  // Define menu items
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Quantum Dashboard', path: '/quantum-dashboard', icon: AtomIcon },
    { name: 'Workflow', path: '/workflow', icon: Workflow },
    { name: 'Analysis', path: '/analysis', icon: FileText },
    { name: 'Legal Advisor', path: '/legal-advisor', icon: Scale },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-semibold">
            <AtomIcon size={18} />
          </div>
          <span className="font-semibold text-xl tracking-tight">DocuScan</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.name}
                  >
                    <Link to={item.path}>
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 pb-3 pt-2 space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => location.pathname !== '/subscription' && (window.location.href = '/subscription')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
          <Button className="w-full justify-start">
            Get Started
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
