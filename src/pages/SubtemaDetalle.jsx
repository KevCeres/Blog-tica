import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getSubtemaPorId } from '../data/subtemas'

function ListaReferencias({ items }) {
  if (!items?.length) return null
  return (
    <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      {items.map((item, i) => (
        <li key={i}>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 underline decoration-emerald-500/50 underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              {item.texto}
            </a>
          ) : (
            <span>{item.texto}</span>
          )}
        </li>
      ))}
    </ol>
  )
}

function MultimediaLista({ items }) {
  if (!items?.length) return null
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {items.map((m, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm dark:border-slate-600 dark:bg-slate-800/60"
        >
          <span className="shrink-0 rounded-md bg-emerald-600/15 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-200">
            {m.tipo}
          </span>
          {m.url ? (
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 underline decoration-emerald-500/50 underline-offset-2 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              {m.titulo}
            </a>
          ) : (
            <span className="text-slate-800 dark:text-slate-200">{m.titulo}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function SubtemaDetalle() {
  const { id } = useParams()
  const subtema = getSubtemaPorId(id)

  useEffect(() => {
    if (!subtema) return
    const prev = document.title
    document.title = `${subtema.titulo} · Ética y ciudadanía`
    return () => {
      document.title = prev
    }
  }, [subtema])

  if (!subtema) {
    return <Navigate to="/" replace />
  }

  const { titulo, imagen, descripcion, cita, ejemplo, detalle } = subtema

  const d = detalle ?? {}

  return (
    <article className="pb-12">
      <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 sm:aspect-[2.4/1]">
        <img
          src={imagen}
          alt={titulo}
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <h1 className="max-w-4xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {titulo}
          </h1>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-10">
        {!d.introduccion?.length ? (
          <section aria-labelledby="descripcion-subtema">
            <h2
              id="descripcion-subtema"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Contenido del tema
            </h2>
            <p className="mt-3 text-justify text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {descripcion}
            </p>
          </section>
        ) : null}

        {d.introduccion?.length ? (
          <section aria-labelledby="intro-detalle">
            <h2
              id="intro-detalle"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Desarrollo del tema
            </h2>
            <div className="mt-4 space-y-4 text-justify text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {d.introduccion.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        {d.actividadesLudicas?.length ? (
          <section className="space-y-6" aria-labelledby="actividades">
            <h2
              id="actividades"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Actividades lúdicas
            </h2>
            {d.actividadesLudicas.map((act, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-amber-200/90 bg-amber-50/90 p-5 dark:border-amber-900/50 dark:bg-amber-950/35 sm:p-6"
              >
                <h3 className="text-sm font-bold uppercase tracking-wide text-amber-900 dark:text-amber-200">
                  {act.titulo ?? 'Actividad lúdica'}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-800 dark:text-slate-200">
                  {act.texto}
                </p>
                {act.ejemplo ? (
                  <p className="mt-3 border-l-4 border-amber-500/60 pl-4 text-sm italic leading-relaxed text-slate-700 dark:text-slate-300">
                    <strong className="not-italic text-slate-900 dark:text-white">
                      Ejemplo:{' '}
                    </strong>
                    {act.ejemplo}
                  </p>
                ) : null}
              </div>
            ))}
          </section>
        ) : null}

        {d.diagramaCarta ? (
          <section aria-labelledby="diagrama-carta">
            <h2
              id="diagrama-carta"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Ejes de la Carta de la Tierra (esquema)
            </h2>
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="w-full max-w-md rounded-2xl border-2 border-indigo-900/30 bg-indigo-950/90 px-6 py-5 text-center text-sm font-semibold text-white dark:bg-indigo-950/80">
                {d.diagramaCarta.centro}
              </div>
              <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
                {d.diagramaCarta.petalos.map((pet, i) => (
                  <div
                    key={i}
                    className={[
                      'rounded-xl border-2 px-4 py-4 text-center text-sm font-semibold leading-snug',
                      pet.color === 'amber' &&
                        'border-amber-400/80 bg-amber-100 text-amber-950 dark:bg-amber-950/50 dark:text-amber-100',
                      pet.color === 'rose' &&
                        'border-rose-400/80 bg-rose-100 text-rose-950 dark:bg-rose-950/50 dark:text-rose-100',
                      pet.color === 'sky' &&
                        'border-sky-400/80 bg-sky-100 text-sky-950 dark:bg-sky-950/50 dark:text-sky-100',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {pet.titulo}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {d.filosofos?.length ? (
          <section aria-labelledby="filosofos-titulo">
            <h2
              id="filosofos-titulo"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Perspectivas sobre participación ciudadana
            </h2>
            <div className="mt-6 space-y-6">
              {d.filosofos.map((f) => (
                <div
                  key={f.nombre}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
                >
                  <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">
                    {f.nombre}
                  </h3>
                  <p className="mt-2 text-justify leading-relaxed text-slate-700 dark:text-slate-300">
                    {f.texto}
                  </p>
                  {f.cierre ? (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {f.cierre}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {d.reflexionAutor ? (
          <section
            className="rounded-xl border border-slate-200 bg-slate-50/90 p-5 dark:border-slate-700 dark:bg-slate-900/50 sm:p-6"
            aria-labelledby="reflexion-investigacion"
          >
            <h2
              id="reflexion-investigacion"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Reflexión
            </h2>
            <p className="mt-3 text-justify leading-relaxed text-slate-700 dark:text-slate-300">
              {d.reflexionAutor}
            </p>
          </section>
        ) : null}

        {d.exclusionPorAmbito?.length ? (
          <section aria-labelledby="exclusion-ambito">
            <h2
              id="exclusion-ambito"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Formas de exclusión social (por ámbito)
            </h2>
            <ul className="mt-6 space-y-5">
              {d.exclusionPorAmbito.map((ex) => (
                <li
                  key={ex.titulo}
                  className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {ex.titulo}
                  </h3>
                  <p className="mt-2 text-justify text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {ex.definicion}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">
                      Ejemplo:{' '}
                    </strong>
                    {ex.ejemplo}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {d.exclusionCuatroFormas?.length ? (
          <section aria-labelledby="exclusion-cuatro">
            <h2
              id="exclusion-cuatro"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Las cuatro formas principales de exclusión
            </h2>
            <ul className="mt-6 space-y-5">
              {d.exclusionCuatroFormas.map((ex) => (
                <li
                  key={ex.nombre}
                  className="rounded-xl border-2 border-emerald-500/35 bg-emerald-50/50 p-5 dark:border-emerald-500/25 dark:bg-emerald-950/30"
                >
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-200">
                    {ex.nombre}
                  </h3>
                  <p className="mt-2 text-justify text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                    {ex.descripcion}
                  </p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    <strong>Ejemplo: </strong>
                    {ex.ejemplo}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {d.cajaEjemplo ? (
          <section
            className="rounded-xl border-2 border-emerald-500/45 bg-emerald-50/90 p-5 dark:border-emerald-500/35 dark:bg-emerald-950/40 sm:p-6"
            aria-labelledby="caja-ejemplo-detalle"
          >
            <h2
              id="caja-ejemplo-detalle"
              className="text-sm font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300"
            >
              {d.cajaEjemplo.titulo}
            </h2>
            <p className="mt-2 text-justify leading-relaxed text-slate-800 dark:text-slate-200">
              {d.cajaEjemplo.texto}
            </p>
          </section>
        ) : (
          <section
            className="rounded-xl border-2 border-emerald-500/45 bg-emerald-50/90 p-5 dark:border-emerald-500/35 dark:bg-emerald-950/40 sm:p-6"
            aria-labelledby="ejemplo-tarjeta-titulo"
          >
            <h2
              id="ejemplo-tarjeta-titulo"
              className="text-sm font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-300"
            >
              Ejemplo de aplicación
            </h2>
            <p className="mt-2 text-justify leading-relaxed text-slate-800 dark:text-slate-200">
              {ejemplo}
            </p>
          </section>
        )}

        {d.multimedia?.length ? (
          <section aria-labelledby="multimedia-titulo">
            <h2
              id="multimedia-titulo"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Recursos y ejemplos
            </h2>
            <MultimediaLista items={d.multimedia} />
          </section>
        ) : null}

        <section aria-labelledby="fuentes-titulo">
          <h2
            id="fuentes-titulo"
            className="text-lg font-semibold text-slate-900 dark:text-white"
          >
            Referencias bibliográficas (APA)
          </h2>
          {d.referenciasBibliograficas?.length ? (
            <ListaReferencias items={d.referenciasBibliograficas} />
          ) : (
            <blockquote className="mt-3 border-l-4 border-emerald-500/70 pl-4 text-sm italic leading-relaxed text-slate-600 dark:border-emerald-400/60 dark:text-slate-400">
              {cita}
            </blockquote>
          )}
        </section>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </article>
  )
}
