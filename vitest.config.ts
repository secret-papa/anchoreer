import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/vitest.setup.ts'],
      include: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    },
  })
);
