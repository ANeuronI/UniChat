import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
const isignored = createRouteMatcher(['/api/webhooks/clerk']);

export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)&&isignored(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// // Define public and ignored route matchers
// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
// const isIgnoredRoute = createRouteMatcher(['/api/webhooks/clerk']);

// export default clerkMiddleware((auth, request) => {
//   if (isIgnoredRoute(request)) {
//     return; // Ignore this route
//   }
//   if (!isPublicRoute(request)) {
//     auth().protect(); // Protect non-public routes
//   }
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };


// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// }; 

// import { authMiddleware } from "@clerk/nextjs/server";

// export default authMiddleware({

//   publicRoutes : ['/','/api/webhooks/clerk'],
//   ignoredRoutes : ['/api/webhooks/clerk']

// })

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// }; 