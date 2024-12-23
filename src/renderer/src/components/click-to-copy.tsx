import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export function ClickToCopy({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={(e) => {
              e.preventDefault()
              navigator.clipboard.writeText(text)
            }}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs" side="top">
          Click to copy
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
