/** Global definitions for development **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.less' {
  const styles: any;
  export = styles;
}
declare module "*.scss" {
  const styles: { [className: string]: string };
  export = styles;
}

declare module '*.png';

declare module '*.svg';

declare module 'global' {
  global {
    interface Window {
      __PRELOADED_STATE__: any;
    }

    interface URLSearchParams {
      keys: () => IterableIterator<string>;
    }

    function parseInt(s: number, radix?: number): number;

    class ResizeObserver {
      constructor(handler);

      public observe(element: HTMLElement);

      public unobserve(element: HTMLElement);
    }
  }
}
