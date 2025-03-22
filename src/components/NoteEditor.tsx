
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNotes } from '@/lib/context';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const MAX_NOTE_LENGTH = 280;

export function NoteEditor() {
  const { addNote, tags } = useNotes();
  const [content, setContent] = useState('');
  
  const remainingChars = MAX_NOTE_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Cannot create empty note",
        description: "Please enter some content for your note.",
        variant: "destructive",
      });
      return;
    }
    
    if (isOverLimit) {
      toast({
        title: "Note too long",
        description: `Your note exceeds the maximum length of ${MAX_NOTE_LENGTH} characters.`,
        variant: "destructive",
      });
      return;
    }
    
    addNote(content);
    setContent('');
  };
  
  return (
    <Card className="bg-card border animate-in">
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Create a New Note</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Textarea
            placeholder="What's on your mind? Use #tags to categorize..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-muted-foreground">
              Available tags: {tags.map(tag => (
                <span 
                  key={tag.id} 
                  className="inline-block mr-1 cursor-pointer text-primary hover:underline"
                  onClick={() => setContent(c => `${c} #${tag.name}`)}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
            
            <div className={`text-sm ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
              {remainingChars} characters remaining
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end border-t pt-4">
          <Button 
            type="submit" 
            disabled={!content.trim() || isOverLimit}
          >
            Create Note
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
