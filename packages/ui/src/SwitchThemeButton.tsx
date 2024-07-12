import { useState } from 'react'
import { Button, useIsomorphicLayoutEffect, YStack, Text, XStack } from 'tamagui'
import { useThemeSetting, useRootTheme } from '@tamagui/next-theme'
import { Glasses } from '@tamagui/lucide-icons'

export const SwitchThemeButton = () => {
  const themeSetting = useThemeSetting()
  const [theme] = useRootTheme()

  const [clientTheme, setClientTheme] = useState<string | undefined>('light')

  useIsomorphicLayoutEffect(() => {
    setClientTheme(themeSetting.forcedTheme || themeSetting.current || theme)
  }, [themeSetting.current, themeSetting.resolvedTheme])

  return (
    <XStack jc='flex-end'>
      <Button
        bc='transparent'
        py='$6'
        onPress={themeSetting.toggle}
      >
        <YStack ai='center'>
          <Glasses />
          <Text fontSize={7}>
            {clientTheme}
          </Text>
        </YStack>
      </Button>
    </XStack>
  )
}
