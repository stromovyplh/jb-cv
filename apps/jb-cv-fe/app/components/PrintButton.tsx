'use client'

import { BaseButton } from '@/app/components/BaseButton/BaseButton'
import type { IBaseButtonProps } from '@/app/types/components'
import styles from '@/app/components/BaseButton/BaseButton.module.css'

interface IPrintButtonProps extends IBaseButtonProps {}

export const PrintButton = (props: IPrintButtonProps) => {
  const onPrintClick = () => {
    window.print()
  }

  return (
    <BaseButton {...props} onClick={onPrintClick}>
      {props.label}
    </BaseButton>
  )
}
