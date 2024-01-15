import { ReactNode } from 'react'

type SectionContainerProps = {
  title: string
  children: ReactNode
}

export const SectionContainer = (props: SectionContainerProps) => {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl text-slate-300 font-bold">{props.title}</h2>
      <div>{props.children}</div>
    </section>
  )
}
