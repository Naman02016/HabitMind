import { useState } from 'react'
import { Plus, Pencil, Trash2, CheckCircle2, Circle, X } from 'lucide-react'

export type Habit = {
  id: number
  name: string
  description: string
  streak: number
  done: boolean
}

type GoodHabitsProps = {
  habits: Habit[]
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>
}

function GoodHabits({ habits, setHabits }: GoodHabitsProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function resetForm() {
    setName('')
    setDescription('')
    setEditingId(null)
    setShowForm(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) return

    if (editingId !== null) {
      setHabits((currentHabits) =>
        currentHabits.map((habit) =>
          habit.id === editingId
            ? {
                ...habit,
                name: name.trim(),
                description: description.trim(),
              }
            : habit,
        ),
      )
    } else {
      const newHabit: Habit = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        streak: 0,
        done: false,
      }

      setHabits((currentHabits) => [...currentHabits, newHabit])
    }

    resetForm()
  }

  function handleEdit(habit: Habit) {
    setEditingId(habit.id)
    setName(habit.name)
    setDescription(habit.description)
    setShowForm(true)
  }

  function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this habit?',
    )

    if (!confirmed) return

    setHabits((currentHabits) =>
      currentHabits.filter((habit) => habit.id !== id),
    )
  }

  function toggleHabit(id: number) {
    setHabits((currentHabits) =>
      currentHabits.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit,
      ),
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-5 md:p-9">
      <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-[#52664B]">
            BUILD BETTER ROUTINES
          </p>

          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Build Good Habits
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#737B70]">
            Small actions, repeated consistently, make a difference.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center gap-2 rounded-xl bg-[#52664B] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#41533B]"
        >
          <Plus size={18} />
          Add habit
        </button>
      </section>

      {showForm && (
        <section className="mb-6 rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {editingId !== null ? 'Edit habit' : 'Create a new habit'}
            </h3>

            <button
              onClick={resetForm}
              aria-label="Close form"
              className="rounded-lg p-2 text-[#737B70] hover:bg-[#E5EBDD]"
            >
              <X size={19} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="habit-name"
                className="mb-2 block text-sm font-medium"
              >
                Habit name
              </label>

              <input
                id="habit-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Exercise for 30 minutes"
                required
                maxLength={80}
                className="w-full rounded-xl border border-[#E5E2D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#52664B]"
              />
            </div>

            <div>
              <label
                htmlFor="habit-description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="habit-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Why is this habit important to you?"
                rows={3}
                maxLength={250}
                className="w-full resize-y rounded-xl border border-[#E5E2D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#52664B]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#52664B] px-5 py-3 text-sm font-medium text-white hover:bg-[#41533B]"
              >
                {editingId !== null ? 'Save changes' : 'Create habit'}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-[#E5E2D9] px-5 py-3 text-sm hover:bg-[#E5EBDD]"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Your habits</h3>
          <p className="mt-1 text-sm text-[#737B70]">
            {habits.length} {habits.length === 1 ? 'habit' : 'habits'} in total
          </p>
        </div>
      </section>

      {habits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#C9D2C2] bg-[#FFFDF8] px-6 py-12 text-center">
          <CheckCircle2
            size={32}
            className="mx-auto text-[#52664B]"
          />

          <h3 className="mt-4 font-semibold">A fresh start</h3>

          <p className="mt-2 text-sm text-[#737B70]">
            You haven't created any habits yet. Start with one small action.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <article
              key={habit.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-4 md:p-5"
            >
              <button
                onClick={() => toggleHabit(habit.id)}
                aria-label={`Mark ${habit.name} as ${habit.done ? 'incomplete' : 'complete'}`}
                className={`shrink-0 ${
                  habit.done
                    ? 'text-[#52664B]'
                    : 'text-[#A5AD9D] hover:text-[#52664B]'
                }`}
              >
                {habit.done ? (
                  <CheckCircle2 size={25} />
                ) : (
                  <Circle size={25} />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p
                  className={`font-medium ${
                    habit.done ? 'text-[#737B70]' : 'text-[#292E29]'
                  }`}
                >
                  {habit.name}
                </p>

                <p className="mt-1 text-sm text-[#737B70]">
                  {habit.description || 'No description added.'}
                </p>

                <p className="mt-2 text-xs text-[#737B70]">
                  🔥 {habit.streak} day streak
                  {habit.done ? ' · Completed today' : ' · Not completed today'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(habit)}
                  aria-label={`Edit ${habit.name}`}
                  className="rounded-xl border border-[#E5E2D9] p-2.5 text-[#52664B] hover:bg-[#E5EBDD]"
                >
                  <Pencil size={17} />
                </button>

                <button
                  onClick={() => handleDelete(habit.id)}
                  aria-label={`Delete ${habit.name}`}
                  className="rounded-xl border border-[#E5E2D9] p-2.5 text-[#9A5148] hover:bg-[#F7E8E5]"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs leading-5 text-[#737B70]">
        Remember: progress isn't about perfection. It's about showing up again.
      </p>
    </div>
  )
}

export default GoodHabits