'use client'

import { ProductsScreen } from 'app/features/products/screen.web'
import { getSession } from 'app/lib'
import { useEffect, useState } from 'react'
import { Spinner } from 'tamagui'

export default function Products() {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')

  //get session id from cookie
  useEffect(() => {
    async function saveSessionIdToLocalStorage() {
      const session = await getSession()
      localStorage.setItem('sessionId', session.id)
      setStatus('success')
    }
    saveSessionIdToLocalStorage()
  }, [])

  return (
    <>
      {status === 'success' ? (
        <ProductsScreen />
      ) : <Spinner />}
    </>
  )
}
