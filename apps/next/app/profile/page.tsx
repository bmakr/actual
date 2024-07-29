'use client'

import { ProfileScreen } from 'app/features/profile/screen'
import { logout } from '../lib'
import { useCookie } from '../hooks'

export default function Profile() {
  return (
    <>
      <ProfileScreen useCookie={useCookie} logout={logout} />
    </>
  )
}
