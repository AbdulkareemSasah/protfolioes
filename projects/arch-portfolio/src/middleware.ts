
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    // Only protect dashboard routes
    const protectedRoutes = ["/dashboard"];
    const isProtectedRoute = protectedRoutes.some(route =>
        context.url.pathname.startsWith(route)
    );

    if (!isProtectedRoute) {
        return next();
    }

    // Check for authentication cookie
    const authToken = context.cookies.get("auth_token");

    if (!authToken || !authToken.value) {
        // Redirect to login page if no token found
        return context.redirect("/login");
    }

    return next();
});
