declare module 'express' {
  const e: any;
  export default e;
  export function Router(): any;
  export interface Request { [key: string]: any; user?: { id: string; email: string }; }
  export interface Response { [key: string]: any; }
  export interface NextFunction { (...args: any[]): any; }
}
declare module 'bcryptjs';
declare module 'jsonwebtoken';
declare module 'reflect-metadata';
declare module 'typeorm';
declare module 'mongodb';
declare var process: any;
