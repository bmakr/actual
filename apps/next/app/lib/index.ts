'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2 days from now')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function signup({ email }: { email: string; }) {
  // Create a user && send a verification email
  const res = await fetch('https://api.actualed.com/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      val: email
    })
  })

  const response = await res.json()
  if (response.error) {
    return response
  }

  return response
}

export async function login({ val }: { val: string }) {
  console.log('login()', { val })
  let response
  try {
    const res = await fetch('https://api.actualed.com/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ val })
    })
    response = await res.json()
  } catch (e) {
    return { error: e }
  }

  console.log('login()', { response })

  if (response.error) {
    return response
  }

  return response
}

export async function verify({ val, id }: { val: string, id: string; }) {
  const res = await fetch(`https://api.actualed.com/api/auth/verify/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      val
    })
  })

  const response = await res.json()
  console.log('verify()', { response })
  if (response.error) {
    return response
  }

  const { user } = response
  console.log({ user })

  // Create the session
  // const expires = new Date(Date.now() + (24 * 60 * 60 * 1000)); // 24 hours
  const encrypted = await encrypt({ user, id });

  // Save the session in a cookie
  cookies().set('session', encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30d
    path: "/",
  });

  return response
}

export async function getUser() {
  const user = cookies().get('user')?.value;
  console.log({ cookies })
  console.log(cookies().get('user'))
  if (!user) return null;
  return await decrypt(user);
}

export async function logout({ id }: { id: string; }) {
  // Save loggedoutat in db
  let response
  try {
    // call logout endpoint
    const res = await fetch(`https://api.actualed.com/api/auth/logout/${id}`, {
      method: 'POST',
    })
    response = await res.json()
  } catch (e) {
    console.log('logout()', { e })
    response = { error: e }
  }

  if (response.error) {
    console.log('logout()', { response })
    return response
  }

  // delete session coookie
  cookies().set('session', '', { expires: new Date(0) })

  return response
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  console.log('session from cookies', { session })
  if (!session) return null
  const decrypted = await decrypt(session)
  console.log({ decrypted })
  return decrypted
}

export async function unsubscribe({ id }: { id: string }) {
  console.log('unsubscribe()', { id })
  return
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}