
import React, { useState } from 'react';
import { 
  FileText, FolderOpen, Clock, Search, Filter, ChevronDown, 
  MoreHorizontal, Download, Trash2, Eye 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

// Mock data for documents
const mockDocuments = [
  { 
    id: '1', 
    name: 'Employment Agreement - John Smith', 
    type: 'Employment Contract',
    date: '2023-09-15',
    status: 'Analyzed',
    insights: 12
  },
  { 
    id: '2', 
    name: 'Service Agreement - Acme Corp', 
    type: 'Service Contract',
    date: '2023-10-02',
    status: 'Analyzed', 
    insights: 8
  },
  { 
    id: '3', 
    name: 'NDA - Project Phoenix', 
    type: 'Non-Disclosure',
    date: '2023-10-10',
    status: 'Analyzed', 
    insights: 5
  },
  { 
    id: '4', 
    name: 'Lease Agreement - Office Space', 
    type: 'Lease',
    date: '2023-11-05',
    status: 'Pending', 
    insights: 0
  },
  { 
    id: '5', 
    name: 'Consulting Agreement - Tech Solutions', 
    type: 'Consulting Contract',
    date: '2023-11-20',
    status: 'Pending', 
    insights: 0
  }
];

const DashboardComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredDocuments = mockDocuments.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDocument = (id: string) => {
    navigate(`/analysis?id=${id}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-10 animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Document Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and analyze your legal documents
          </p>
        </div>
        
        <Button 
          className="hover-scale" 
          onClick={() => navigate('/upload')}
        >
          Upload New Document
        </Button>
      </div>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: FileText, title: 'Total Documents', value: '5', color: 'bg-blue-50 text-blue-500' },
          { icon: Clock, title: 'Pending Analysis', value: '2', color: 'bg-amber-50 text-amber-500' },
          { icon: FolderOpen, title: 'Analyzed Documents', value: '3', color: 'bg-green-50 text-green-500' },
        ].map((stat, index) => (
          <div key={index} className="rounded-xl glass-card p-6 hover-scale">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <h3 className="text-lg font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-10 w-full md:w-[320px]"
            placeholder="Search documents..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>All Documents</DropdownMenuItem>
            <DropdownMenuItem>Analyzed Documents</DropdownMenuItem>
            <DropdownMenuItem>Pending Analysis</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Employment Contracts</DropdownMenuItem>
            <DropdownMenuItem>Service Agreements</DropdownMenuItem>
            <DropdownMenuItem>Non-Disclosure Agreements</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="rounded-xl glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Document Name</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Date Added</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Insights</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{doc.name}</span>
                    </td>
                    <td className="p-4 text-muted-foreground">{doc.type}</td>
                    <td className="p-4 text-muted-foreground">{new Date(doc.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'Analyzed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4">{doc.insights}</td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDocument(doc.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Analysis
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No documents found. Try adjusting your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
