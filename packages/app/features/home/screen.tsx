import {
  View,
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  SwitchThemeButton,
  SwitchRouterButton,
  XStack,
  YStack,
  Text,
  Image
} from '@my/ui'
import { ChevronDown, ChevronUp, X, ArrowRightCircle, } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { Footer } from 'app/shared'

export function HomeScreen({ pagesMode = false }: { pagesMode?: boolean }) {
  // pages mode is for next routing purposes
  // const linkTarget = pagesMode ? '/pages-example-user' : '/user' 
  // const linkProps = useLink({
  //   href: `${linkTarget}/nate`,
  // })
  const linkProps = useLink({
    href: `/auth/signup`,
  })

  return (
    <>
      <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background" w={400} mx='auto'>
        <XStack
          pos="absolute"
          w="100%"
          t="$6"
          gap="$6"
          jc="flex-start"
          fw="wrap"
          $sm={{ pos: 'relative', t: 0 }}
        >
          {Platform.OS === 'web' && (
            <>
              {/* <Image src="/logo.png" alt="Actual Logo" w="$6" h="$3" ai='flex-start' />
            <Bot size="$3" ai='flex-start' /> */}
              <View ml='auto'>
                <SwitchThemeButton />
              </View>
            </>
          )}
        </XStack>

        <View bg="white" w='$10' h='$5' ai='center' jc='center'>
          <Image ai='center' src="/logo-blue.png" alt="Actual Logo" w="$10" h="$5" />
        </View>

        <YStack gap="$4">
          <H1 ta="center" col="$color12">
            Welcome to Actual.
          </H1>
          <Paragraph col="$color10" ta="center">
            Actionable Knowledge in the Palm of Your Hand
          </Paragraph>
          <Separator />
          <Paragraph ta="center">
            Are you ready for next-level intelligence?
          </Paragraph>
          <Separator />
        </YStack>

        <Button {...linkProps}>SIGN UP</Button>
        <Anchor href='/auth/login' textDecorationLine='none'>
          <Text col='$gray7'>I ALREADY HAVE AN ACCOUNT</Text>
        </Anchor>
      </YStack>
      <Footer />
    </>
  )
}

