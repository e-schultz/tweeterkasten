
import React, { useEffect } from 'react';
import { useNotes } from '@/lib/context';
import { NoteCard } from './NoteCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchView() {
  const { searchNotes, searchQuery, setSearchQuery } = useNotes();
  
  const filteredNotes = searchNotes(searchQuery);
  
  return (
    <div className="space-y-6 animate-in">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background"
        />
      </div>
      
      {searchQuery && (
        <div className="text-sm text-muted-foreground">
          Found {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''} 
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </div>
      )}
      
      {filteredNotes.length > 0 ? (
        filteredNotes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))
      ) : (
        <div className="py-12 text-center text-muted-foreground">
          {searchQuery ? 'No notes found matching your search' : 'Enter a search term to find notes'}
        </div>
      )}
    </div>
  );
}
