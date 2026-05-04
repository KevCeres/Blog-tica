import { useId, useState } from 'react'

/**
 * Tarjeta de subtema con imagen, badge, contenido académico y panel expandible.
 */
export default function SubtemaCard({ subtema }) {
  const [abierto, setAbierto] = useState(false)
  const panelId = useId()

  const { titulo, categoria, imagen, descripcion, cita, recursos, ejemplo } =
    subtema

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/40 transition-shadow duration-300 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-black/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={imagen}
          alt={titulo}
          className="h-full w-full object-cover hover:scale-105 transition-all duration-500"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute left-3 top-3 inline-flex max-w-[85%] items-center rounded-full bg-emerald-600/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md backdrop-blur-sm dark:bg-emerald-500/95">
          {categoria}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 text-left">
        <h2 className="text-lg font-bold leading-snug text-slate-900 dark:text-slate-50">
          {titulo}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {descripcion}
        </p>
        <blockquote className="border-l-4 border-emerald-500/70 pl-3 text-xs italic leading-relaxed text-slate-500 dark:border-emerald-400/70 dark:text-slate-400">
          {cita}
        </blockquote>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls={panelId}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          {abierto ? 'Ocultar recursos y ejemplo' : 'Ver recursos y ejemplo'}
          <span
            className={`inline-block transition-transform duration-300 ${abierto ? 'rotate-180' : ''}`}
            aria-hidden
          >
            ▼
          </span>
        </button>

        <div
          id={panelId}
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-4 border-t border-slate-200 pt-4 dark:border-slate-700">
              <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-50/80 p-4 dark:border-emerald-400/40 dark:bg-emerald-950/40">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                  Ejemplo de aplicación
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  {ejemplo}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Recursos
                </p>
                <ul className="flex flex-col gap-2">
                  {recursos.map((r, i) => (
                    <li key={`${r.enlace}-${i}`}>
                      <a
                        href={r.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-medium text-slate-800 transition hover:border-emerald-400 hover:bg-white hover:text-emerald-800 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:border-emerald-500 dark:hover:bg-slate-800"
                      >
                        <span className="line-clamp-2">{r.texto}</span>
                        <span className="shrink-0 rounded-md bg-emerald-600/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                          {r.tipo}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
