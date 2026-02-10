
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json();
  const username = body.username;
  const password = body.password;

  const validUsername = import.meta.env.KEYSTATIC_USERNAME;
  const validPassword = import.meta.env.KEYSTATIC_PASSWORD;
  const githubToken = import.meta.env.KEYSTATIC_GITHUB_TOKEN;

  console.log('Login Attempt:', {
    receivedUsername: username,
    expectedUsername: validUsername,
    passwordMatch: password === validPassword,
    hasGithubToken: !!githubToken,
  });

  if (
    username === validUsername &&
    password === validPassword &&
    githubToken
  ) {
    // Set the cookie that Keystatic expects
    cookies.set('keystatic-gh-access-token', githubToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false, // Needs to be accessible by client for Keystatic to read it? 
                       // Wait, `auth.ts` reads it from `document.cookie`.
                       // If httpOnly is true, `document.cookie` cannot see it.
                       // Looking at `auth.ts`: `const cookies = parse(document.cookie);`
                       // So it MUST NOT be httpOnly if the client-side code reads it.
                       // However, usually access tokens should be httpOnly.
                       // Keystatic's `auth.ts` logic for `getSyncAuth` reads it from `document.cookie`.
                       // So `httpOnly: false` is required for the current implementation of `auth.ts` to work 
                       // UNLESS we change `auth.ts` to not read it from client side? 
                       // config.storage.kind === 'github' checks cookies.
                       // Ideally we should keep it secure, but for this "custom auth" which simulates the GitHub flow, 
                       // we need to match what Keystatic expects.
                       // Let's check `auth.ts` again.
                       // `const accessToken = cookies['keystatic-gh-access-token'];`
                       // Yes, it parses document.cookie.
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
