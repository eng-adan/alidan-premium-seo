/**
 * Type declarations for Node.js globals
 */

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NEXT_PUBLIC_SITE_URL?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
} | undefined;

