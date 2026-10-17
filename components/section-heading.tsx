import { ChevronRight } from 'lucide-react'

export function SectionHeading({
  id,
  title,
  linkLabel = 'Tümünü Gör',
  children,
}: {
  id: string
  title: string
  linkLabel?: string
  children?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 id={id} className="text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="flex items-center gap-2">
        {children}
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          {linkLabel}
          <ChevronRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
