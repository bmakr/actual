import { Auth, AuthConfig } from '../../../shared/auth/Auth'
import { useRouter } from 'solito/navigation'

export function SignupScreen() {
  const router = useRouter()
  function handler({ val }: { val: string }) {
    console.log('Sign Up')
    router.push('/auth/verify')
  }

  const authConfig: AuthConfig = {
    title: 'Sign Up',
    placeholder: 'email',
    description: 'Next-Level Learning',
    buttonText: 'Sign Up',
    afterText: 'Free to Join. Unsubscribe anytime.',
    linkText: 'I ALREADY HAVE AN ACCOUNT',
    href: '/auth/login',
    handler
  }

  return (
    <Auth authConfig={authConfig} />
  )
}