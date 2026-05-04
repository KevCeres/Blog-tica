import { Link, NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

function aplicarTemaOscuro(activo) {
  const raiz = document.documentElement
  if (activo) raiz.classList.add('dark')
  else raiz.classList.remove('dark')
}

export default function Layout() {
  const [modoOscuro, setModoOscuro] = useState(() => {
    if (typeof window === 'undefined') return false
    const guardado = localStorage.getItem('tema-blog-etica')
    if (guardado === 'oscuro') return true
    if (guardado === 'claro') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    aplicarTemaOscuro(modoOscuro)
    localStorage.setItem('tema-blog-etica', modoOscuro ? 'oscuro' : 'claro')
  }, [modoOscuro])

  const linkClase = ({ isActive }) =>
    [
      'rounded-lg px-3 py-2 text-sm font-medium transition',
      isActive
        ? 'bg-emerald-600 text-white dark:bg-emerald-500'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    ].join(' ')

  return (
    <div className="min-h-svh bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="text-base font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Blog de Ética y Ciudadanía
          </Link>
          <nav
            className="flex flex-wrap items-center gap-1"
            aria-label="Navegación principal"
          >
            <NavLink to="/" end className={linkClase}>
              Inicio
            </NavLink>
            <NavLink to="/conclusiones" className={linkClase}>
              Conclusiones
            </NavLink>
            <NavLink to="/reflexion" className={linkClase}>
              Reflexión
            </NavLink>
            <button
              type="button"
              onClick={() => setModoOscuro((v) => !v)}
              className="ml-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              aria-pressed={modoOscuro}
              title={modoOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {modoOscuro ? 'Modo claro' : 'Modo oscuro'}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>
          Entrega académica — Módulo 3 · Ética y ciudadanía ·{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
