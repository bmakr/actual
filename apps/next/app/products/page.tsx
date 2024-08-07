'use client'

import { ProductsScreen } from 'app/features/products/screen'
import { useEffect, useState } from 'react'
import { Spinner } from 'tamagui'

export default function Products() {
  const [id, setId] = useState('')
  const [key, setKey] = useState('')
  // Get the pricing table id and test key from ENV
  useEffect(() => {
    if (process.env) {
      setId(process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID as string)
      setKey(process.env.NEXT_PUBLIC_STRIPE_TEST_KEY as string)
    }
  }, [])

  console.log({ id, key})

  return (
    <>
      {id && key ? (
        <ProductsScreen
          tableId={id}
          stripeKey={key}
        />
      ) : (
        <Spinner />
      )}

    </>
  )
}
