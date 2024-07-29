import { Button, Paragraph, Spinner, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'solito/navigation'

export function ProfileScreen({ useCookie, logout }: { useCookie: any; logout: any }) {
  const router = useRouter()
  const cookie = useCookie()
  const [user, setUser] = useState<any>(null)
  const [status, setStatus] = useState<'loaded' | 'logout' | '' | 'error' | 'success'>('')
  const [error, setError] = useState('')
  const [sessionId, setSessionId] = useState('')

  function handler() {
    setStatus('logout')
  }

  // set status to loaded
  useEffect(() => {
    setStatus('loaded')
  }, [])

  // fetch session data on load
  useEffect(() => {
    if (status !== 'loaded') return
    if (cookie) {
      const { user, id } = cookie
      setUser(user)
      setSessionId(id)
    }

    // setTimeout(() => {
    //   async function get() {
    //     const session = await getSession()
    //     if (!session) {
    //       setError('No session found')
    //       return
    //     }
    //     console.log({ session })
    //     const { user, id } = session
    //     console.log({ id })
    //     console.log({ user })
    //     setUser(user)
    //   }
    //   get()
    // }, 1000)
  }, [status])

  // logout
  useEffect(() => {
    if (status !== 'logout') return // skip on re-render unless logout
    async function removeCookie() {
      const response = await logout({ id: user.id })
      console.log({ response })
      if (response.error) {
        setStatus('error')
        setError(response.error)
        return
      }
      router.push('/?toast=loggedOut')
    }

    removeCookie()
  }, [status])


  return (
    <YStack f={1} jc="center" ai="center" gap="$4" bg="$background">
      {error && <Paragraph ta="center" fow="700" col="$red10">{error}</Paragraph>}
      {sessionId && (
        <>
          <Paragraph ta="center" fow="700" col="$blue10">{`Session ID: ${sessionId}`}</Paragraph>
          <Button icon={ChevronLeft} onPress={handler}>
            Logout
          </Button>
        </>
      )}
      {!sessionId && (
        <Spinner />
      )}
    </YStack>
  )
}
