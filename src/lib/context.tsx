
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note, NoteTag, Reference } from './types';
import { sampleNotes, defaultTags, extractReferences } from './data';
import { toast } from '@/hooks/use-toast';

interface NotesContextType {
  notes: Note[];
  tags: NoteTag[];
  addNote: (content: string) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  addTag: (name: string) => void;
  deleteTag: (id: string) => void;
  getRelatedNotes: (noteId: string) => Note[];
  searchNotes: (query: string) => Note[];
  currentView: 'timeline' | 'graph' | 'search';
  setCurrentView: (view: 'timeline' | 'graph' | 'search') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<NoteTag[]>([]);
  const [currentView, setCurrentView] = useState<'timeline' | 'graph' | 'search'>('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize with sample data
  useEffect(() => {
    setNotes(sampleNotes);
    setTags(defaultTags);
  }, []);

  const addNote = (content: string) => {
    const references = extractReferences(content);
    const tagIds = references
      .filter(ref => ref.type === 'tag')
      .map(ref => ref.targetId);
    
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: tagIds,
      references
    };
    
    setNotes(prev => [newNote, ...prev]);
    toast({
      title: "Note created",
      description: "Your note has been created successfully.",
    });
  };
  
  const updateNote = (id: string, content: string) => {
    const references = extractReferences(content);
    const tagIds = references
      .filter(ref => ref.type === 'tag')
      .map(ref => ref.targetId);
    
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { 
            ...note, 
            content, 
            updatedAt: new Date(), 
            tags: tagIds,
            references
          } 
        : note
    ));
    
    toast({
      title: "Note updated",
      description: "Your note has been updated successfully.",
    });
  };
  
  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been deleted.",
      variant: "destructive",
    });
  };
  
  const addTag = (name: string) => {
    const newTag: NoteTag = {
      id: `tag-${Date.now()}`,
      name
    };
    
    setTags(prev => [...prev, newTag]);
    toast({
      title: "Tag created",
      description: `Tag "#${name}" has been created.`,
    });
  };
  
  const deleteTag = (id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
    
    // Remove tag from notes
    setNotes(prev => prev.map(note => ({
      ...note,
      tags: note.tags.filter(tagId => tagId !== id),
      references: note.references.filter(ref => !(ref.type === 'tag' && ref.targetId === id))
    })));
    
    toast({
      title: "Tag deleted",
      description: "Tag has been deleted from all notes.",
      variant: "destructive",
    });
  };
  
  const getRelatedNotes = (noteId: string): Note[] => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return [];
    
    // Get all notes that reference this note
    const referencingNotes = notes.filter(n => 
      n.id !== noteId && n.references.some(ref => ref.targetId === noteId)
    );
    
    // Get all notes that this note references
    const referencedNoteIds = note.references
      .filter(ref => ref.type === 'note')
      .map(ref => ref.targetId);
    
    const referencedNotes = notes.filter(n => 
      n.id !== noteId && referencedNoteIds.includes(n.id)
    );
    
    // Get all notes that share tags with this note
    const sharedTagNotes = notes.filter(n => 
      n.id !== noteId && n.tags.some(tag => note.tags.includes(tag))
    );
    
    // Combine all related notes and remove duplicates
    const relatedNoteIds = new Set([
      ...referencingNotes.map(n => n.id),
      ...referencedNotes.map(n => n.id),
      ...sharedTagNotes.map(n => n.id)
    ]);
    
    return notes.filter(n => relatedNoteIds.has(n.id));
  };
  
  const searchNotes = (query: string): Note[] => {
    if (!query.trim()) return notes;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    return notes.filter(note => {
      // Search in content
      if (note.content.toLowerCase().includes(normalizedQuery)) return true;
      
      // Search in tags
      const noteTags = note.tags
        .map(tagId => tags.find(tag => tag.id === tagId)?.name || '')
        .map(name => name.toLowerCase());
      
      if (noteTags.some(tag => tag.includes(normalizedQuery))) return true;
      
      return false;
    });
  };
  
  return (
    <NotesContext.Provider value={{
      notes,
      tags,
      addNote,
      updateNote,
      deleteNote,
      addTag,
      deleteTag,
      getRelatedNotes,
      searchNotes,
      currentView,
      setCurrentView,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
