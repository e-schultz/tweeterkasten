
import React from 'react';
import { useNotes } from '@/lib/context';
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
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Clock, Hash, Search, Graph, Github, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function AppSidebar() {
  const { currentView, setCurrentView, tags, addTag } = useNotes();
  const [newTagName, setNewTagName] = React.useState('');
  const { toast } = useToast();
  
  const handleAddTag = () => {
    if (newTagName.trim()) {
      addTag(newTagName.trim());
      setNewTagName('');
    } else {
      toast({
        title: "Tag name required",
        description: "Please enter a name for your tag.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="text-xl font-medium flex items-center gap-2 py-6">
        <span className="bg-primary/10 text-primary p-1 rounded">
          <Hash className="h-5 w-5" />
        </span>
        Notum
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Views</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setCurrentView('timeline')}
                  className={currentView === 'timeline' ? 'bg-accent text-accent-foreground' : ''}
                >
                  <Clock className="h-4 w-4" />
                  <span>Timeline</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setCurrentView('graph')}
                  className={currentView === 'graph' ? 'bg-accent text-accent-foreground' : ''}
                >
                  <Graph className="h-4 w-4" />
                  <span>Graph View</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setCurrentView('search')}
                  className={currentView === 'search' ? 'bg-accent text-accent-foreground' : ''}
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex justify-between items-center w-full">
              <span>Tags</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create a New Tag</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter tag name..."
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddTag}>Create Tag</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tags.map(tag => (
                <SidebarMenuItem key={tag.id}>
                  <SidebarMenuButton asChild>
                    <div className="flex items-center text-sm">
                      <span className="text-primary">#{tag.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="py-4">
        <div className="px-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Github className="h-3 w-3" />
            <span>Notum - Twitter-style Zettelkasten</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="container py-6">
            <SidebarTrigger className="mb-6 md:hidden" />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
