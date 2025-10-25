// Import using the paths from your import_map.json
import { serve } from 'std/http/server.ts'
import Stripe from 'stripe'
import { corsHeaders } from 'shared/cors.ts'

// Get the Stripe secret key from Deno's environment variables
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

// Add the 'Request' type to the req parameter
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // const { amount, currency = 'kes' } = await req.json()
    // For MVP, using Price IDs from your Stripe dashboard is more secure
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'mpesa'],
      line_items: [
        {
          // IMPORTANT: Replace with your actual Price ID from Stripe
          price: 'price_1PExampleGqExample... ', 
          quantity: 1,
        },
      ],
      mode: 'payment',
      // IMPORTANT: Replace with your actual deployed site URL
      success_url: `https://your-site-url.com/get-involved?success=true`,
      cancel_url: `https://your-site-url.com/get-involved?canceled=true`,
    })

    return new Response(
      JSON.stringify({ checkoutUrl: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    // Add a type guard for the error
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})