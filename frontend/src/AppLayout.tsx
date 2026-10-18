import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  Brain,
  CheckCircle2,
  Leaf,
  MessageCircle,
  Settings,
  Sparkles,
  StickyNote,
} from 'lucide-react'

const navigation = [
  { name: 'Overview', icon: Activity, path: '/' },
  { name: 'Build Good Habits', icon: CheckCircle2, path: '/good-habits' },
  { name: 'Break Bad Habits', icon: Leaf, path: '/bad-habits' },
  { name: 'Lists & Notes', icon: StickyNote, path: '/lists-notes' },
  { name: 'AI Assistant', icon: Brain, path: '/ai-assistant' },
]

function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#292E29]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-[#E5E2D9] bg-[#E5EBDD] p-5 md:flex">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#52664B] text-xl font-bold text-white">
              h.
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">HabitMind</h1>
              <p className="text-xs text-[#737B70]">Your space to grow</p>
            </div>
          </div>

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-[#737B70]">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.path

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
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

        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[#E5E2D9] bg-[#FFFDF8] px-5 py-4 md:px-9">
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#52664B] font-bold text-white">
                h.
              </div>
              <span className="font-bold">HabitMind</span>
            </div>

            <div className="hidden md:block">
              <p className="text-sm text-[#737B70]">Your personal workspace</p>
            </div>

            <button
              onClick={() => navigate('/ai-assistant')}
              className="flex items-center gap-2 rounded-xl border border-[#E5E2D9] bg-[#FFFDF8] px-3 py-2 text-sm transition-colors hover:bg-[#E5EBDD]"
            >
              <MessageCircle size={17} className="text-[#52664B]" />
              <span>Ask AI</span>
            </button>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout