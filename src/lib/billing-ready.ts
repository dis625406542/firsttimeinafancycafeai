import "server-only";
import { enabled, generationSimulated } from "./video-access";
import { stripeConfigured } from "./stripe";
// Simulation still needs Stripe so the payment step can be exercised end to end.
export function checkoutReady() {return (enabled() || generationSimulated()) && stripeConfigured();}
