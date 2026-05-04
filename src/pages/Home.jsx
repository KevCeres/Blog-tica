import SubtemaCard from '../components/SubtemaCard'
import { subtemas } from '../data/subtemas'

export default function Home() {
  return (
    <div className="space-y-10">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Evidencia 3 · Blog interactivo
        </p>
        <h1 className="mt-3 bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl dark:from-white dark:via-emerald-200 dark:to-white">
          Blog de Ética y Ciudadanía
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          Explora cinco subtemas del módulo con síntesis académica, citas en formato
          APA y recursos seleccionados. Usa el botón de cada tarjeta para ver el
          ejemplo de aplicación y los enlaces directos.
        </p>
      </header>

      <section aria-labelledby="lista-subtemas">
        <h2 id="lista-subtemas" className="sr-only">
          Lista de subtemas
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {subtemas.map((s) => (
            <SubtemaCard key={s.id} subtema={s} />
          ))}
        </div>
      </section>
    </div>
  )
}
