/// <reference types="react-native" />

declare global {
  var console: Console;
  interface Console {
    log(...data: any[]): void;
    info(...data: any[]): void;
    warn(...data: any[]): void;
    error(...data: any[]): void;
    debug(...data: any[]): void;
  }
}
