import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  AtomIcon, 
  FileText, 
  Workflow, 
  Scale, 
  Settings,
  Pin,
  PinOff
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
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const AppSidebar = () => {
  const location = useLocation();
  const { open, setOpen } = useSidebar();
  const [isPinned, setIsPinned] = useState(() => {
    // Load pinned state from localStorage if available
    const saved = localStorage.getItem('sidebar-pinned');
    return saved ? JSON.parse(saved) : true;
  });
  const [isHovered, setIsHovered] = useState(false);
  
  // Define menu items
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Quantum Dashboard', path: '/quantum-dashboard', icon: AtomIcon },
    { name: 'Workflow', path: '/workflow', icon: Workflow },
    { name: 'Analysis', path: '/analysis', icon: FileText },
    { name: 'Legal Advisor', path: '/legal-advisor', icon: Scale },
  ];

  // Save pinned state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-pinned', JSON.stringify(isPinned));
  }, [isPinned]);

  // Handle auto-hide behavior
  useEffect(() => {
    if (!isPinned) {
      if (isHovered) {
        // Show sidebar when hovered
        setOpen(true);
      } else {
        // Delay hiding the sidebar to prevent flicker
        const timer = setTimeout(() => setOpen(false), 300);
        return () => clearTimeout(timer);
      }
    } else {
      // Keep sidebar open when pinned
      setOpen(true);
    }
  }, [isPinned, isHovered, setOpen]);

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setOpen(true);
    }
  };

  return (
    <Sidebar 
      className="bg-background border-r border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SidebarHeader className="bg-background">
        <div className="flex items-center justify-between px-2 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-semibold">
              <AtomIcon size={18} />
            </div>
            <span className="font-semibold text-xl tracking-tight">DocuScan</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 ml-2"
                onClick={togglePin}
              >
                {isPinned ? <PinOff size={16} /> : <Pin size={16} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
            </TooltipContent>
          </Tooltip>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/70">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.name}
                    className="hover:bg-muted data-[active=true]:bg-muted/50"
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
      
      <SidebarFooter className="bg-background">
        <div className="px-3 pb-3 pt-2 space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start border-border hover:bg-muted"
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
