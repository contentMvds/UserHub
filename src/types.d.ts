declare module 'express' {
  const e: any;
  export default e;
  export function Router(): any;
  export interface Request { [key: string]: any; }
  export interface Response { [key: string]: any; }
  export interface NextFunction { (...args: any[]): any; }
}
declare module 'bcryptjs';
declare module 'jsonwebtoken';
declare var process: any;
