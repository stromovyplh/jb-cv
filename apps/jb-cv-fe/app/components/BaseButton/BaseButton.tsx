'use client'

import type { IBaseButtonProps } from '@/app/types/components'

import styles from './BaseButton.module.css'

export const BaseButton = (props: IBaseButtonProps) => {
  const classes = [styles['base-button'], props.classNames].filter(Boolean).join(' ')

  return (
    <button className={classes} {...props}>
      {props.label}
    </button>
  )
}
