import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51PIDv1GO9b6wjgsN2GXoMsD353SOOiru1fzLBhVTIyg46HoSzsxRAk3ZQvjd7AL87aRE6LQnOHFHnKMx6SJfP9gX00AoaEwRjo')

export default function PaymentPage() {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    const response = await fetch('/payments/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const { url } = await response.json()

    const stripe = await stripePromise
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: url })
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>Paiement</h1>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Chargement...' : 'Payer'}
      </button>
    </div>
  )
}
