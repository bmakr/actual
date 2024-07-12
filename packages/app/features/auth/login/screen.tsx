import { Auth, AuthConfig } from '../../../shared/auth/Auth'
import { useRouter } from 'solito/navigation'

export function LoginScreen() {
  const router = useRouter()
  function handler({ val }: { val: string }) {
    console.log({ val })
    router.push('/auth/verify')
  }

  const authConfig: AuthConfig = {
    title: 'Log In',
    placeholder: 'email',
    description: 'Enter your email to receive a security code',
    buttonText: 'Send',
    afterText: 'You\'ll receive a security code by email',
    linkText: 'SIGN UP',
    href: '/auth/signup',
    handler
  }

  return (
    <Auth authConfig={authConfig} />
  )
}