
import React, { useState } from 'react';
import { 
  AtomIcon, BarChart3, Shield, FileCheck, Database, Globe,
  FileText, AlertTriangle, Clock, Settings, Layers,
  PlusCircle, CalendarClock, Gauge, Percent, Users, Radio
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, Legend, ComposedChart, Area } from 'recharts';

const QuantumDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentSubscription, setCurrentSubscription] = useState('Enhanced');
  
  // Mock data for charts
  const intelligenceAnalysisData = [
    { name: 'Jan', count: 42 },
    { name: 'Feb', count: 57 },
    { name: 'Mar', count: 63 },
    { name: 'Apr', count: 78 },
    { name: 'May', count: 91 },
    { name: 'Jun', count: 105 },
  ];
  
  const threatAssessmentData = [
    { name: 'Cyber', high: 14, medium: 22, low: 8 },
    { name: 'Physical', high: 6, medium: 12, low: 18 },
    { name: 'Insider', high: 9, medium: 15, low: 11 },
    { name: 'Foreign', high: 17, medium: 21, low: 5 },
  ];
  
  const securityClearanceData = [
    { name: 'Week 1', rating: 82 },
    { name: 'Week 2', rating: 85 },
    { name: 'Week 3', rating: 91 },
    { name: 'Week 4', rating: 94 },
  ];

  // New comparison data for quantum vs. traditional
  const comparisonData = [
    { 
      name: 'Processing Power', 
      quantum: 98, 
      traditional: 45,
      description: 'Data processing capabilities'
    },
    { 
      name: 'Encryption', 
      quantum: 99, 
      traditional: 78,
      description: 'Resistance to quantum attacks'
    },
    { 
      name: 'Pattern Detection', 
      quantum: 97, 
      traditional: 51,
      description: 'Ability to identify correlations'
    },
  ];

  // Performance comparison chart data
  const performanceData = [
    { name: 'Day 1', quantum: 92, traditional: 73 },
    { name: 'Day 2', quantum: 93, traditional: 74 },
    { name: 'Day 3', quantum: 95, traditional: 72 },
    { name: 'Day 4', quantum: 96, traditional: 75 },
    { name: 'Day 5', quantum: 98, traditional: 76 },
    { name: 'Day 6', quantum: 97, traditional: 75 },
    { name: 'Day 7', quantum: 99, traditional: 77 },
  ];

  // Card data
  const statCards = [
    { 
      title: 'Intelligence Reports', 
      value: '312', 
      change: '+18% from last quarter', 
      icon: FileText, 
      color: 'bg-blue-50 text-blue-500' 
    },
    { 
      title: 'Threat Alerts', 
      value: '47', 
      change: '-12% from last quarter', 
      icon: AlertTriangle, 
      color: 'bg-amber-50 text-amber-500' 
    },
    { 
      title: 'Quantum Analysis', 
      value: '86', 
      change: '+35% from last quarter', 
      icon: AtomIcon, 
      color: 'bg-purple-50 text-purple-500' 
    },
    { 
      title: 'Security Rating', 
      value: '95%', 
      change: '+3% from last quarter', 
      icon: Shield, 
      color: 'bg-green-50 text-green-500' 
    },
  ];

  // Upcoming tasks
  const upcomingTasks = [
    { 
      title: 'Cyber Intelligence Briefing', 
      dueDate: '2023-12-15', 
      priority: 'High',
      type: 'Intelligence'
    },
    { 
      title: 'Security Council Meeting', 
      dueDate: '2023-12-18', 
      priority: 'Medium',
      type: 'Meeting'
    },
    { 
      title: 'Risk Assessment: Satellite Systems', 
      dueDate: '2023-12-20', 
      priority: 'Medium',
      type: 'Assessment'
    },
    { 
      title: 'Quantum Analysis: Foreign Communications', 
      dueDate: '2023-12-22', 
      priority: 'High',
      type: 'Analysis'
    },
  ];

  // Premium features
  const quantumFeatures = [
    {
      title: 'Quantum Intelligence Analysis',
      description: 'Advanced pattern recognition for intelligence data',
      available: currentSubscription === 'Elite',
      icon: Database,
    },
    {
      title: 'Threat Prediction',
      description: 'Forecast potential security threats with quantum ML',
      available: currentSubscription === 'Elite',
      icon: BarChart3,
    },
    {
      title: 'Secure Inter-Agency Communication',
      description: 'Quantum-secured communication channels',
      available: currentSubscription === 'Elite',
      icon: Radio,
    },
    {
      title: 'Global Threat Monitoring',
      description: 'Real-time monitoring of global security threats',
      available: currentSubscription === 'Elite',
      icon: Globe,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComparisonIcon = (metric: string) => {
    switch (metric.toLowerCase()) {
      case 'processing power':
        return Database;
      case 'encryption':
        return Shield;
      case 'pattern detection':
        return Layers;
      default:
        return AtomIcon;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">QuantumGov Command Center</h1>
          <p className="text-muted-foreground">
            Secure intelligence and analytics platform for government agencies
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => navigate('/workflow')}
            className="flex items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            Operations
          </Button>
          
          <Button 
            onClick={() => navigate('/upload')}
            className="transition-transform duration-300 hover:scale-105"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Intelligence
          </Button>
        </div>
      </div>

      {/* New Quantum vs Traditional Comparison Section */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-purple-100 via-indigo-50 to-blue-100 p-6 border border-primary/20">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <AtomIcon className="mr-2 h-5 w-5 text-primary" />
          Quantum vs. Traditional Systems
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisonData.map((item, index) => {
            const Icon = getComparisonIcon(item.name);
            return (
              <div key={index} className="rounded-xl glass-card p-5 hover:shadow-lg transition-all">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="font-medium flex items-center">
                        <AtomIcon className="h-3 w-3 mr-1 text-primary" /> Quantum
                      </span>
                      <span className="font-bold">{item.quantum}%</span>
                    </div>
                    <Progress value={item.quantum} className="h-2 bg-primary/20" indicatorClassName="bg-primary" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="font-medium">Traditional</span>
                      <span className="font-bold">{item.traditional}%</span>
                    </div>
                    <Progress value={item.traditional} className="h-2 bg-muted" />
                  </div>
                  
                  <div className="pt-2 text-right">
                    <span className="inline-flex items-center text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      +{item.quantum - item.traditional}% improvement
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {currentSubscription !== 'Elite' && (
        <div className="mb-8 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 p-6 border border-primary/20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Upgrade to Elite Access</h3>
                <p className="text-muted-foreground">
                  Unlock top-secret capabilities and advanced quantum intelligence features
                </p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/subscription')}
              className="transition-transform duration-300 hover:scale-105"
            >
              Request Upgrade
            </Button>
          </div>
        </div>
      )}
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="rounded-xl glass-card p-6 transition-transform duration-300 hover:scale-105">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <h3 className="text-lg font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
          </div>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Intelligence</TabsTrigger>
          <TabsTrigger value="comparison">Performance</TabsTrigger>
          <TabsTrigger value="quantum">Quantum Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-slide-in space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl glass-card p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Intelligence Analysis Trend
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={intelligenceAnalysisData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="rounded-xl glass-card p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <CalendarClock className="mr-2 h-5 w-5 text-primary" />
                Upcoming Operations
              </h3>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{task.type}</span>
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs" size="sm">
                  View All Operations
                </Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl glass-card p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
              Threat Assessment by Category
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={threatAssessmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="high" stackId="a" fill="#ef4444" />
                  <Bar dataKey="medium" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="low" stackId="a" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="animate-slide-in space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl glass-card p-6">
              <h3 className="text-lg font-medium mb-4">Security Clearance Metrics</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={securityClearanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#10b981" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="rounded-xl glass-card p-6">
              <h3 className="text-lg font-medium mb-4">Inter-agency Collaboration</h3>
              <div className="h-72 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="mb-2">Elite Access Required</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/subscription')}
                  >
                    Request Elite Access
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl glass-card p-6">
            <h3 className="text-lg font-medium mb-4">Global Threat Monitoring</h3>
            <div className="text-center p-8 text-muted-foreground">
              <Globe className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="mb-2">Advanced global monitoring available with Elite access</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/subscription')}
              >
                Request Elite Access
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Performance Comparison Tab */}
        <TabsContent value="comparison" className="animate-slide-in space-y-6">
          <div className="rounded-xl glass-card p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Gauge className="mr-2 h-5 w-5 text-primary" />
              Quantum vs. Traditional Performance
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="quantum" fill="rgba(99, 102, 241, 0.3)" stroke="#6366f1" />
                  <Line type="monotone" dataKey="traditional" stroke="#94a3b8" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <AtomIcon className="h-4 w-4 mr-1" />
                Performance Insights
              </h4>
              <p className="text-sm text-blue-700">
                Quantum processing shows an average of <span className="font-bold">29%</span> higher performance
                compared to traditional methods across all intelligence operations. The greatest improvement was seen in complex pattern recognition,
                where quantum methods achieved <span className="font-bold">97%</span> accuracy versus <span className="font-bold">51%</span> with traditional methods.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisonData.map((item, index) => (
              <div key={index} className="rounded-xl glass-card p-6">
                <h3 className="font-medium mb-3">{item.name}</h3>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary">{item.quantum}%</span>
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    +{item.quantum - item.traditional}%
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                      Quantum
                    </span>
                    <span>{item.quantum}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-400 mr-2"></div>
                      Traditional
                    </span>
                    <span>{item.traditional}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="quantum" className="animate-slide-in">
          <div className="rounded-xl glass-card p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <AtomIcon className="mr-2 h-5 w-5 text-primary" />
              Quantum-Powered Government Solutions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quantumFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-5 rounded-lg border ${
                    feature.available 
                      ? 'bg-card' 
                      : 'bg-muted/30 opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {feature.description}
                      </p>
                      {feature.available ? (
                        <Button size="sm" className="h-8">Access Feature</Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8"
                          onClick={() => navigate('/subscription')}
                        >
                          Request Access
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {!quantumFeatures[0].available && (
              <div className="mt-6 text-center">
                <Button 
                  onClick={() => navigate('/subscription')}
                  className="transition-transform duration-300 hover:scale-105"
                >
                  Request Elite Access
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuantumDashboard;
