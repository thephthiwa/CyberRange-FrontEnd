declare namespace React {
  type ReactNode = any;
  type ReactElement = any;
  type FC<P = {}> = (props: P) => ReactElement | null;
  type FormEvent<T = any> = { preventDefault: () => void; target: T };
  type ChangeEvent<T = any> = FormEvent<T>;
}

declare module 'react' {
  export type ReactNode = React.ReactNode;
  export type ReactElement = React.ReactElement;
  export type FC<P = {}> = React.FC<P>;
  export type FormEvent<T = any> = React.FormEvent<T>;
  export type ChangeEvent<T = any> = React.ChangeEvent<T>;
  export function useState<T>(initial: T | (() => T)): [T, (value: T) => void];
  export function useState<T = undefined>(): [T | undefined, (value: T | undefined) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useContext<T>(context: any): T;
  export function useRef<T>(initial: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function createContext<T>(defaultValue: T): any;
  export const StrictMode: any;
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment): { render(children: React.ReactNode): void };
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

interface ImportMeta {
  env: Record<string, string>;
}
