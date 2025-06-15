'use client';

import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function NoteViewer({
  note,
  setActiveNoteId,
  fetchNotes,
}) {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const [isEditing, setIsEditing] = useState(false);

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    setTitle(note?.title);
    setContent(note?.content);
    setIsEditing(false);
  }, [note]);

  const onClickEdit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    // Here you would typically call an API to save the edited note
    // For example:
    const { data, error } = await supabase
      .from('note')
      .update({ title, content })
      .eq('id', note.id);

    if (error) {
      console.error('Error updating note:', error.message);
      alert('노트 수정에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    setIsEditing(false);
    fetchNotes(); // Refresh the notes list
  };

  const onClickDelete = async (e) => {
    e.preventDefault();
    if (!note) {
      alert('삭제할 노트를 선택해주세요.');
      return;
    }

    const { data, error } = await supabase
      .from('note')
      .delete()
      .eq('id', note.id);

    if (error) {
      console.error('Error deleting note:', error.message);
      alert('노트 삭제에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    setIsEditing(false);
    setActiveNoteId(null); // Clear the active note after deletion
    fetchNotes(); // Refresh the notes list
  };

  return (
    <div>
      {isEditing ? (
        <form className="w-2/3 absolute top-0 bottom-0 right-0 flex flex-col gap-2 p-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="노트의 제목을 입력해주세요."
            className="w-full text-sm p-2 border border-gray-300 rounded-md"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="노트의 내용을 입력해주세요."
            className="w-full text-sm p-2 border border-gray-300 rounded-md grow resize-none"
          ></textarea>
          <div className="flex justify-end">
            <button
              onClick={onClickEdit}
              className="bg-emerald-600 text-white py-2 px-4 text-sm rounded-md hover:bg-emerald-700 transition-all duration-300 ease-in-out"
            >
              저장하기
            </button>
            <button
              onClick={onClickDelete}
              className="bg-amber-700 text-white py-2 px-4 text-sm rounded-md hover:bg-amber-700 transition-all duration-300 ease-in-out ml-2"
            >
              삭제하기
            </button>
          </div>
        </form>
      ) : (
        <div className="w-2/3 absolute top-0 bottom-0 right-0 flex flex-col gap-2 p-2">
          <h1 className="w-full text-sm p-2 bg-gray-100 rounded-md">
            {title}
          </h1>
          <p className="w-full text-sm p-2 bg-gray-100 rounded-md grow resize-none">
            {content}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-cyan-600 text-white py-2 px-4 text-sm rounded-md hover:bg-cyan-700 transition-all duration-300 ease-in-out"
            >
              수정하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
