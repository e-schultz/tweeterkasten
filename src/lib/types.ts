
export interface NoteTag {
  id: string;
  name: string;
  color?: string;
}

export interface Reference {
  id: string;
  type: 'tag' | 'note' | 'mention';
  targetId: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[]; // tag ids
  references: Reference[];
}
