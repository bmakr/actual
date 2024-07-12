import { Auth, AuthConfig } from '../../../shared/auth/Auth'
import { useRouter } from 'solito/navigation'

export function VerifyScreen() {
  const router = useRouter()
  function resend() {
    console.log('Resend')
  }
  function handler({ val }: { val: string }) {
    console.log('Sign Up')
    router.push('/waitlist')
  }

  const authConfig: AuthConfig = {
    title: 'Check Your Email',
    description: 'Enter the security code below',
    placeholder: 'Enter code',
    buttonText: 'Verify',
    afterText: 'We sent you a security code by email',
    linkText: 'RESEND SECURITY CODE',
    resend,
    handler
  }

  return (
    <Auth authConfig={authConfig} />
  )
}