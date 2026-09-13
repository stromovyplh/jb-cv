import type { ButtonHTMLAttributes } from 'react'

export interface IBaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  label: string
  classNames?: string[]
}

export type THeroRole = {
  _key: string
  title: string
  emphasized?: boolean
}
