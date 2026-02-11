import type { AstroIntegration } from 'astro';
import { mkdirSync, writeFileSync } from 'node:fs';

export default function keystatic(
  options?: { uiPath?: string }
): AstroIntegration {
  const uiPath = options?.uiPath || '/dashboard';
  // Ensure uiPath starts with / and has no trailing slash
  const normalizedUiPath = '/' + uiPath.replace(/^\/+|\/+$/g, '');

  return {
    name: 'keystatic',
    hooks: {
      'astro:config:setup': ({ injectRoute, updateConfig, config }) => {
        updateConfig({
          server: config.server.host ? {} : { host: '127.0.0.1' },
          vite: {
            plugins: [
              {
                name: 'keystatic',
                resolveId(id) {
                  if (id === 'virtual:keystatic-config') {
                    return this.resolve('./keystatic.config', './a');
                  }
                  if (id === 'virtual:keystatic-basepath') {
                    return '\0virtual:keystatic-basepath';
                  }
                  return null;
                },
                load(id) {
                  if (id === '\0virtual:keystatic-basepath') {
                    return `export default ${JSON.stringify(normalizedUiPath)};`;
                  }
                  return null;
                },
              },
            ],
            optimizeDeps: {
              entries: ['keystatic.config.*', '.astro/keystatic-imports.js'],
            },
          },
        });

        const dotAstroDir = new URL('./.astro/', config.root);
        mkdirSync(dotAstroDir, { recursive: true });
        writeFileSync(
          new URL('keystatic-imports.js', dotAstroDir),
          `import "@keystatic/astro/ui";
import "@keystatic/astro/api";
import "@keystatic/core/ui";
`
        );

        injectRoute({
          // @ts-ignore
          entryPoint: '@keystatic/astro/internal/keystatic-astro-page.astro',
          entrypoint: '@keystatic/astro/internal/keystatic-astro-page.astro',
          pattern: `${normalizedUiPath}/[...params]`,
          prerender: false,
        });
        injectRoute({
          // @ts-ignore
          entryPoint: '@keystatic/astro/internal/keystatic-api.js',
          entrypoint: '@keystatic/astro/internal/keystatic-api.js',
          pattern: '/api/dashboard/[...params]',
          prerender: false,
        });
      },
    },
  };
}
