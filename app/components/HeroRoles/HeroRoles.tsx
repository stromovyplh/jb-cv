import { Fragment } from 'react'
import styles from './HeroRoles.module.css'
import type { THeroRole } from '@/app/types/components'

interface IHeroRolesProps {
  roles: Array<THeroRole>
  className?: string
}

export const HeroRoles = ({ roles, className }: IHeroRolesProps) => {
  if (!roles.length) {
    return null
  }

  const classes = [styles['hero-role'], className].filter(Boolean).join('')

  return (
    <p className={classes}>
      {roles.map((role, index) => (
        <Fragment key={role._key}>
          {role.emphasized ? <em>{role.title}</em> : role.title}
          {index < roles.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  )
}
