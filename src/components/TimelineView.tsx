
import React from 'react';
import { useNotes } from '@/lib/context';
import { NoteCard } from './NoteCard';

export function TimelineView() {
  const { notes } = useNotes();
  
  // Sort notes by creation date, newest first
  const sortedNotes = [...notes].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );
  
  return (
    <div className="space-y-6 animate-in">
      {sortedNotes.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
