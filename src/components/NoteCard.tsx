
import React, { useState } from 'react';
import { Note, NoteTag } from '@/lib/types';
import { formatContent } from '@/lib/data';
import { useNotes } from '@/lib/context';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash, Edit, Link, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
  showActions?: boolean;
}

export function NoteCard({ note, showActions = true }: NoteCardProps) {
  const { tags, deleteNote, updateNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [showRelated, setShowRelated] = useState(false);
  
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };
  
  const handleSave = () => {
    updateNote(note.id, editContent);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditContent(note.content);
    setIsEditing(false);
  };
  
  const noteTags = note.tags
    .map(tagId => tags.find(tag => tag.id === tagId))
    .filter(tag => tag !== undefined) as NoteTag[];
  
  return (
    <Card className="note-card">
      <CardContent className="pt-6">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full min-h-[120px] p-2 border rounded-md"
              autoFocus
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSave}>Save</Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div>
            <div 
              className="prose prose-sm max-w-none" 
              dangerouslySetInnerHTML={{ __html: formatContent(note.content) }}
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatDate(note.createdAt)}</span>
        </div>
        
        {showActions && (
          <div className="flex space-x-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Link className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Connected Notes</DialogTitle>
                </DialogHeader>
                <RelatedNotes noteId={note.id} />
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive"
              onClick={() => deleteNote(note.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function RelatedNotes({ noteId }: { noteId: string }) {
  const { getRelatedNotes } = useNotes();
  const relatedNotes = getRelatedNotes(noteId);
  
  if (relatedNotes.length === 0) {
    return <div className="py-4 text-center text-muted-foreground">No related notes found</div>;
  }
  
  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto py-2">
      {relatedNotes.map(note => (
        <NoteCard key={note.id} note={note} showActions={false} />
      ))}
    </div>
  );
}
