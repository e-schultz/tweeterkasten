
import { Note, NoteTag, Reference } from './types';

// Default tags
export const defaultTags: NoteTag[] = [
  { id: 'tag-1', name: 'idea' },
  { id: 'tag-2', name: 'question' },
  { id: 'tag-3', name: 'insight' },
  { id: 'tag-4', name: 'todo' },
  { id: 'tag-5', name: 'concept' },
];

// Sample notes for demonstration
export const sampleNotes: Note[] = [
  {
    id: 'note-1',
    content: "The concept of *progressive disclosure* applies to note-taking: reveal complexity only when needed. #idea",
    createdAt: new Date(2023, 4, 12),
    updatedAt: new Date(2023, 4, 12),
    tags: ['tag-1'],
    references: [
      { id: 'ref-1', type: 'tag', targetId: 'tag-1' }
    ]
  },
  {
    id: 'note-2',
    content: "How do different note-taking methods impact retention and comprehension? #question",
    createdAt: new Date(2023, 4, 15),
    updatedAt: new Date(2023, 4, 15),
    tags: ['tag-2'],
    references: [
      { id: 'ref-2', type: 'tag', targetId: 'tag-2' },
      { id: 'ref-3', type: 'note', targetId: 'note-1' }
    ]
  },
  {
    id: 'note-3',
    content: "Zettelkasten creates a *second brain* through meaningful connections between atomic ideas. #concept",
    createdAt: new Date(2023, 5, 3),
    updatedAt: new Date(2023, 5, 4),
    tags: ['tag-5'],
    references: [
      { id: 'ref-4', type: 'tag', targetId: 'tag-5' },
      { id: 'ref-5', type: 'note', targetId: 'note-1' }
    ]
  },
  {
    id: 'note-4',
    content: "A well-maintained Zettelkasten becomes more valuable over time as connections multiply. #insight",
    createdAt: new Date(2023, 5, 10),
    updatedAt: new Date(2023, 5, 10),
    tags: ['tag-3'],
    references: [
      { id: 'ref-6', type: 'tag', targetId: 'tag-3' },
      { id: 'ref-7', type: 'note', targetId: 'note-3' }
    ]
  },
  {
    id: 'note-5',
    content: "Create bidirectional links between related notes for better navigation. #todo",
    createdAt: new Date(2023, 5, 18),
    updatedAt: new Date(2023, 5, 18),
    tags: ['tag-4'],
    references: [
      { id: 'ref-8', type: 'tag', targetId: 'tag-4' }
    ]
  },
  {
    id: 'note-6',
    content: "Twitter as Zettelkasten: tweets as atomic notes, hashtags as categories, mentions as connections. #concept",
    createdAt: new Date(2023, 6, 2),
    updatedAt: new Date(2023, 6, 2),
    tags: ['tag-5'],
    references: [
      { id: 'ref-9', type: 'tag', targetId: 'tag-5' },
      { id: 'ref-10', type: 'note', targetId: 'note-3' }
    ]
  },
  {
    id: 'note-7',
    content: "The best ideas emerge from the collision of different concepts and disciplines. #insight",
    createdAt: new Date(2023, 6, 15),
    updatedAt: new Date(2023, 6, 15),
    tags: ['tag-3'],
    references: [
      { id: 'ref-11', type: 'tag', targetId: 'tag-3' }
    ]
  }
];

// Helper to extract references from content
export function extractReferences(content: string): Reference[] {
  const references: Reference[] = [];
  
  // Extract tags
  const tagRegex = /#(\w+)/g;
  let tagMatch;
  while ((tagMatch = tagRegex.exec(content)) !== null) {
    // Look up the tag id
    const tagName = tagMatch[1];
    const tag = defaultTags.find(t => t.name === tagName);
    
    if (tag) {
      references.push({
        id: `ref-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'tag',
        targetId: tag.id
      });
    }
  }
  
  // Extract note references (if we had a format for it)
  // For now, this is just a placeholder
  
  return references;
}

// Format content for display
export function formatContent(content: string): string {
  // Replace *text* with <em>text</em>
  content = content.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Replace #tag with styled tag
  content = content.replace(/#(\w+)/g, '<span class="text-primary font-medium">#$1</span>');
  
  return content;
}
