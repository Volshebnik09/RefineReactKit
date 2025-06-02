export * from "react" 

declare module 'react' {
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        css?: any;
    }
}