import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Circle,
  CheckCircle2,
  ListTodo,
  StickyNote,
} from 'lucide-react'

type ListItem = {
  id: number
  text: string
  completed: boolean
}

type CustomList = {
  id: number
  title: string
  items: ListItem[]
}

type Note = {
  id: number
  title: string
  content: string
  updatedAt: string
}

function ListsNotes() {
  const [activeTab, setActiveTab] = useState<'lists' | 'notes'>('lists')

  const [lists, setLists] = useState<CustomList[]>([])
  const [notes, setNotes] = useState<Note[]>([])

  const [showListForm, setShowListForm] = useState(false)
  const [listTitle, setListTitle] = useState('')
  const [editingListId, setEditingListId] = useState<number | null>(null)

  const [showItemForm, setShowItemForm] = useState<number | null>(null)
  const [itemText, setItemText] = useState('')

  const [showNoteForm, setShowNoteForm] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')

  function saveList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!listTitle.trim()) return

    if (editingListId !== null) {
      setLists((current) =>
        current.map((list) =>
          list.id === editingListId
            ? { ...list, title: listTitle.trim() }
            : list,
        ),
      )
    } else {
      setLists((current) => [
        ...current,
        { id: Date.now(), title: listTitle.trim(), items: [] },
      ])
    }

    setListTitle('')
    setEditingListId(null)
    setShowListForm(false)
  }

  function editList(list: CustomList) {
    setListTitle(list.title)
    setEditingListId(list.id)
    setShowListForm(true)
  }

  function deleteList(id: number) {
    if (!window.confirm('Delete this list and all its items?')) return
    setLists((current) => current.filter((list) => list.id !== id))
  }

  function addItem(event: React.FormEvent<HTMLFormElement>, listId: number) {
    event.preventDefault()
    if (!itemText.trim()) return

    setLists((current) =>
      current.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                {
                  id: Date.now(),
                  text: itemText.trim(),
                  completed: false,
                },
              ],
            }
          : list,
      ),
    )

    setItemText('')
    setShowItemForm(null)
  }

  function toggleItem(listId: number, itemId: number) {
    setLists((current) =>
      current.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item,
              ),
            }
          : list,
      ),
    )
  }

  function deleteItem(listId: number, itemId: number) {
    setLists((current) =>
      current.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
            }
          : list,
      ),
    )
  }

  function saveNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!noteTitle.trim() || !noteContent.trim()) return

    const updatedAt = new Date().toLocaleDateString()

    if (editingNoteId !== null) {
      setNotes((current) =>
        current.map((note) =>
          note.id === editingNoteId
            ? {
                ...note,
                title: noteTitle.trim(),
                content: noteContent.trim(),
                updatedAt,
              }
            : note,
        ),
      )
    } else {
      setNotes((current) => [
        ...current,
        {
          id: Date.now(),
          title: noteTitle.trim(),
          content: noteContent.trim(),
          updatedAt,
        },
      ])
    }

    resetNoteForm()
  }

  function resetNoteForm() {
    setNoteTitle('')
    setNoteContent('')
    setEditingNoteId(null)
    setShowNoteForm(false)
  }

  function editNote(note: Note) {
    setNoteTitle(note.title)
    setNoteContent(note.content)
    setEditingNoteId(note.id)
    setShowNoteForm(true)
  }

  function deleteNote(id: number) {
    if (!window.confirm('Are you sure you want to delete this note?')) return
    setNotes((current) => current.filter((note) => note.id !== id))
  }

  return (
    <div className="mx-auto max-w-6xl p-5 md:p-9">
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-[#52664B]">
          YOUR PERSONAL SPACE
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Lists & Notes
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#737B70]">
          Keep your tasks, ideas, and thoughts in one calm space.
        </p>
      </section>

      <div className="mb-7 flex gap-2 border-b border-[#E5E2D9]">
        <button
          onClick={() => setActiveTab('lists')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium ${
            activeTab === 'lists'
              ? 'border-[#52664B] text-[#52664B]'
              : 'border-transparent text-[#737B70] hover:text-[#292E29]'
          }`}
        >
          <ListTodo size={18} />
          My Lists ({lists.length})
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium ${
            activeTab === 'notes'
              ? 'border-[#52664B] text-[#52664B]'
              : 'border-transparent text-[#737B70] hover:text-[#292E29]'
          }`}
        >
          <StickyNote size={18} />
          My Notes ({notes.length})
        </button>
      </div>

      {activeTab === 'lists' && (
        <>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Your lists</h3>
              <p className="mt-1 text-sm text-[#737B70]">
                Organise anything, your way.
              </p>
            </div>
            <button
              onClick={() => {
                setListTitle('')
                setEditingListId(null)
                setShowListForm(true)
              }}
              className="flex items-center gap-2 rounded-xl bg-[#52664B] px-4 py-3 text-sm font-medium text-white hover:bg-[#41533B]"
            >
              <Plus size={18} />
              New list
            </button>
          </div>

          {showListForm && (
            <form
              onSubmit={saveList}
              className="mb-5 flex flex-wrap gap-3 rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-4"
            >
              <input
                value={listTitle}
                onChange={(event) => setListTitle(event.target.value)}
                placeholder="List name, e.g. Games to play"
                required
                maxLength={80}
                className="min-w-0 flex-1 rounded-xl border border-[#E5E2D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#52664B]"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#52664B] px-4 py-3 text-sm text-white"
              >
                {editingListId !== null ? 'Save' : 'Create list'}
              </button>
              <button
                type="button"
                onClick={() => setShowListForm(false)}
                aria-label="Cancel list form"
                className="rounded-xl border border-[#E5E2D9] px-3 py-3"
              >
                <X size={18} />
              </button>
            </form>
          )}

          {lists.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#C9D2C2] bg-[#FFFDF8] px-6 py-12 text-center">
              <ListTodo size={32} className="mx-auto text-[#52664B]" />
              <h3 className="mt-4 font-semibold">Make room for your ideas</h3>
              <p className="mt-2 text-sm text-[#737B70]">
                Create a list for tasks, shopping, games, movies, or anything
                else.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {lists.map((list) => {
                const completed = list.items.filter(
                  (item) => item.completed,
                ).length

                return (
                  <article
                    key={list.id}
                    className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold">{list.title}</h4>
                        <p className="mt-1 text-xs text-[#737B70]">
                          {completed} of {list.items.length} completed
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => editList(list)}
                          aria-label={`Rename ${list.title}`}
                          className="rounded-lg p-2 text-[#52664B] hover:bg-[#E5EBDD]"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteList(list.id)}
                          aria-label={`Delete ${list.title}`}
                          className="rounded-lg p-2 text-[#9A5148] hover:bg-[#F7E8E5]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {list.items.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {list.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 rounded-lg px-1 py-1"
                          >
                            <button
                              onClick={() => toggleItem(list.id, item.id)}
                              aria-label={`Mark ${item.text} as ${item.completed ? 'incomplete' : 'complete'}`}
                              className="shrink-0 text-[#52664B]"
                            >
                              {item.completed ? (
                                <CheckCircle2 size={18} />
                              ) : (
                                <Circle size={18} />
                              )}
                            </button>
                            <span
                              className={`min-w-0 flex-1 break-words text-sm ${
                                item.completed
                                  ? 'text-[#737B70] line-through'
                                  : ''
                              }`}
                            >
                              {item.text}
                            </span>
                            <button
                              onClick={() => deleteItem(list.id, item.id)}
                              aria-label={`Remove ${item.text}`}
                              className="shrink-0 rounded-md p-1 text-[#9A5148] hover:bg-[#F7E8E5]"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {showItemForm === list.id ? (
                      <form
                        onSubmit={(event) => addItem(event, list.id)}
                        className="mt-4 flex gap-2"
                      >
                        <input
                          autoFocus
                          value={itemText}
                          onChange={(event) => setItemText(event.target.value)}
                          placeholder="Add an item..."
                          required
                          maxLength={150}
                          className="min-w-0 flex-1 rounded-lg border border-[#E5E2D9] bg-white px-3 py-2 text-sm outline-none focus:border-[#52664B]"
                        />
                        <button
                          type="submit"
                          aria-label="Save item"
                          className="rounded-lg bg-[#52664B] p-2 text-white"
                        >
                          <Check size={17} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowItemForm(null)
                            setItemText('')
                          }}
                          aria-label="Cancel adding item"
                          className="rounded-lg border border-[#E5E2D9] p-2"
                        >
                          <X size={17} />
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => {
                          setItemText('')
                          setShowItemForm(list.id)
                        }}
                        className="mt-4 flex items-center gap-2 text-sm font-medium text-[#52664B] hover:text-[#41533B]"
                      >
                        <Plus size={16} />
                        Add item
                      </button>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </>
      )}

      {activeTab === 'notes' && (
        <>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">Your notes</h3>
              <p className="mt-1 text-sm text-[#737B70]">
                Save thoughts before they slip away.
              </p>
            </div>
            <button
              onClick={() => {
                resetNoteForm()
                setShowNoteForm(true)
              }}
              className="flex items-center gap-2 rounded-xl bg-[#52664B] px-4 py-3 text-sm font-medium text-white hover:bg-[#41533B]"
            >
              <Plus size={18} />
              New note
            </button>
          </div>

          {showNoteForm && (
            <form
              onSubmit={saveNote}
              className="mb-5 space-y-4 rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5"
            >
              <input
                value={noteTitle}
                onChange={(event) => setNoteTitle(event.target.value)}
                placeholder="Note title"
                required
                maxLength={100}
                className="w-full rounded-xl border border-[#E5E2D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#52664B]"
              />
              <textarea
                value={noteContent}
                onChange={(event) => setNoteContent(event.target.value)}
                placeholder="Write your thoughts here..."
                rows={6}
                required
                maxLength={10000}
                className="w-full resize-y rounded-xl border border-[#E5E2D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#52664B]"
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#52664B] px-5 py-3 text-sm font-medium text-white"
                >
                  {editingNoteId !== null ? 'Save changes' : 'Save note'}
                </button>
                <button
                  type="button"
                  onClick={resetNoteForm}
                  className="rounded-xl border border-[#E5E2D9] px-5 py-3 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {notes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#C9D2C2] bg-[#FFFDF8] px-6 py-12 text-center">
              <StickyNote size={32} className="mx-auto text-[#52664B]" />
              <h3 className="mt-4 font-semibold">A space for your thoughts</h3>
              <p className="mt-2 text-sm text-[#737B70]">
                Save project ideas, drafts, reminders, and anything worth
                remembering.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {notes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="break-words font-semibold">
                        {note.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#737B70]">
                        Updated {note.updatedAt}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        onClick={() => editNote(note)}
                        aria-label={`Edit ${note.title}`}
                        className="rounded-lg p-2 text-[#52664B] hover:bg-[#E5EBDD]"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        aria-label={`Delete ${note.title}`}
                        className="rounded-lg p-2 text-[#9A5148] hover:bg-[#F7E8E5]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-[#596255]">
                    {note.content}
                  </p>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      <p className="mt-8 text-xs leading-5 text-[#737B70]">
        Keep things simple. Your lists organise your actions; your notes give
        your ideas room to grow.
      </p>
    </div>
  )
}

export default ListsNotes