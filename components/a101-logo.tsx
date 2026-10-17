import { cn } from '@/lib/utils'

export function A101Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center select-none font-black tracking-tighter text-[#00a0d6]', className)}>
      <span className="text-3xl font-black italic tracking-tight">A<span className="text-3xl font-black not-italic tracking-normal">·101</span></span>
    </div>
  )
}
