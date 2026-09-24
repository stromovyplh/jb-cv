'use client'

import { BaseButton } from '@/app/components/BaseButton/BaseButton'
import type { IBaseButtonProps } from '@/app/types/components'

type TPrintButtonProps = IBaseButtonProps

export const PrintButton = (props: TPrintButtonProps) => {
  const onPrintClick = () => {
    window.print()
  }

  return (
    <BaseButton {...props} onClick={onPrintClick}>
      {props.label}
    </BaseButton>
  )
}
