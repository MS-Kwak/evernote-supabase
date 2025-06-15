import { Button, Input } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({
  notes,
  setIsCreating,
  setActiveNoteId,
  activeNoteId,
  search,
  setSearch,
}) {
  return (
    <aside className="absolute left-0 top-0 w-1/3 h-full overflow-y-scroll p-2 border-r border-gray-200">
      <Button
        onClick={() => setIsCreating(true)}
        className="p-2 text-sm font-bold border-1 border-gray-400 rounded-lg w-full"
      >
        ➕ 새로운 노트
      </Button>

      <div className="flex mt-2 mb-4 p-2 border border-gray-400 rounded-md items-center">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="노트 검색"
          className="flex-1 text-sm border-0 outline-none"
        />
        <button className="ml-2 p-2">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <ul className="mt-2 flex flex-col gap-2">
        {notes.map((note) => (
          <li key={note.id}>
            <button
              className={`text-sm ${
                activeNoteId === note.id
                  ? 'text-emerald-700 font-semibold'
                  : 'text-gray-600'
              }`}
              onClick={() => {
                setActiveNoteId(note.id);
                setIsCreating(false);
              }}
            >
              {note.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
