import {
  H1, Text, YStack, Input, Button, XStack, Anchor,
  View
} from '@my/ui'
import { Header } from '../header/Header'
import { Footer } from '../footer/Footer'
import { useState } from 'react';

type Route = '/auth/login' | '/auth/signup' | '/auth/verify'
type Handler = ({
  val,
}: {
  val: string;
}) => void;
export type AuthConfig = {
  title: 'Log In' | 'Sign Up' | 'Check Your Email';
  description: string;
  placeholder: 'email' | 'Enter code';
  buttonText: 'Send' | 'Sign Up' | 'Verify';
  afterText: string;
  linkText?: 'SIGN UP' | 'I ALREADY HAVE AN ACCOUNT' | 'RESEND SECURITY CODE';
  href?: '/auth/login' | '/auth/signup';
  resend?: () => void;
  handler: Handler;
  setStatus?: React.Dispatch<React.SetStateAction<'sending' | '' | 'error' | 'success'>>;
  setVal: React.Dispatch<React.SetStateAction<string>>;
  val: string;
  status: 'sending' | '' | 'error' | 'success';
  error: string;
}

export function Auth({ authConfig }: { authConfig: AuthConfig }) {
  const { 
    title, description, buttonText, linkText, href, resend, handler, val, setVal, status, error
  } = authConfig

  console.log(status)

  return (
    <>
      <Header />
      <YStack f={1} jc="center" ai="center" gap="$8" p="$4" bg="$background" w={400} mx='auto'>
        <YStack gap='$2' ac='flex-start' w='100%'>
          <H1>{title}</H1>
          <Text>{description}</Text>
        </YStack>
        {status === 'error' && <p style={{ color: 'red' }}>{error}</p>}
        <XStack gap="$2" w='100%'>
          <Input placeholder='email' onChangeText={(text) => setVal(text)} />
          <Button onPress={() => handler({ val })}>{buttonText}</Button>
        </XStack>
        <XStack w='100%'>
          <Text fos='$3' col='$gray9'>
            You'll receive a security code by email
          </Text>
        </XStack>

        {linkText && href ? (
          <Anchor href={href} textDecorationLine='none'>
            <Text col='$gray7'>{linkText}</Text>
          </Anchor>
        ) : (
          <View onPress={resend} cursor='pointer'>
            <Text col='$gray7'>RESEND SECURITY CODE</Text>
          </View>
        )}

        <Footer />
      </YStack>
    </>
  )
}