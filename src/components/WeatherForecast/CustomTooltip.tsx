import { TooltipProps } from 'recharts'
import { TransformedDataItem } from './types'

export const CustomTooltip = (props: TooltipProps<any, any>) => {
  const payload = props.payload?.[0]?.payload as TransformedDataItem

  if (!payload) {
    return null
  }

  return (
    <div className="rounded-sm bg-gray-700 p-2 text-right">
      <p>{payload.dayLabel}</p>
      <p>{payload.hourLabel}</p>
      <p>
        {/* @ts-expect-error */}
        {props.payload?.[0].name}: {props.formatter(props.payload?.[0].value)}
      </p>
    </div>
  )
}
