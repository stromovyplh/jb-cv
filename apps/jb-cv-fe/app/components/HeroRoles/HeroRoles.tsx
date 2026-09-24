import { Fragment } from 'react'

import type { TProfileQueryResult } from '@/app/types/profile'

import styles from './HeroRoles.module.css'

interface IHeroRolesProps {
  roles: NonNullable<TProfileQueryResult['roles']>
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
