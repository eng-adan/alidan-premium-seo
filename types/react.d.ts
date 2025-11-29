/**
 * Type declarations for React (peer dependency)
 * These are stubs to allow compilation when React types aren't installed
 */

declare module 'react' {
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  
  export type ReactNode = any;
  export type FC<P = {}> = (props: P) => ReactElement | null;
  
  export interface ReactElement {
    type: any;
    props: any;
    key: any;
  }
  
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends ReactElement {}
  }
  
  export default any;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): any;
  export function jsxs(type: any, props: any, key?: any): any;
  export const Fragment: any;
}

