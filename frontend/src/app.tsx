import {
  Activity,
  Brain,
  CheckCircle2,
  Circle,
  ClipboardList,
  Leaf,
  ListTodo,
  MessageCircle,
  Plus,
  Settings,
  Sparkles,
  StickyNote,
} from 'lucide-react'

const navigation = [
  { name: 'Overview', icon: Activity },
  { name: 'Build Good Habits', icon: CheckCircle2 },
  { name: 'Break Bad Habits', icon: Leaf },
  { name: 'Lists & Notes', icon: StickyNote },
  { name: 'AI Assistant', icon: Brain },
]

const habits = [
  { name: 'Gym / Movement', description: 'Take care of your body', streak: 4, done: true },
  { name: 'DSA Practice', description: 'One problem at a time', streak: 2, done: false },
  { name: 'Read for 15 minutes', description: 'Make space to learn', streak: 6, done: false },
]

function App() {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#292E29]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-[#E5E2D9] bg-[#E5EBDD] p-5 md:flex">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#52664B] text-xl font-bold text-white">
              h.
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                HabitMind
              </h1>
              <p className="text-xs text-[#737B70]">
                Your space to grow
              </p>
            </div>
          </div>

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-[#737B70]">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item, index) => {
              const Icon = item.icon
              const active = index === 0

              return (
                <button
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${
                    active
                      ? 'bg-[#52664B] font-medium text-white'
                      : 'text-[#596255] hover:bg-[#D9E2D2]'
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  {item.name}
                </button>
              )
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-[#D9E2D2] bg-[#F7F5EF] p-4">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={17} className="text-[#52664B]" />
              <span className="text-sm font-semibold">A gentle reminder</span>
            </div>

            <p className="text-xs leading-5 text-[#737B70]">
              Progress isn't about being perfect. It's about showing up again.
            </p>
          </div>

          <button className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#596255] hover:bg-[#D9E2D2]">
            <Settings size={18} />
            Settings
          </button>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[#E5E2D9] bg-[#FFFDF8] px-5 py-4 md:px-9">
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#52664B] font-bold text-white">
                h.
              </div>
              <span className="font-bold">HabitMind</span>
            </div>

            <div className="hidden md:block">
              <p className="text-sm text-[#737B70]">
                Your personal workspace
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl border border-[#E5E2D9] bg-[#FFFDF8] px-3 py-2 text-sm transition-colors hover:bg-[#E5EBDD]">
              <MessageCircle size={17} className="text-[#52664B]" />
              <span>Ask AI</span>
            </button>
          </header>

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
                <p className="text-sm text-[#737B70]">
                  Today's progress
                </p>

                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-3xl font-semibold">1 / 3</p>
                  <span className="text-sm text-[#52664B]">
                    33% completed
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E5EBDD]">
                  <div className="h-full w-1/3 rounded-full bg-[#52664B]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5">
                <p className="text-sm text-[#737B70]">
                  Your best current streak
                </p>

                <p className="mt-3 text-3xl font-semibold">
                  🔥 6 days
                </p>

                <p className="mt-2 text-sm text-[#737B70]">
                  Keep going at your own pace.
                </p>
              </div>
            </section>

            {/* Today's habits */}
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    Today's habits
                  </h3>
                  <p className="mt-1 text-sm text-[#737B70]">
                    Celebrate every small step.
                  </p>
                </div>

                <button className="flex items-center gap-1 rounded-xl bg-[#52664B] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#41533B]">
                  <Plus size={16} />
                  Add habit
                </button>
              </div>

              <div className="space-y-3">
                {habits.map((habit) => (
                  <div
                    key={habit.name}
                    className="flex items-center gap-4 rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-4"
                  >
                    <button
                      aria-label={`Mark ${habit.name} as ${
                        habit.done ? 'incomplete' : 'complete'
                      }`}
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        habit.done
                          ? 'text-[#52664B]'
                          : 'text-[#A5AD9D] hover:text-[#52664B]'
                      }`}
                    >
                      {habit.done ? (
                        <CheckCircle2 size={23} />
                      ) : (
                        <Circle size={23} />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{habit.name}</p>
                      <p className="mt-1 text-sm text-[#737B70]">
                        {habit.description}
                      </p>
                    </div>

                    <div className="hidden items-center gap-1 text-sm text-[#737B70] sm:flex">
                      <span>🔥</span>
                      <span>{habit.streak} days</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Personal space */}
            <section>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Your personal space
                </h3>
                <p className="mt-1 text-sm text-[#737B70]">
                  Keep the little things somewhere safe.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button className="rounded-2xl border border-[#E5E2D9] bg-[#FFFDF8] p-5 text-left transition-colors hover:border-[#B5C2AC]">
                  <ListTodo size={22} className="text-[#52664B]" />
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
        </main>
      </div>
    </div>
  )
}

export default App