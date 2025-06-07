
/// <reference types="vite/client" />

declare global {
  interface Window {
    webengage?: {
      user: {
        login: (userId: string) => void;
        setAttribute: (key: string, value: any) => void;
      };
      track: (eventName: string, eventData?: any) => void;
    };
  }
}

export {};
