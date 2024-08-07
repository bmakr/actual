import { H1, Text, YStack } from '@my/ui'
import { Header, SubscribeButton } from '../../shared'

export function ProductsScreen() {

  return (
    <>
      <Header />
      <YStack mt={100} jc='center' ai='center' ac='center' h='$15'>
        <H1>Choose a Plan</H1>
        <Text>Know More Better</Text>
      </YStack>
      <SubscribeButton />
    </>
  )
}