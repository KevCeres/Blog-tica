import SubtemaCard from '../components/SubtemaCard'
import { subtemas } from '../data/subtemas'

export default function Home() {
  return (
    <div className="space-y-10">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
        </p>
        <h1 className="mt-3 bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl dark:from-white dark:via-emerald-200 dark:to-white">
          Ética y ciudadanía
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          Elegí estos cinco temas porque creo que son la base para ser un ciudadano completo: primero
          entendemos nuestros derechos y el cuidado del planeta con la Carta de la Tierra; luego
          aprendemos a participar con la agencia ciudadana e identificar lo que nos separa, como la
          exclusión; al final usamos la empatía como herramienta para unirnos y trabajar juntos por
          un bien común.
        </p>
      </header>

      <section aria-labelledby="lista-subtemas">
        <h2 id="lista-subtemas" className="sr-only">
          Temas
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
