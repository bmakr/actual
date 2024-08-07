declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export function ProductsScreen({
  tableId, stripeKey
}: {
  tableId: string;
  stripeKey: string;
}) {

  return (
    <>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table
        pricing-table-id={tableId}
        publishable-key={stripeKey}
      />
    </>
  )
}