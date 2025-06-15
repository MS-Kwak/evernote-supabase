'use client';

import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { useState } from 'react';

export default function NewNote({
  setIsCreating,
  setActiveNoteId,
  fetchNotes,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const supabase = createBrowserSupabaseClient();

  const onClickSave = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const { data, error } = await supabase
      .from('note')
      .insert({
        title,
        content,
      })
      .select();

    if (error) {
      console.error('Error saving note:', error.message);
      throw new Error('노트 저장에 실패했습니다. 다시 시도해주세요.');
    }

    await fetchNotes(); // 생성이 완료된 후에 노트 리스트가 갱신이 되겠죠~
    setActiveNoteId(data[0].id); // 새로 생성된 노트의 ID를 활성화
    setIsCreating(false);
  };

  return (
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
          onClick={onClickSave}
          className="bg-emerald-600 text-white py-2 px-4 text-sm rounded-md hover:bg-emerald-700 transition-all duration-300 ease-in-out"
        >
          노트 저장
        </button>
      </div>
    </form>
  );
}
