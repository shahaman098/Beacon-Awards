declare interface D1Result<T = Record<string, unknown>> {
  success: boolean;
  results?: T[];
  meta: Record<string, unknown>;
}

declare abstract class D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName: string): Promise<T | null>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}

declare abstract class D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

declare interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

declare interface R2ObjectBody {
  body: ReadableStream | null;
  httpMetadata?: {
    contentType?: string;
  };
  size: number;
  write: number;
}

declare abstract class R2Bucket {
  put(
    key: string,
    value: ArrayBuffer | ArrayBufferView | string | ReadableStream | Blob,
    options?: {
      httpMetadata?: {
        contentType?: string;
      };
    },
  ): Promise<unknown>;
  get(key: string): Promise<R2ObjectBody | null>;
  delete(keys: string | string[]): Promise<void>;
}

declare interface CloudflareEnv {
  CMS_DB: D1Database;
  CMS_MEDIA?: R2Bucket;
  ASSETS?: Fetcher;
}
