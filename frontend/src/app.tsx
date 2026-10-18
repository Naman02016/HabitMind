import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  Brain,
  CheckCircle2,
  Circle,
  StickyNote,
  AlertCircle,
} from 'lucide-react'

import AppLayout from './AppLayout'
import GoodHabits, { type Habit } from './pages/GoodHabits'
import BadHabits from './pages/BadHabits'
import ListsNotes from './pages/ListsNotes'
import AIAssistant from './pages/AIAssistant'
import { getHabits } from './services/habitService'
import {
  getBadHabits,
  type BadHabit,
} from './services/badHabitService'

function Overview({
  habits,
  badHabits,
}: {
  habits: Habit[]
  badHabits: BadHabit[]
}) {
  const completedGoodHabits = habits.filter((habit) => habit.done).length

  const checkedBadHabits = badHabits.filter(
    (habit) => habit.status === 'avoided' || habit.status === 'occurred',
  ).length

  const totalHabits = habits.length + badHabits.length
  const completedHabits = completedGoodHabits + checkedBadHabits

  const progress =
    totalHabits === 0
      ? 0
      : Math.round((completedHabits / totalHabits) * 100)

  // Include both good-habit and bad-habit streaks.
  const allStreaks = [
    ...habits.map((habit) => habit.streak),
    ...badHabits.map((habit) => habit.streak),
  ]

  const bestStreak =
    allStreaks.length === 0 ? 0 : Math.max(...allStreaks)

  return (
    <div className="mx-auto max-w-6xl p-5 md:p-9">
      {/* Welcome */}
      <section className="mb-8">
        <p className="mb-2 text-sm font-medium text-[#52664B]">
          YOUR JOURNEY, YOUR PACE
        </p>

        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          A fresh start, every day.
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#737B70] md:text-base">
          Small steps still move you forward.
        </p>
      </section>

      {/* Summary cards */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5">
          <p className="text-sm text-[#737B70]">Today's progress</p>

          <div className="mt-3 flex items-end justify-between gap-3">
            <p className="text-3xl font-semibold">
              {completedHabits} / {totalHabits}
            </p>

            <span className="text-sm text-[#52664B]">
              {progress}% completed
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E5EBDD]">
            <div
              className="h-full rounded-full bg-[#52664B] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5">
          <p className="text-sm text-[#737B70]">
            Your best current streak
          </p>

          <p className="mt-3 text-3xl font-semibold">
            🔥 {bestStreak} days
          </p>

          <p className="mt-2 text-sm text-[#737B70]">
            Keep going at your own pace.
          </p>
        </div>
      </section>

      {/* Today's good habits */}
      <section className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Today's habits</h3>

          <p className="mt-1 text-sm text-[#737B70]">
            Here's what you're working towards today.
          </p>
        </div>

        {habits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#C9D2C2] bg-[#FFFDF8] p-6 text-sm text-[#737B70]">
            No good habits added yet. Start with one small step.
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center gap-4 rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-4"
              >
                <div
                  className={
                    habit.done
                      ? 'text-[#52664B]'
                      : 'text-[#A5AD9D]'
                  }
                >
                  {habit.done ? (
                    <CheckCircle2 size={23} />
                  ) : (
                    <Circle size={23} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium">{habit.name}</p>

                  <p className="mt-1 text-sm text-[#737B70]">
                    {habit.description || 'No description added.'}
                  </p>
                </div>

                <div className="hidden items-center gap-1 text-sm text-[#737B70] sm:flex">
                  <span>🔥</span>
                  <span>{habit.streak} days</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Today's bad-habit check-ins */}
      <section className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Today's bad-habit check-ins
          </h3>

          <p className="mt-1 text-sm text-[#737B70]">
            Recognise your patterns without judging yourself.
          </p>
        </div>

        {badHabits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#C9D2C2] bg-[#FFFDF8] p-6 text-sm text-[#737B70]">
            No habits to break yet. You're ready whenever you are.
          </div>
        ) : (
          <div className="space-y-3">
            {badHabits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center gap-4 rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-4"
              >
                <div
                  className={
                    habit.status === 'avoided'
                      ? 'text-[#52664B]'
                      : habit.status === 'occurred'
                        ? 'text-[#9A5148]'
                        : 'text-[#A5AD9D]'
                  }
                >
                  {habit.status === 'avoided' ? (
                    <CheckCircle2 size={23} />
                  ) : habit.status === 'occurred' ? (
                    <AlertCircle size={23} />
                  ) : (
                    <Circle size={23} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium">{habit.name}</p>

                  <p className="mt-1 text-sm text-[#737B70]">
                    {habit.status === 'avoided'
                      ? 'You avoided this habit today.'
                      : habit.status === 'occurred'
                        ? 'This habit occurred today. Tomorrow is another opportunity.'
                        : "You haven’t checked in today."}
                  </p>
                </div>

                <div className="hidden items-center gap-1 text-sm text-[#737B70] sm:flex">
                  <span>🔥</span>
                  <span>{habit.streak} days</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Personal space */}
      <section>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Your personal space</h3>

          <p className="mt-1 text-sm text-[#737B70]">
            Keep the little things somewhere safe.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5 text-left transition-colors hover:border-[#B5C2AC]">
            <StickyNote size={22} className="text-[#52664B]" />

            <h4 className="mt-4 font-semibold">Lists & Notes</h4>

            <p className="mt-2 text-sm leading-5 text-[#737B70]">
              Grocery lists, watchlists, project ideas and everything else.
            </p>
          </button>

          <button className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5 text-left transition-colors hover:border-[#B5C2AC]">
            <Brain size={22} className="text-[#52664B]" />

            <h4 className="mt-4 font-semibold">AI Assistant</h4>

            <p className="mt-2 text-sm leading-5 text-[#737B70]">
              Ask about your saved information and behavioural patterns.
            </p>
          </button>
        </div>
      </section>

      <footer className="mt-10 border-t border-[#E5E2D9] pt-5 text-center text-xs text-[#737B70]">
        HabitMind · Progress over perfection
      </footer>
    </div>
  )
}

function App() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [badHabits, setBadHabits] = useState<BadHabit[]>([])

  useEffect(() => {
    async function loadHabits() {
      try {
        const data = await getHabits()

        setHabits(
          data.map((habit) => ({
            ...habit,
            description: habit.description ?? '',
          })),
        )
      } catch (error) {
        console.error('Failed to load good habits:', error)
      }
    }

    async function loadBadHabits() {
      try {
        const data = await getBadHabits()
        setBadHabits(data)
      } catch (error) {
        console.error('Failed to load bad habits:', error)
      }
    }

    loadHabits()
    loadBadHabits()
  }, [])

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <Overview
              habits={habits}
              badHabits={badHabits}
            />
          }
        />

        <Route
          path="/good-habits"
          element={
            <GoodHabits
              habits={habits}
              setHabits={setHabits}
            />
          }
        />

        <Route
          path="/bad-habits"
          element={<BadHabits />}
        />

        <Route
          path="/lists-notes"
          element={<ListsNotes />}
        />

        <Route
          path="/ai-assistant"
          element={<AIAssistant />}
        />
      </Route>
    </Routes>
  )
}

export default App
