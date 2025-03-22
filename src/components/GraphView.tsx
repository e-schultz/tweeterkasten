
import React, { useCallback, useEffect, useMemo } from 'react';
import { useNotes } from '@/lib/context';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

export function GraphView() {
  const { notes, tags } = useNotes();
  
  // Create nodes for each note and tag
  const initialNodes: Node[] = useMemo(() => {
    const noteNodes = notes.map((note, index) => ({
      id: note.id,
      data: { 
        label: note.content.slice(0, 30) + (note.content.length > 30 ? '...' : ''),
        type: 'note',
        note 
      },
      position: { 
        x: 100 + Math.cos(index * (2 * Math.PI / notes.length)) * 200, 
        y: 100 + Math.sin(index * (2 * Math.PI / notes.length)) * 200
      },
      style: { 
        background: 'white', 
        color: 'black',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '10px',
        fontSize: '12px',
        width: 180,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      },
    }));
    
    const tagNodes = tags.map((tag, index) => ({
      id: tag.id,
      data: { 
        label: `#${tag.name}`,
        type: 'tag',
        tag 
      },
      position: { 
        x: 400 + Math.cos(index * (2 * Math.PI / tags.length)) * 150, 
        y: 400 + Math.sin(index * (2 * Math.PI / tags.length)) * 150
      },
      style: { 
        background: 'rgba(37, 99, 235, 0.1)', 
        color: 'rgb(37, 99, 235)',
        border: '1px solid rgba(37, 99, 235, 0.2)',
        borderRadius: '16px',
        padding: '5px 10px',
        fontSize: '12px',
        fontWeight: 500,
        width: 100,
        textAlign: 'center' as const // Fix: use 'as const' to make TypeScript recognize this as a valid TextAlign value
      },
    }));
    
    return [...noteNodes, ...tagNodes];
  }, [notes, tags]);
  
  // Create edges for connections between notes and tags
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    
    // Create edges from notes to tags
    notes.forEach(note => {
      note.tags.forEach(tagId => {
        edges.push({
          id: `${note.id}-${tagId}`,
          source: note.id,
          target: tagId,
          style: { stroke: 'rgba(100, 116, 139, 0.3)', strokeWidth: 1 },
          animated: false,
          type: 'straight',
        });
      });
      
      // Create edges for note references
      note.references.forEach(ref => {
        if (ref.type === 'note') {
          edges.push({
            id: `${note.id}-${ref.targetId}`,
            source: note.id,
            target: ref.targetId,
            style: { stroke: 'rgba(100, 116, 139, 0.3)', strokeWidth: 1 },
            animated: true,
            type: 'straight',
          });
        }
      });
    });
    
    return edges;
  }, [notes]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Update nodes and edges when data changes
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [notes, tags, initialNodes, initialEdges, setNodes, setEdges]);
  
  return (
    <div className="w-full h-[70vh] rounded-lg border bg-background animate-in">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="bg-background"
      >
        <Controls />
        <Background color="#f1f5f9" gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
