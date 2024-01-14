import { PropsWithChildren } from 'react'

export const TooltipContainer = (props: PropsWithChildren) => {
  return <div className="rounded-sm bg-gray-700 p-2">{props.children}</div>
}
