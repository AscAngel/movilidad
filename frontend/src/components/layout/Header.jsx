import { Link, useLocation } from 'react-router-dom'
import { Train, Search, GitCompare, Info } from 'lucide-react'
import { clsx } from 'clsx'

export function Header() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Buscar', icon: Search },
    { path: '/comparar', label: 'Comparar', icon: GitCompare },
    { path: '/acerca-de', label: 'Acerca de', icon: Info },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-primary-muted group-hover:bg-primary/20 transition-colors">
              <Train className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">InferRoute</h1>
              <p className="text-xs text-foreground-muted">Sistema Experto de Rutas</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              const Icon = item.icon
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary-muted text-primary'
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface-glass'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-surface-glass">
            <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
