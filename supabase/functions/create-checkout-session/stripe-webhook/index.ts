import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@11.1.0'
import { createSupabaseAdminClient } from '../_shared/supabaseClient.ts'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  if (!signature || !webhookSecret) {
    return new Response('Webhook secret or signature not provided', { status: 400 })
  }

  let event: Stripe.Event
  try {
    const body = await req.text()
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider()
    )
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Save to database
    try {
      const supabaseAdmin = createSupabaseAdminClient()
      const { error } = await supabaseAdmin.from('donations').insert({
        amount: session.amount_total,
        currency: session.currency,
        donor_email: session.customer_details?.email,
        status: 'successful',
        payment_provider: 'stripe',
        provider_ref: session.id,
      })
      if (error) throw error
    } catch (dbError) {
      console.error('DB Error:', dbError.message)
      return new Response(`Database Error: ${dbError.message}`, { status: 500 })
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
})