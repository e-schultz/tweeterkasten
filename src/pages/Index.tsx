
import React from 'react';
import { TimelineView } from '@/components/TimelineView';
import { SearchView } from '@/components/SearchView';
import { GraphView } from '@/components/GraphView';
import { NoteEditor } from '@/components/NoteEditor';
import { AppSidebarWrapper } from '@/components/Sidebar';
import { NotesProvider, useNotes } from '@/lib/context';

const Dashboard = () => {
  const { currentView } = useNotes();
  
  return (
    <div className="space-y-8">
      <NoteEditor />
      
      <div>
        {currentView === 'timeline' && <TimelineView />}
        {currentView === 'search' && <SearchView />}
        {currentView === 'graph' && <GraphView />}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <NotesProvider>
      <AppSidebarWrapper>
        <Dashboard />
      </AppSidebarWrapper>
    </NotesProvider>
  );
};

export default Index;
