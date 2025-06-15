'use client';

import { useState } from 'react';

export default function EmptyNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="w-2/3 absolute top-0 bottom-0 right-0 flex flex-col items-center justify-center gap-2 p-2 font-bold">
      새로운 노트를 만들어 주세요 🤗
    </div>
  );
}
