import { H1, Text, YStack, Input, Button, XStack, Anchor, Image } from '@my/ui'
import { Footer } from 'app/shared'
import { useRouter } from 'solito/navigation'

export function WaitlistScreen() {
  const router = useRouter()
  function handler() {
    console.log('Log In')
    router.push('/auth/verify')
  }

  return (
    <>
      <XStack w={400} mx='auto' mt='$6'>
        <Anchor href='/'>
          <Image src="/logo-blue.png" alt="Actual Logo" w="$5" h="$2" />
        </Anchor>
      </XStack>
      <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background" w={400} mx='auto'>
        <YStack gap='$2' ac='flex-start' w='100%'>
          <H1>Thank you!</H1>
          <Text>Due to high demand, your email has been added temporarily to a wait list. We will send updates as we onboard new members. Thank you for your patience.</Text>
        </YStack>

        <XStack w='100%'>
          <Text fos='$3' col='$gray9'>
            You'll receive an invitation by email soon!
          </Text>
        </XStack>

        <Footer />
      </YStack>
    </>
  )
}