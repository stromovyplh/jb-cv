'use client'

import { BaseButton } from '@/apps/jb-cv-fe/app/components/BaseButton/BaseButton'
import type { IBaseButtonProps } from '@/apps/jb-cv-fe/app/types/components'
import styles from '@/apps/jb-cv-fe/app/components/BaseButton/BaseButton.module.css'

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
