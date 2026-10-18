import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  X,
  AlertCircle,
} from 'lucide-react'

type BadHabit = {
  id: number
  name: string
  description: string
  streak: number
  status: 'unconfirmed' | 'avoided' | 'occurred'
}

function BadHabits() {
  const [habits, setHabits] = useState<BadHabit[]>([])
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
      setHabits((current) =>
        current.map((habit) =>
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
      setHabits((current) => [
        ...current,
        {
          id: Date.now(),
          name: name.trim(),
          description: description.trim(),
          streak: 0,
          status: 'unconfirmed',
        },
      ])
    }

    resetForm()
  }

  function handleEdit(habit: BadHabit) {
    setEditingId(habit.id)
    setName(habit.name)
    setDescription(habit.description)
    setShowForm(true)
  }

  function handleDelete(id: number) {
    if (!window.confirm('Are you sure you want to delete this habit?')) return

    setHabits((current) => current.filter((habit) => habit.id !== id))
  }

  function updateStatus(id: number, status: 'avoided' | 'occurred') {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== id) return habit

        const streak =
          status === 'avoided'
            ? habit.status === 'avoided'
              ? habit.streak
              : habit.streak + 1
            : 0

        return { ...habit, status, streak }
      }),
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-5 md:p-9">
      <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-[#52664B]">
            BUILD HEALTHIER PATTERNS
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Break Bad Habits
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#737B70]">
            Understand your patterns, one day at a time.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center gap-2 rounded-xl bg-[#52664B] px-4 py-3 text-sm font-medium text-white hover:bg-[#41533B]"
        >
          <Plus size={18} />
          Add habit
        </button>
      </section>

      {showForm && (
        <section className="mb-6 rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {editingId !== null ? 'Edit habit' : 'Add a habit to break'}
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
                htmlFor="bad-habit-name"
                className="mb-2 block text-sm font-medium"
              >
                Habit name
              </label>
              <input
                id="bad-habit-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Excessive screen time"
                required
                maxLength={80}
                className="w-full rounded-xl border border-[#E5E2D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#52664B]"
              />
            </div>

            <div>
              <label
                htmlFor="bad-habit-description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="bad-habit-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Why would you like to change this habit?"
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

      <section className="mb-5">
        <h3 className="text-lg font-semibold">Your habits to break</h3>
        <p className="mt-1 text-sm text-[#737B70]">
          {habits.length} {habits.length === 1 ? 'habit' : 'habits'} in total
        </p>
      </section>

      {habits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#C9D2C2] bg-[#FFFDF8] px-6 py-12 text-center">
          <CheckCircle2 size={32} className="mx-auto text-[#52664B]" />
          <h3 className="mt-4 font-semibold">Every change starts somewhere</h3>
          <p className="mt-2 text-sm text-[#737B70]">
            Add a habit you'd like to change and start tracking your progress.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <article
              key={habit.id}
              className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-4 md:p-5"
            >
              <div className="flex flex-wrap items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{habit.name}</p>
                  <p className="mt-1 text-sm text-[#737B70]">
                    {habit.description || 'No description added.'}
                  </p>
                  <p className="mt-2 text-xs text-[#737B70]">
                    🔥 {habit.streak} day streak
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
              </div>

              <div className="mt-5 rounded-xl bg-[#F7F5EF] p-4">
                <p className="mb-3 text-sm font-medium">Today's check-in</p>

                {habit.status === 'unconfirmed' && (
                  <p className="mb-3 flex items-center gap-2 text-xs text-[#737B70]">
                    <AlertCircle size={15} />
                    You haven't checked in today.
                  </p>
                )}

                {habit.status === 'avoided' && (
                  <p className="mb-3 text-xs font-medium text-[#52664B]">
                    ✓ You avoided this habit today.
                  </p>
                )}

                {habit.status === 'occurred' && (
                  <p className="mb-3 text-xs text-[#9A5148]">
                    This habit occurred today. Tomorrow is another opportunity.
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => updateStatus(habit.id, 'avoided')}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${
                      habit.status === 'avoided'
                        ? 'border-[#52664B] bg-[#DCEBDD] text-[#41533B]'
                        : 'border-[#E5E2D9] bg-white hover:bg-[#E5EBDD]'
                    }`}
                  >
                    <CheckCircle2 size={17} />
                    I avoided it
                  </button>

                  <button
                    onClick={() => updateStatus(habit.id, 'occurred')}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm ${
                      habit.status === 'occurred'
                        ? 'border-[#C98E85] bg-[#F7E8E5] text-[#9A5148]'
                        : 'border-[#E5E2D9] bg-white hover:bg-[#F7E8E5]'
                    }`}
                  >
                    <Circle size={17} />
                    It happened
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs leading-5 text-[#737B70]">
        Progress isn't about perfection. Honest check-ins help you understand your
        patterns without judging yourself.
      </p>
    </div>
  )
}

export default BadHabits