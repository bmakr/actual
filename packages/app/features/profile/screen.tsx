import { Button, Paragraph, Spinner, Text, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import { useRouter } from 'solito/navigation'

export function ProfileScreen({ 
  getSession, 
  logout 
}: { 
  getSession: any; 
  logout: any 
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [status, setStatus] = useState<'logout' | 'loading' | 'error' | 'success'>('loading')
  const [error, setError] = useState('')
  const [sessionId, setSessionId] = useState('')

  function handler() {
    setStatus('logout')
  }

  // fetch session data on load
  useEffect(() => {
    if (sessionId) return // skip after setting session id
    async function handleCookieChange() {
      const session = await getSession()
      if (session && session.id) {
        setSessionId(session.id)
        setUser(session.user)
        setStatus('success')
      } else {
        setStatus('error')
        setError('No session found')
      }
    };

    // Check for cookie changes every second
    const intervalId = setInterval(handleCookieChange, 1000);

    // Clean up the interval
    return () => clearInterval(intervalId)


  }, [sessionId])

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
      {status === 'success' && (
        <>
          <Text ta="center" fow="700" col="$blue10">{`Session ID: ${sessionId}`}</Text>
          <Button icon={ChevronLeft} onPress={handler}>
            Logout
          </Button>
        </>
      )}
      {status === 'loading' && (
        <YStack>
          <Spinner />
        </YStack>
      )}
    </YStack>
  )
}
