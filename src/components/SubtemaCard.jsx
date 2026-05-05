import { Link } from 'react-router-dom'

export default function SubtemaCard({ subtema }) {
  const { id, titulo, imagen, descripcion } = subtema

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/40 transition-shadow duration-300 hover:shadow-xl dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-black/30">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={imagen}
          alt={titulo}
          className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 text-left">
        <h2 className="text-lg font-bold leading-snug text-slate-900 dark:text-slate-50">
          {titulo}
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {descripcion}
        </p>

        <Link
          to={`/subtema/${id}`}
          className="mt-auto inline-flex w-full items-center justify-center rounded-xl border-2 border-emerald-600 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-emerald-500 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
        >
          Ir al tema completo
        </Link>
      </div>
    </article>
  )
}
