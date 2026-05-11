import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/productos(.*)',
  '/carrito(.*)',
  '/checkout(.*)',
  '/pedidos(.*)',
  '/perfil(.*)',
  '/admin(.*)',
  '/api/carrito(.*)',
  '/api/pedidos(.*)',
  '/api/compradores(.*)',
  '/api/preferencias(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    '/((?!_next|static|.*\\..*|favicon.ico).*)',
    '/api/(.*)',
  ],
};
