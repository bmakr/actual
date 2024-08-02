declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export function ProductsScreen() {
  return (
    <>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <stripe-pricing-table pricing-table-id="prctbl_1PiNWkCgzhWoiiPejP5lpFeB"
        publishable-key="pk_live_51NtBZnCgzhWoiiPeaHa1ZbXPMwWHpyACXsY8gCikKOmcCjnGI83SZfYnDUso4d9ow4tNSQtwTk9eJyFyAt3Jqo2R00SyuFSPYG">
      </stripe-pricing-table>
    </>
  )
}
