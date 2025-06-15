'use client';

import EmptyNote from '@/components/empty-note';
import Header from '@/components/header';
import NewNote from '@/components/new-note';
import NoteViewer from '@/components/note-viewer';
import Sidebar from '@/components/sidebar';
import { Database } from '@/types_db';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function UI() {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<
    Database['public']['Tables']['note']['Row'][]
  >([]);
  const [search, setSearch] = useState('')

  const supabase = createBrowserSupabaseClient();

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('note').select('*').ilike('title', `%${search}%`);

    if (error) {
      console.error('Error fetching notes:', error.message);
      throw new Error('Failed to fetch notes');
    }

    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <main className="h-screen w-full flex flex-col">
      <Header />
      <div className="grow relative">
        <Sidebar
          notes={notes}
          setIsCreating={setIsCreating}
          setActiveNoteId={setActiveNoteId}
          activeNoteId={activeNoteId}
          search={search}
          setSearch={setSearch}
        />
        {/* New note */}
        {/* Note viewer (edit or view) */}
        {/* Empty note */}
        {isCreating ? (
          <NewNote
            setIsCreating={setIsCreating}
            setActiveNoteId={setActiveNoteId}
            fetchNotes={fetchNotes}
          />
        ) : activeNoteId ? (
          <NoteViewer
            setActiveNoteId={setActiveNoteId}
            fetchNotes={fetchNotes}
            note={notes.find((note) => note.id === activeNoteId)}
          />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
