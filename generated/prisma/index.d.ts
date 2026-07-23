
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model EmployeeMyNumber
 * 
 */
export type EmployeeMyNumber = $Result.DefaultSelection<Prisma.$EmployeeMyNumberPayload>
/**
 * Model EmployeeSalary
 * 
 */
export type EmployeeSalary = $Result.DefaultSelection<Prisma.$EmployeeSalaryPayload>
/**
 * Model LeaveBalance
 * 
 */
export type LeaveBalance = $Result.DefaultSelection<Prisma.$LeaveBalancePayload>
/**
 * Model EmployeeRequest
 * 
 */
export type EmployeeRequest = $Result.DefaultSelection<Prisma.$EmployeeRequestPayload>
/**
 * Model RequestAttachment
 * 
 */
export type RequestAttachment = $Result.DefaultSelection<Prisma.$RequestAttachmentPayload>
/**
 * Model RequestHistory
 * 
 */
export type RequestHistory = $Result.DefaultSelection<Prisma.$RequestHistoryPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  HR_MANAGER: 'HR_MANAGER',
  MANAGER: 'MANAGER',
  USER: 'USER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const RequestType: {
  ONBOARDING: 'ONBOARDING',
  DEPARTMENT_CHANGE: 'DEPARTMENT_CHANGE',
  OTHER: 'OTHER'
};

export type RequestType = (typeof RequestType)[keyof typeof RequestType]


export const RequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]


export const RequestHistoryAction: {
  CREATED: 'CREATED',
  UPDATED: 'UPDATED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type RequestHistoryAction = (typeof RequestHistoryAction)[keyof typeof RequestHistoryAction]


export const EmploymentType: {
  FULL_TIME: 'FULL_TIME',
  CONTRACT: 'CONTRACT',
  PART_TIME: 'PART_TIME',
  TEMPORARY: 'TEMPORARY'
};

export type EmploymentType = (typeof EmploymentType)[keyof typeof EmploymentType]


export const EmployeeStatus: {
  ACTIVE: 'ACTIVE',
  LEAVE: 'LEAVE',
  RETIRED: 'RETIRED'
};

export type EmployeeStatus = (typeof EmployeeStatus)[keyof typeof EmployeeStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type RequestType = $Enums.RequestType

export const RequestType: typeof $Enums.RequestType

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

export type RequestHistoryAction = $Enums.RequestHistoryAction

export const RequestHistoryAction: typeof $Enums.RequestHistoryAction

export type EmploymentType = $Enums.EmploymentType

export const EmploymentType: typeof $Enums.EmploymentType

export type EmployeeStatus = $Enums.EmployeeStatus

export const EmployeeStatus: typeof $Enums.EmployeeStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeMyNumber`: Exposes CRUD operations for the **EmployeeMyNumber** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeMyNumbers
    * const employeeMyNumbers = await prisma.employeeMyNumber.findMany()
    * ```
    */
  get employeeMyNumber(): Prisma.EmployeeMyNumberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeSalary`: Exposes CRUD operations for the **EmployeeSalary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeSalaries
    * const employeeSalaries = await prisma.employeeSalary.findMany()
    * ```
    */
  get employeeSalary(): Prisma.EmployeeSalaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leaveBalance`: Exposes CRUD operations for the **LeaveBalance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveBalances
    * const leaveBalances = await prisma.leaveBalance.findMany()
    * ```
    */
  get leaveBalance(): Prisma.LeaveBalanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.employeeRequest`: Exposes CRUD operations for the **EmployeeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeRequests
    * const employeeRequests = await prisma.employeeRequest.findMany()
    * ```
    */
  get employeeRequest(): Prisma.EmployeeRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestAttachment`: Exposes CRUD operations for the **RequestAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestAttachments
    * const requestAttachments = await prisma.requestAttachment.findMany()
    * ```
    */
  get requestAttachment(): Prisma.RequestAttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestHistory`: Exposes CRUD operations for the **RequestHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestHistories
    * const requestHistories = await prisma.requestHistory.findMany()
    * ```
    */
  get requestHistory(): Prisma.RequestHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Department: 'Department',
    Employee: 'Employee',
    EmployeeMyNumber: 'EmployeeMyNumber',
    EmployeeSalary: 'EmployeeSalary',
    LeaveBalance: 'LeaveBalance',
    EmployeeRequest: 'EmployeeRequest',
    RequestAttachment: 'RequestAttachment',
    RequestHistory: 'RequestHistory',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "department" | "employee" | "employeeMyNumber" | "employeeSalary" | "leaveBalance" | "employeeRequest" | "requestAttachment" | "requestHistory" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      EmployeeMyNumber: {
        payload: Prisma.$EmployeeMyNumberPayload<ExtArgs>
        fields: Prisma.EmployeeMyNumberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeMyNumberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeMyNumberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>
          }
          findFirst: {
            args: Prisma.EmployeeMyNumberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeMyNumberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>
          }
          findMany: {
            args: Prisma.EmployeeMyNumberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>[]
          }
          create: {
            args: Prisma.EmployeeMyNumberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>
          }
          createMany: {
            args: Prisma.EmployeeMyNumberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeMyNumberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>[]
          }
          delete: {
            args: Prisma.EmployeeMyNumberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>
          }
          update: {
            args: Prisma.EmployeeMyNumberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>
          }
          deleteMany: {
            args: Prisma.EmployeeMyNumberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeMyNumberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeMyNumberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>[]
          }
          upsert: {
            args: Prisma.EmployeeMyNumberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeMyNumberPayload>
          }
          aggregate: {
            args: Prisma.EmployeeMyNumberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeMyNumber>
          }
          groupBy: {
            args: Prisma.EmployeeMyNumberGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeMyNumberGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeMyNumberCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeMyNumberCountAggregateOutputType> | number
          }
        }
      }
      EmployeeSalary: {
        payload: Prisma.$EmployeeSalaryPayload<ExtArgs>
        fields: Prisma.EmployeeSalaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeSalaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeSalaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>
          }
          findFirst: {
            args: Prisma.EmployeeSalaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeSalaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>
          }
          findMany: {
            args: Prisma.EmployeeSalaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>[]
          }
          create: {
            args: Prisma.EmployeeSalaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>
          }
          createMany: {
            args: Prisma.EmployeeSalaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeSalaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>[]
          }
          delete: {
            args: Prisma.EmployeeSalaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>
          }
          update: {
            args: Prisma.EmployeeSalaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>
          }
          deleteMany: {
            args: Prisma.EmployeeSalaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeSalaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeSalaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>[]
          }
          upsert: {
            args: Prisma.EmployeeSalaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeSalaryPayload>
          }
          aggregate: {
            args: Prisma.EmployeeSalaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeSalary>
          }
          groupBy: {
            args: Prisma.EmployeeSalaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeSalaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeSalaryCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeSalaryCountAggregateOutputType> | number
          }
        }
      }
      LeaveBalance: {
        payload: Prisma.$LeaveBalancePayload<ExtArgs>
        fields: Prisma.LeaveBalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveBalanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveBalanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          findFirst: {
            args: Prisma.LeaveBalanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveBalanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          findMany: {
            args: Prisma.LeaveBalanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>[]
          }
          create: {
            args: Prisma.LeaveBalanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          createMany: {
            args: Prisma.LeaveBalanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveBalanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>[]
          }
          delete: {
            args: Prisma.LeaveBalanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          update: {
            args: Prisma.LeaveBalanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          deleteMany: {
            args: Prisma.LeaveBalanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveBalanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaveBalanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>[]
          }
          upsert: {
            args: Prisma.LeaveBalanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          aggregate: {
            args: Prisma.LeaveBalanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveBalance>
          }
          groupBy: {
            args: Prisma.LeaveBalanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveBalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveBalanceCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveBalanceCountAggregateOutputType> | number
          }
        }
      }
      EmployeeRequest: {
        payload: Prisma.$EmployeeRequestPayload<ExtArgs>
        fields: Prisma.EmployeeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>
          }
          findFirst: {
            args: Prisma.EmployeeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>
          }
          findMany: {
            args: Prisma.EmployeeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>[]
          }
          create: {
            args: Prisma.EmployeeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>
          }
          createMany: {
            args: Prisma.EmployeeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>[]
          }
          delete: {
            args: Prisma.EmployeeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>
          }
          update: {
            args: Prisma.EmployeeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>
          }
          deleteMany: {
            args: Prisma.EmployeeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmployeeRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>[]
          }
          upsert: {
            args: Prisma.EmployeeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeeRequestPayload>
          }
          aggregate: {
            args: Prisma.EmployeeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployeeRequest>
          }
          groupBy: {
            args: Prisma.EmployeeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeRequestCountAggregateOutputType> | number
          }
        }
      }
      RequestAttachment: {
        payload: Prisma.$RequestAttachmentPayload<ExtArgs>
        fields: Prisma.RequestAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>
          }
          findFirst: {
            args: Prisma.RequestAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>
          }
          findMany: {
            args: Prisma.RequestAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>[]
          }
          create: {
            args: Prisma.RequestAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>
          }
          createMany: {
            args: Prisma.RequestAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>[]
          }
          delete: {
            args: Prisma.RequestAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>
          }
          update: {
            args: Prisma.RequestAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.RequestAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.RequestAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestAttachmentPayload>
          }
          aggregate: {
            args: Prisma.RequestAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestAttachment>
          }
          groupBy: {
            args: Prisma.RequestAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<RequestAttachmentCountAggregateOutputType> | number
          }
        }
      }
      RequestHistory: {
        payload: Prisma.$RequestHistoryPayload<ExtArgs>
        fields: Prisma.RequestHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          findFirst: {
            args: Prisma.RequestHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          findMany: {
            args: Prisma.RequestHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>[]
          }
          create: {
            args: Prisma.RequestHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          createMany: {
            args: Prisma.RequestHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>[]
          }
          delete: {
            args: Prisma.RequestHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          update: {
            args: Prisma.RequestHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          deleteMany: {
            args: Prisma.RequestHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>[]
          }
          upsert: {
            args: Prisma.RequestHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestHistoryPayload>
          }
          aggregate: {
            args: Prisma.RequestHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestHistory>
          }
          groupBy: {
            args: Prisma.RequestHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<RequestHistoryCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    department?: DepartmentOmit
    employee?: EmployeeOmit
    employeeMyNumber?: EmployeeMyNumberOmit
    employeeSalary?: EmployeeSalaryOmit
    leaveBalance?: LeaveBalanceOmit
    employeeRequest?: EmployeeRequestOmit
    requestAttachment?: RequestAttachmentOmit
    requestHistory?: RequestHistoryOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    requests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requests?: boolean | UserCountOutputTypeCountRequestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeRequestWhereInput
  }


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    employees: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | DepartmentCountOutputTypeCountEmployeesArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    requests: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requests?: boolean | EmployeeCountOutputTypeCountRequestsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeRequestWhereInput
  }


  /**
   * Count Type EmployeeRequestCountOutputType
   */

  export type EmployeeRequestCountOutputType = {
    histories: number
    attachments: number
  }

  export type EmployeeRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    histories?: boolean | EmployeeRequestCountOutputTypeCountHistoriesArgs
    attachments?: boolean | EmployeeRequestCountOutputTypeCountAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * EmployeeRequestCountOutputType without action
   */
  export type EmployeeRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequestCountOutputType
     */
    select?: EmployeeRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeRequestCountOutputType without action
   */
  export type EmployeeRequestCountOutputTypeCountHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestHistoryWhereInput
  }

  /**
   * EmployeeRequestCountOutputType without action
   */
  export type EmployeeRequestCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestAttachmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: $Enums.UserRole
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    requests?: boolean | User$requestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requests?: boolean | User$requestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      requests: Prisma.$EmployeeRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: $Enums.UserRole
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requests<T extends User$requestsArgs<ExtArgs> = {}>(args?: Subset<T, User$requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.requests
   */
  export type User$requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    where?: EmployeeRequestWhereInput
    orderBy?: EmployeeRequestOrderByWithRelationInput | EmployeeRequestOrderByWithRelationInput[]
    cursor?: EmployeeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeRequestScalarFieldEnum | EmployeeRequestScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type DepartmentMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    employees?: boolean | Department$employeesArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type DepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["department"]>
  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | Department$employeesArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      employees: Prisma.$EmployeePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {DepartmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employees<T extends Department$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Department$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Department model
   */
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'String'>
    readonly name: FieldRef<"Department", 'String'>
    readonly createdAt: FieldRef<"Department", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department updateManyAndReturn
   */
  export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to delete.
     */
    limit?: number
  }

  /**
   * Department.employees
   */
  export type Department$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    employeeNo: string | null
    lastName: string | null
    firstName: string | null
    lastNameKana: string | null
    firstNameKana: string | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    phoneNumber: string | null
    address: string | null
    email: string | null
    departmentId: string | null
    occupation: string | null
    position: string | null
    hireDate: Date | null
    employmentType: $Enums.EmploymentType | null
    commutingType: string | null
    status: $Enums.EmployeeStatus | null
    retirementDate: Date | null
    healthInsuranceNo: string | null
    employmentInsuranceNo: string | null
    photoPath: string | null
    createdAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    employeeNo: string | null
    lastName: string | null
    firstName: string | null
    lastNameKana: string | null
    firstNameKana: string | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    phoneNumber: string | null
    address: string | null
    email: string | null
    departmentId: string | null
    occupation: string | null
    position: string | null
    hireDate: Date | null
    employmentType: $Enums.EmploymentType | null
    commutingType: string | null
    status: $Enums.EmployeeStatus | null
    retirementDate: Date | null
    healthInsuranceNo: string | null
    employmentInsuranceNo: string | null
    photoPath: string | null
    createdAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    employeeNo: number
    lastName: number
    firstName: number
    lastNameKana: number
    firstNameKana: number
    gender: number
    birthDate: number
    phoneNumber: number
    address: number
    email: number
    departmentId: number
    occupation: number
    position: number
    hireDate: number
    employmentType: number
    commutingType: number
    status: number
    retirementDate: number
    healthInsuranceNo: number
    employmentInsuranceNo: number
    photoPath: number
    createdAt: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    employeeNo?: true
    lastName?: true
    firstName?: true
    lastNameKana?: true
    firstNameKana?: true
    gender?: true
    birthDate?: true
    phoneNumber?: true
    address?: true
    email?: true
    departmentId?: true
    occupation?: true
    position?: true
    hireDate?: true
    employmentType?: true
    commutingType?: true
    status?: true
    retirementDate?: true
    healthInsuranceNo?: true
    employmentInsuranceNo?: true
    photoPath?: true
    createdAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    employeeNo?: true
    lastName?: true
    firstName?: true
    lastNameKana?: true
    firstNameKana?: true
    gender?: true
    birthDate?: true
    phoneNumber?: true
    address?: true
    email?: true
    departmentId?: true
    occupation?: true
    position?: true
    hireDate?: true
    employmentType?: true
    commutingType?: true
    status?: true
    retirementDate?: true
    healthInsuranceNo?: true
    employmentInsuranceNo?: true
    photoPath?: true
    createdAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    employeeNo?: true
    lastName?: true
    firstName?: true
    lastNameKana?: true
    firstNameKana?: true
    gender?: true
    birthDate?: true
    phoneNumber?: true
    address?: true
    email?: true
    departmentId?: true
    occupation?: true
    position?: true
    hireDate?: true
    employmentType?: true
    commutingType?: true
    status?: true
    retirementDate?: true
    healthInsuranceNo?: true
    employmentInsuranceNo?: true
    photoPath?: true
    createdAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana: string | null
    firstNameKana: string | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    phoneNumber: string | null
    address: string | null
    email: string
    departmentId: string | null
    occupation: string | null
    position: string | null
    hireDate: Date | null
    employmentType: $Enums.EmploymentType | null
    commutingType: string | null
    status: $Enums.EmployeeStatus
    retirementDate: Date | null
    healthInsuranceNo: string | null
    employmentInsuranceNo: string | null
    photoPath: string | null
    createdAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeNo?: boolean
    lastName?: boolean
    firstName?: boolean
    lastNameKana?: boolean
    firstNameKana?: boolean
    gender?: boolean
    birthDate?: boolean
    phoneNumber?: boolean
    address?: boolean
    email?: boolean
    departmentId?: boolean
    occupation?: boolean
    position?: boolean
    hireDate?: boolean
    employmentType?: boolean
    commutingType?: boolean
    status?: boolean
    retirementDate?: boolean
    healthInsuranceNo?: boolean
    employmentInsuranceNo?: boolean
    photoPath?: boolean
    createdAt?: boolean
    department?: boolean | Employee$departmentArgs<ExtArgs>
    requests?: boolean | Employee$requestsArgs<ExtArgs>
    employeeMyNumber?: boolean | Employee$employeeMyNumberArgs<ExtArgs>
    employeeSalary?: boolean | Employee$employeeSalaryArgs<ExtArgs>
    leaveBalance?: boolean | Employee$leaveBalanceArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeNo?: boolean
    lastName?: boolean
    firstName?: boolean
    lastNameKana?: boolean
    firstNameKana?: boolean
    gender?: boolean
    birthDate?: boolean
    phoneNumber?: boolean
    address?: boolean
    email?: boolean
    departmentId?: boolean
    occupation?: boolean
    position?: boolean
    hireDate?: boolean
    employmentType?: boolean
    commutingType?: boolean
    status?: boolean
    retirementDate?: boolean
    healthInsuranceNo?: boolean
    employmentInsuranceNo?: boolean
    photoPath?: boolean
    createdAt?: boolean
    department?: boolean | Employee$departmentArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeNo?: boolean
    lastName?: boolean
    firstName?: boolean
    lastNameKana?: boolean
    firstNameKana?: boolean
    gender?: boolean
    birthDate?: boolean
    phoneNumber?: boolean
    address?: boolean
    email?: boolean
    departmentId?: boolean
    occupation?: boolean
    position?: boolean
    hireDate?: boolean
    employmentType?: boolean
    commutingType?: boolean
    status?: boolean
    retirementDate?: boolean
    healthInsuranceNo?: boolean
    employmentInsuranceNo?: boolean
    photoPath?: boolean
    createdAt?: boolean
    department?: boolean | Employee$departmentArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    employeeNo?: boolean
    lastName?: boolean
    firstName?: boolean
    lastNameKana?: boolean
    firstNameKana?: boolean
    gender?: boolean
    birthDate?: boolean
    phoneNumber?: boolean
    address?: boolean
    email?: boolean
    departmentId?: boolean
    occupation?: boolean
    position?: boolean
    hireDate?: boolean
    employmentType?: boolean
    commutingType?: boolean
    status?: boolean
    retirementDate?: boolean
    healthInsuranceNo?: boolean
    employmentInsuranceNo?: boolean
    photoPath?: boolean
    createdAt?: boolean
  }

  export type EmployeeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeNo" | "lastName" | "firstName" | "lastNameKana" | "firstNameKana" | "gender" | "birthDate" | "phoneNumber" | "address" | "email" | "departmentId" | "occupation" | "position" | "hireDate" | "employmentType" | "commutingType" | "status" | "retirementDate" | "healthInsuranceNo" | "employmentInsuranceNo" | "photoPath" | "createdAt", ExtArgs["result"]["employee"]>
  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Employee$departmentArgs<ExtArgs>
    requests?: boolean | Employee$requestsArgs<ExtArgs>
    employeeMyNumber?: boolean | Employee$employeeMyNumberArgs<ExtArgs>
    employeeSalary?: boolean | Employee$employeeSalaryArgs<ExtArgs>
    leaveBalance?: boolean | Employee$leaveBalanceArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Employee$departmentArgs<ExtArgs>
  }
  export type EmployeeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Employee$departmentArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs> | null
      requests: Prisma.$EmployeeRequestPayload<ExtArgs>[]
      employeeMyNumber: Prisma.$EmployeeMyNumberPayload<ExtArgs> | null
      employeeSalary: Prisma.$EmployeeSalaryPayload<ExtArgs> | null
      leaveBalance: Prisma.$LeaveBalancePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeNo: string
      lastName: string
      firstName: string
      lastNameKana: string | null
      firstNameKana: string | null
      gender: $Enums.Gender | null
      birthDate: Date | null
      phoneNumber: string | null
      address: string | null
      email: string
      departmentId: string | null
      occupation: string | null
      position: string | null
      hireDate: Date | null
      employmentType: $Enums.EmploymentType | null
      commutingType: string | null
      status: $Enums.EmployeeStatus
      retirementDate: Date | null
      healthInsuranceNo: string | null
      employmentInsuranceNo: string | null
      photoPath: string | null
      createdAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees and returns the data updated in the database.
     * @param {EmployeeUpdateManyAndReturnArgs} args - Arguments to update many Employees.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends Employee$departmentArgs<ExtArgs> = {}>(args?: Subset<T, Employee$departmentArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    requests<T extends Employee$requestsArgs<ExtArgs> = {}>(args?: Subset<T, Employee$requestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    employeeMyNumber<T extends Employee$employeeMyNumberArgs<ExtArgs> = {}>(args?: Subset<T, Employee$employeeMyNumberArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employeeSalary<T extends Employee$employeeSalaryArgs<ExtArgs> = {}>(args?: Subset<T, Employee$employeeSalaryArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    leaveBalance<T extends Employee$leaveBalanceArgs<ExtArgs> = {}>(args?: Subset<T, Employee$leaveBalanceArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly employeeNo: FieldRef<"Employee", 'String'>
    readonly lastName: FieldRef<"Employee", 'String'>
    readonly firstName: FieldRef<"Employee", 'String'>
    readonly lastNameKana: FieldRef<"Employee", 'String'>
    readonly firstNameKana: FieldRef<"Employee", 'String'>
    readonly gender: FieldRef<"Employee", 'Gender'>
    readonly birthDate: FieldRef<"Employee", 'DateTime'>
    readonly phoneNumber: FieldRef<"Employee", 'String'>
    readonly address: FieldRef<"Employee", 'String'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly departmentId: FieldRef<"Employee", 'String'>
    readonly occupation: FieldRef<"Employee", 'String'>
    readonly position: FieldRef<"Employee", 'String'>
    readonly hireDate: FieldRef<"Employee", 'DateTime'>
    readonly employmentType: FieldRef<"Employee", 'EmploymentType'>
    readonly commutingType: FieldRef<"Employee", 'String'>
    readonly status: FieldRef<"Employee", 'EmployeeStatus'>
    readonly retirementDate: FieldRef<"Employee", 'DateTime'>
    readonly healthInsuranceNo: FieldRef<"Employee", 'String'>
    readonly employmentInsuranceNo: FieldRef<"Employee", 'String'>
    readonly photoPath: FieldRef<"Employee", 'String'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
  }

  /**
   * Employee updateManyAndReturn
   */
  export type EmployeeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
    /**
     * Limit how many Employees to delete.
     */
    limit?: number
  }

  /**
   * Employee.department
   */
  export type Employee$departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
  }

  /**
   * Employee.requests
   */
  export type Employee$requestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    where?: EmployeeRequestWhereInput
    orderBy?: EmployeeRequestOrderByWithRelationInput | EmployeeRequestOrderByWithRelationInput[]
    cursor?: EmployeeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeRequestScalarFieldEnum | EmployeeRequestScalarFieldEnum[]
  }

  /**
   * Employee.employeeMyNumber
   */
  export type Employee$employeeMyNumberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    where?: EmployeeMyNumberWhereInput
  }

  /**
   * Employee.employeeSalary
   */
  export type Employee$employeeSalaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    where?: EmployeeSalaryWhereInput
  }

  /**
   * Employee.leaveBalance
   */
  export type Employee$leaveBalanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    where?: LeaveBalanceWhereInput
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeMyNumber
   */

  export type AggregateEmployeeMyNumber = {
    _count: EmployeeMyNumberCountAggregateOutputType | null
    _min: EmployeeMyNumberMinAggregateOutputType | null
    _max: EmployeeMyNumberMaxAggregateOutputType | null
  }

  export type EmployeeMyNumberMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    encryptedNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeMyNumberMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    encryptedNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeMyNumberCountAggregateOutputType = {
    id: number
    employeeId: number
    encryptedNumber: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeMyNumberMinAggregateInputType = {
    id?: true
    employeeId?: true
    encryptedNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeMyNumberMaxAggregateInputType = {
    id?: true
    employeeId?: true
    encryptedNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeMyNumberCountAggregateInputType = {
    id?: true
    employeeId?: true
    encryptedNumber?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeMyNumberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeMyNumber to aggregate.
     */
    where?: EmployeeMyNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeMyNumbers to fetch.
     */
    orderBy?: EmployeeMyNumberOrderByWithRelationInput | EmployeeMyNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeMyNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeMyNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeMyNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeMyNumbers
    **/
    _count?: true | EmployeeMyNumberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMyNumberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMyNumberMaxAggregateInputType
  }

  export type GetEmployeeMyNumberAggregateType<T extends EmployeeMyNumberAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeMyNumber]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeMyNumber[P]>
      : GetScalarType<T[P], AggregateEmployeeMyNumber[P]>
  }




  export type EmployeeMyNumberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeMyNumberWhereInput
    orderBy?: EmployeeMyNumberOrderByWithAggregationInput | EmployeeMyNumberOrderByWithAggregationInput[]
    by: EmployeeMyNumberScalarFieldEnum[] | EmployeeMyNumberScalarFieldEnum
    having?: EmployeeMyNumberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeMyNumberCountAggregateInputType | true
    _min?: EmployeeMyNumberMinAggregateInputType
    _max?: EmployeeMyNumberMaxAggregateInputType
  }

  export type EmployeeMyNumberGroupByOutputType = {
    id: string
    employeeId: string
    encryptedNumber: string
    createdAt: Date
    updatedAt: Date
    _count: EmployeeMyNumberCountAggregateOutputType | null
    _min: EmployeeMyNumberMinAggregateOutputType | null
    _max: EmployeeMyNumberMaxAggregateOutputType | null
  }

  type GetEmployeeMyNumberGroupByPayload<T extends EmployeeMyNumberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeMyNumberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeMyNumberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeMyNumberGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeMyNumberGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeMyNumberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    encryptedNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeMyNumber"]>

  export type EmployeeMyNumberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    encryptedNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeMyNumber"]>

  export type EmployeeMyNumberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    encryptedNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeMyNumber"]>

  export type EmployeeMyNumberSelectScalar = {
    id?: boolean
    employeeId?: boolean
    encryptedNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeMyNumberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "encryptedNumber" | "createdAt" | "updatedAt", ExtArgs["result"]["employeeMyNumber"]>
  export type EmployeeMyNumberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeMyNumberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeMyNumberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $EmployeeMyNumberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeMyNumber"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      encryptedNumber: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employeeMyNumber"]>
    composites: {}
  }

  type EmployeeMyNumberGetPayload<S extends boolean | null | undefined | EmployeeMyNumberDefaultArgs> = $Result.GetResult<Prisma.$EmployeeMyNumberPayload, S>

  type EmployeeMyNumberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeMyNumberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeMyNumberCountAggregateInputType | true
    }

  export interface EmployeeMyNumberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeMyNumber'], meta: { name: 'EmployeeMyNumber' } }
    /**
     * Find zero or one EmployeeMyNumber that matches the filter.
     * @param {EmployeeMyNumberFindUniqueArgs} args - Arguments to find a EmployeeMyNumber
     * @example
     * // Get one EmployeeMyNumber
     * const employeeMyNumber = await prisma.employeeMyNumber.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeMyNumberFindUniqueArgs>(args: SelectSubset<T, EmployeeMyNumberFindUniqueArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeMyNumber that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeMyNumberFindUniqueOrThrowArgs} args - Arguments to find a EmployeeMyNumber
     * @example
     * // Get one EmployeeMyNumber
     * const employeeMyNumber = await prisma.employeeMyNumber.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeMyNumberFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeMyNumberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeMyNumber that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeMyNumberFindFirstArgs} args - Arguments to find a EmployeeMyNumber
     * @example
     * // Get one EmployeeMyNumber
     * const employeeMyNumber = await prisma.employeeMyNumber.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeMyNumberFindFirstArgs>(args?: SelectSubset<T, EmployeeMyNumberFindFirstArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeMyNumber that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeMyNumberFindFirstOrThrowArgs} args - Arguments to find a EmployeeMyNumber
     * @example
     * // Get one EmployeeMyNumber
     * const employeeMyNumber = await prisma.employeeMyNumber.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeMyNumberFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeMyNumberFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeMyNumbers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeMyNumberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeMyNumbers
     * const employeeMyNumbers = await prisma.employeeMyNumber.findMany()
     * 
     * // Get first 10 EmployeeMyNumbers
     * const employeeMyNumbers = await prisma.employeeMyNumber.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeMyNumberWithIdOnly = await prisma.employeeMyNumber.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeMyNumberFindManyArgs>(args?: SelectSubset<T, EmployeeMyNumberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeMyNumber.
     * @param {EmployeeMyNumberCreateArgs} args - Arguments to create a EmployeeMyNumber.
     * @example
     * // Create one EmployeeMyNumber
     * const EmployeeMyNumber = await prisma.employeeMyNumber.create({
     *   data: {
     *     // ... data to create a EmployeeMyNumber
     *   }
     * })
     * 
     */
    create<T extends EmployeeMyNumberCreateArgs>(args: SelectSubset<T, EmployeeMyNumberCreateArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeMyNumbers.
     * @param {EmployeeMyNumberCreateManyArgs} args - Arguments to create many EmployeeMyNumbers.
     * @example
     * // Create many EmployeeMyNumbers
     * const employeeMyNumber = await prisma.employeeMyNumber.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeMyNumberCreateManyArgs>(args?: SelectSubset<T, EmployeeMyNumberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeMyNumbers and returns the data saved in the database.
     * @param {EmployeeMyNumberCreateManyAndReturnArgs} args - Arguments to create many EmployeeMyNumbers.
     * @example
     * // Create many EmployeeMyNumbers
     * const employeeMyNumber = await prisma.employeeMyNumber.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeMyNumbers and only return the `id`
     * const employeeMyNumberWithIdOnly = await prisma.employeeMyNumber.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeMyNumberCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeMyNumberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeMyNumber.
     * @param {EmployeeMyNumberDeleteArgs} args - Arguments to delete one EmployeeMyNumber.
     * @example
     * // Delete one EmployeeMyNumber
     * const EmployeeMyNumber = await prisma.employeeMyNumber.delete({
     *   where: {
     *     // ... filter to delete one EmployeeMyNumber
     *   }
     * })
     * 
     */
    delete<T extends EmployeeMyNumberDeleteArgs>(args: SelectSubset<T, EmployeeMyNumberDeleteArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeMyNumber.
     * @param {EmployeeMyNumberUpdateArgs} args - Arguments to update one EmployeeMyNumber.
     * @example
     * // Update one EmployeeMyNumber
     * const employeeMyNumber = await prisma.employeeMyNumber.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeMyNumberUpdateArgs>(args: SelectSubset<T, EmployeeMyNumberUpdateArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeMyNumbers.
     * @param {EmployeeMyNumberDeleteManyArgs} args - Arguments to filter EmployeeMyNumbers to delete.
     * @example
     * // Delete a few EmployeeMyNumbers
     * const { count } = await prisma.employeeMyNumber.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeMyNumberDeleteManyArgs>(args?: SelectSubset<T, EmployeeMyNumberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeMyNumbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeMyNumberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeMyNumbers
     * const employeeMyNumber = await prisma.employeeMyNumber.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeMyNumberUpdateManyArgs>(args: SelectSubset<T, EmployeeMyNumberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeMyNumbers and returns the data updated in the database.
     * @param {EmployeeMyNumberUpdateManyAndReturnArgs} args - Arguments to update many EmployeeMyNumbers.
     * @example
     * // Update many EmployeeMyNumbers
     * const employeeMyNumber = await prisma.employeeMyNumber.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeMyNumbers and only return the `id`
     * const employeeMyNumberWithIdOnly = await prisma.employeeMyNumber.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeMyNumberUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeMyNumberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeMyNumber.
     * @param {EmployeeMyNumberUpsertArgs} args - Arguments to update or create a EmployeeMyNumber.
     * @example
     * // Update or create a EmployeeMyNumber
     * const employeeMyNumber = await prisma.employeeMyNumber.upsert({
     *   create: {
     *     // ... data to create a EmployeeMyNumber
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeMyNumber we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeMyNumberUpsertArgs>(args: SelectSubset<T, EmployeeMyNumberUpsertArgs<ExtArgs>>): Prisma__EmployeeMyNumberClient<$Result.GetResult<Prisma.$EmployeeMyNumberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeMyNumbers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeMyNumberCountArgs} args - Arguments to filter EmployeeMyNumbers to count.
     * @example
     * // Count the number of EmployeeMyNumbers
     * const count = await prisma.employeeMyNumber.count({
     *   where: {
     *     // ... the filter for the EmployeeMyNumbers we want to count
     *   }
     * })
    **/
    count<T extends EmployeeMyNumberCountArgs>(
      args?: Subset<T, EmployeeMyNumberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeMyNumberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeMyNumber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeMyNumberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeMyNumberAggregateArgs>(args: Subset<T, EmployeeMyNumberAggregateArgs>): Prisma.PrismaPromise<GetEmployeeMyNumberAggregateType<T>>

    /**
     * Group by EmployeeMyNumber.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeMyNumberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeMyNumberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeMyNumberGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeMyNumberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeMyNumberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeMyNumberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeMyNumber model
   */
  readonly fields: EmployeeMyNumberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeMyNumber.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeMyNumberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeMyNumber model
   */
  interface EmployeeMyNumberFieldRefs {
    readonly id: FieldRef<"EmployeeMyNumber", 'String'>
    readonly employeeId: FieldRef<"EmployeeMyNumber", 'String'>
    readonly encryptedNumber: FieldRef<"EmployeeMyNumber", 'String'>
    readonly createdAt: FieldRef<"EmployeeMyNumber", 'DateTime'>
    readonly updatedAt: FieldRef<"EmployeeMyNumber", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeMyNumber findUnique
   */
  export type EmployeeMyNumberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeMyNumber to fetch.
     */
    where: EmployeeMyNumberWhereUniqueInput
  }

  /**
   * EmployeeMyNumber findUniqueOrThrow
   */
  export type EmployeeMyNumberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeMyNumber to fetch.
     */
    where: EmployeeMyNumberWhereUniqueInput
  }

  /**
   * EmployeeMyNumber findFirst
   */
  export type EmployeeMyNumberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeMyNumber to fetch.
     */
    where?: EmployeeMyNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeMyNumbers to fetch.
     */
    orderBy?: EmployeeMyNumberOrderByWithRelationInput | EmployeeMyNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeMyNumbers.
     */
    cursor?: EmployeeMyNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeMyNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeMyNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeMyNumbers.
     */
    distinct?: EmployeeMyNumberScalarFieldEnum | EmployeeMyNumberScalarFieldEnum[]
  }

  /**
   * EmployeeMyNumber findFirstOrThrow
   */
  export type EmployeeMyNumberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeMyNumber to fetch.
     */
    where?: EmployeeMyNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeMyNumbers to fetch.
     */
    orderBy?: EmployeeMyNumberOrderByWithRelationInput | EmployeeMyNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeMyNumbers.
     */
    cursor?: EmployeeMyNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeMyNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeMyNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeMyNumbers.
     */
    distinct?: EmployeeMyNumberScalarFieldEnum | EmployeeMyNumberScalarFieldEnum[]
  }

  /**
   * EmployeeMyNumber findMany
   */
  export type EmployeeMyNumberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeMyNumbers to fetch.
     */
    where?: EmployeeMyNumberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeMyNumbers to fetch.
     */
    orderBy?: EmployeeMyNumberOrderByWithRelationInput | EmployeeMyNumberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeMyNumbers.
     */
    cursor?: EmployeeMyNumberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeMyNumbers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeMyNumbers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeMyNumbers.
     */
    distinct?: EmployeeMyNumberScalarFieldEnum | EmployeeMyNumberScalarFieldEnum[]
  }

  /**
   * EmployeeMyNumber create
   */
  export type EmployeeMyNumberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeMyNumber.
     */
    data: XOR<EmployeeMyNumberCreateInput, EmployeeMyNumberUncheckedCreateInput>
  }

  /**
   * EmployeeMyNumber createMany
   */
  export type EmployeeMyNumberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeMyNumbers.
     */
    data: EmployeeMyNumberCreateManyInput | EmployeeMyNumberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeMyNumber createManyAndReturn
   */
  export type EmployeeMyNumberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeMyNumbers.
     */
    data: EmployeeMyNumberCreateManyInput | EmployeeMyNumberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeMyNumber update
   */
  export type EmployeeMyNumberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeMyNumber.
     */
    data: XOR<EmployeeMyNumberUpdateInput, EmployeeMyNumberUncheckedUpdateInput>
    /**
     * Choose, which EmployeeMyNumber to update.
     */
    where: EmployeeMyNumberWhereUniqueInput
  }

  /**
   * EmployeeMyNumber updateMany
   */
  export type EmployeeMyNumberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeMyNumbers.
     */
    data: XOR<EmployeeMyNumberUpdateManyMutationInput, EmployeeMyNumberUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeMyNumbers to update
     */
    where?: EmployeeMyNumberWhereInput
    /**
     * Limit how many EmployeeMyNumbers to update.
     */
    limit?: number
  }

  /**
   * EmployeeMyNumber updateManyAndReturn
   */
  export type EmployeeMyNumberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeMyNumbers.
     */
    data: XOR<EmployeeMyNumberUpdateManyMutationInput, EmployeeMyNumberUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeMyNumbers to update
     */
    where?: EmployeeMyNumberWhereInput
    /**
     * Limit how many EmployeeMyNumbers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeMyNumber upsert
   */
  export type EmployeeMyNumberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeMyNumber to update in case it exists.
     */
    where: EmployeeMyNumberWhereUniqueInput
    /**
     * In case the EmployeeMyNumber found by the `where` argument doesn't exist, create a new EmployeeMyNumber with this data.
     */
    create: XOR<EmployeeMyNumberCreateInput, EmployeeMyNumberUncheckedCreateInput>
    /**
     * In case the EmployeeMyNumber was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeMyNumberUpdateInput, EmployeeMyNumberUncheckedUpdateInput>
  }

  /**
   * EmployeeMyNumber delete
   */
  export type EmployeeMyNumberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
    /**
     * Filter which EmployeeMyNumber to delete.
     */
    where: EmployeeMyNumberWhereUniqueInput
  }

  /**
   * EmployeeMyNumber deleteMany
   */
  export type EmployeeMyNumberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeMyNumbers to delete
     */
    where?: EmployeeMyNumberWhereInput
    /**
     * Limit how many EmployeeMyNumbers to delete.
     */
    limit?: number
  }

  /**
   * EmployeeMyNumber without action
   */
  export type EmployeeMyNumberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeMyNumber
     */
    select?: EmployeeMyNumberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeMyNumber
     */
    omit?: EmployeeMyNumberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeMyNumberInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeSalary
   */

  export type AggregateEmployeeSalary = {
    _count: EmployeeSalaryCountAggregateOutputType | null
    _avg: EmployeeSalaryAvgAggregateOutputType | null
    _sum: EmployeeSalarySumAggregateOutputType | null
    _min: EmployeeSalaryMinAggregateOutputType | null
    _max: EmployeeSalaryMaxAggregateOutputType | null
  }

  export type EmployeeSalaryAvgAggregateOutputType = {
    baseSalary: number | null
    allowance: number | null
    bonus: number | null
  }

  export type EmployeeSalarySumAggregateOutputType = {
    baseSalary: number | null
    allowance: number | null
    bonus: number | null
  }

  export type EmployeeSalaryMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    baseSalary: number | null
    allowance: number | null
    bonus: number | null
    effectiveFrom: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeSalaryMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    baseSalary: number | null
    allowance: number | null
    bonus: number | null
    effectiveFrom: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeSalaryCountAggregateOutputType = {
    id: number
    employeeId: number
    baseSalary: number
    allowance: number
    bonus: number
    effectiveFrom: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeSalaryAvgAggregateInputType = {
    baseSalary?: true
    allowance?: true
    bonus?: true
  }

  export type EmployeeSalarySumAggregateInputType = {
    baseSalary?: true
    allowance?: true
    bonus?: true
  }

  export type EmployeeSalaryMinAggregateInputType = {
    id?: true
    employeeId?: true
    baseSalary?: true
    allowance?: true
    bonus?: true
    effectiveFrom?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeSalaryMaxAggregateInputType = {
    id?: true
    employeeId?: true
    baseSalary?: true
    allowance?: true
    bonus?: true
    effectiveFrom?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeSalaryCountAggregateInputType = {
    id?: true
    employeeId?: true
    baseSalary?: true
    allowance?: true
    bonus?: true
    effectiveFrom?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeSalaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeSalary to aggregate.
     */
    where?: EmployeeSalaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeSalaries to fetch.
     */
    orderBy?: EmployeeSalaryOrderByWithRelationInput | EmployeeSalaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeSalaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeSalaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeSalaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeSalaries
    **/
    _count?: true | EmployeeSalaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeSalaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeSalarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeSalaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeSalaryMaxAggregateInputType
  }

  export type GetEmployeeSalaryAggregateType<T extends EmployeeSalaryAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeSalary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeSalary[P]>
      : GetScalarType<T[P], AggregateEmployeeSalary[P]>
  }




  export type EmployeeSalaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeSalaryWhereInput
    orderBy?: EmployeeSalaryOrderByWithAggregationInput | EmployeeSalaryOrderByWithAggregationInput[]
    by: EmployeeSalaryScalarFieldEnum[] | EmployeeSalaryScalarFieldEnum
    having?: EmployeeSalaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeSalaryCountAggregateInputType | true
    _avg?: EmployeeSalaryAvgAggregateInputType
    _sum?: EmployeeSalarySumAggregateInputType
    _min?: EmployeeSalaryMinAggregateInputType
    _max?: EmployeeSalaryMaxAggregateInputType
  }

  export type EmployeeSalaryGroupByOutputType = {
    id: string
    employeeId: string
    baseSalary: number
    allowance: number
    bonus: number
    effectiveFrom: Date
    createdAt: Date
    updatedAt: Date
    _count: EmployeeSalaryCountAggregateOutputType | null
    _avg: EmployeeSalaryAvgAggregateOutputType | null
    _sum: EmployeeSalarySumAggregateOutputType | null
    _min: EmployeeSalaryMinAggregateOutputType | null
    _max: EmployeeSalaryMaxAggregateOutputType | null
  }

  type GetEmployeeSalaryGroupByPayload<T extends EmployeeSalaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeSalaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeSalaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeSalaryGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeSalaryGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSalarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    baseSalary?: boolean
    allowance?: boolean
    bonus?: boolean
    effectiveFrom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeSalary"]>

  export type EmployeeSalarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    baseSalary?: boolean
    allowance?: boolean
    bonus?: boolean
    effectiveFrom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeSalary"]>

  export type EmployeeSalarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    baseSalary?: boolean
    allowance?: boolean
    bonus?: boolean
    effectiveFrom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeSalary"]>

  export type EmployeeSalarySelectScalar = {
    id?: boolean
    employeeId?: boolean
    baseSalary?: boolean
    allowance?: boolean
    bonus?: boolean
    effectiveFrom?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeSalaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "baseSalary" | "allowance" | "bonus" | "effectiveFrom" | "createdAt" | "updatedAt", ExtArgs["result"]["employeeSalary"]>
  export type EmployeeSalaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeSalaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type EmployeeSalaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $EmployeeSalaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeSalary"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      baseSalary: number
      allowance: number
      bonus: number
      effectiveFrom: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employeeSalary"]>
    composites: {}
  }

  type EmployeeSalaryGetPayload<S extends boolean | null | undefined | EmployeeSalaryDefaultArgs> = $Result.GetResult<Prisma.$EmployeeSalaryPayload, S>

  type EmployeeSalaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeSalaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeSalaryCountAggregateInputType | true
    }

  export interface EmployeeSalaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeSalary'], meta: { name: 'EmployeeSalary' } }
    /**
     * Find zero or one EmployeeSalary that matches the filter.
     * @param {EmployeeSalaryFindUniqueArgs} args - Arguments to find a EmployeeSalary
     * @example
     * // Get one EmployeeSalary
     * const employeeSalary = await prisma.employeeSalary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeSalaryFindUniqueArgs>(args: SelectSubset<T, EmployeeSalaryFindUniqueArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeSalary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeSalaryFindUniqueOrThrowArgs} args - Arguments to find a EmployeeSalary
     * @example
     * // Get one EmployeeSalary
     * const employeeSalary = await prisma.employeeSalary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeSalaryFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeSalaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeSalary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSalaryFindFirstArgs} args - Arguments to find a EmployeeSalary
     * @example
     * // Get one EmployeeSalary
     * const employeeSalary = await prisma.employeeSalary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeSalaryFindFirstArgs>(args?: SelectSubset<T, EmployeeSalaryFindFirstArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeSalary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSalaryFindFirstOrThrowArgs} args - Arguments to find a EmployeeSalary
     * @example
     * // Get one EmployeeSalary
     * const employeeSalary = await prisma.employeeSalary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeSalaryFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeSalaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeSalaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSalaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeSalaries
     * const employeeSalaries = await prisma.employeeSalary.findMany()
     * 
     * // Get first 10 EmployeeSalaries
     * const employeeSalaries = await prisma.employeeSalary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeSalaryWithIdOnly = await prisma.employeeSalary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeSalaryFindManyArgs>(args?: SelectSubset<T, EmployeeSalaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeSalary.
     * @param {EmployeeSalaryCreateArgs} args - Arguments to create a EmployeeSalary.
     * @example
     * // Create one EmployeeSalary
     * const EmployeeSalary = await prisma.employeeSalary.create({
     *   data: {
     *     // ... data to create a EmployeeSalary
     *   }
     * })
     * 
     */
    create<T extends EmployeeSalaryCreateArgs>(args: SelectSubset<T, EmployeeSalaryCreateArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeSalaries.
     * @param {EmployeeSalaryCreateManyArgs} args - Arguments to create many EmployeeSalaries.
     * @example
     * // Create many EmployeeSalaries
     * const employeeSalary = await prisma.employeeSalary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeSalaryCreateManyArgs>(args?: SelectSubset<T, EmployeeSalaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeSalaries and returns the data saved in the database.
     * @param {EmployeeSalaryCreateManyAndReturnArgs} args - Arguments to create many EmployeeSalaries.
     * @example
     * // Create many EmployeeSalaries
     * const employeeSalary = await prisma.employeeSalary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeSalaries and only return the `id`
     * const employeeSalaryWithIdOnly = await prisma.employeeSalary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeSalaryCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeSalaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeSalary.
     * @param {EmployeeSalaryDeleteArgs} args - Arguments to delete one EmployeeSalary.
     * @example
     * // Delete one EmployeeSalary
     * const EmployeeSalary = await prisma.employeeSalary.delete({
     *   where: {
     *     // ... filter to delete one EmployeeSalary
     *   }
     * })
     * 
     */
    delete<T extends EmployeeSalaryDeleteArgs>(args: SelectSubset<T, EmployeeSalaryDeleteArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeSalary.
     * @param {EmployeeSalaryUpdateArgs} args - Arguments to update one EmployeeSalary.
     * @example
     * // Update one EmployeeSalary
     * const employeeSalary = await prisma.employeeSalary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeSalaryUpdateArgs>(args: SelectSubset<T, EmployeeSalaryUpdateArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeSalaries.
     * @param {EmployeeSalaryDeleteManyArgs} args - Arguments to filter EmployeeSalaries to delete.
     * @example
     * // Delete a few EmployeeSalaries
     * const { count } = await prisma.employeeSalary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeSalaryDeleteManyArgs>(args?: SelectSubset<T, EmployeeSalaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeSalaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSalaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeSalaries
     * const employeeSalary = await prisma.employeeSalary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeSalaryUpdateManyArgs>(args: SelectSubset<T, EmployeeSalaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeSalaries and returns the data updated in the database.
     * @param {EmployeeSalaryUpdateManyAndReturnArgs} args - Arguments to update many EmployeeSalaries.
     * @example
     * // Update many EmployeeSalaries
     * const employeeSalary = await prisma.employeeSalary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeSalaries and only return the `id`
     * const employeeSalaryWithIdOnly = await prisma.employeeSalary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeSalaryUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeSalaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeSalary.
     * @param {EmployeeSalaryUpsertArgs} args - Arguments to update or create a EmployeeSalary.
     * @example
     * // Update or create a EmployeeSalary
     * const employeeSalary = await prisma.employeeSalary.upsert({
     *   create: {
     *     // ... data to create a EmployeeSalary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeSalary we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeSalaryUpsertArgs>(args: SelectSubset<T, EmployeeSalaryUpsertArgs<ExtArgs>>): Prisma__EmployeeSalaryClient<$Result.GetResult<Prisma.$EmployeeSalaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeSalaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSalaryCountArgs} args - Arguments to filter EmployeeSalaries to count.
     * @example
     * // Count the number of EmployeeSalaries
     * const count = await prisma.employeeSalary.count({
     *   where: {
     *     // ... the filter for the EmployeeSalaries we want to count
     *   }
     * })
    **/
    count<T extends EmployeeSalaryCountArgs>(
      args?: Subset<T, EmployeeSalaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeSalaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeSalary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSalaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeSalaryAggregateArgs>(args: Subset<T, EmployeeSalaryAggregateArgs>): Prisma.PrismaPromise<GetEmployeeSalaryAggregateType<T>>

    /**
     * Group by EmployeeSalary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeSalaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeSalaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeSalaryGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeSalaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeSalaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeSalaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeSalary model
   */
  readonly fields: EmployeeSalaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeSalary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeSalaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeSalary model
   */
  interface EmployeeSalaryFieldRefs {
    readonly id: FieldRef<"EmployeeSalary", 'String'>
    readonly employeeId: FieldRef<"EmployeeSalary", 'String'>
    readonly baseSalary: FieldRef<"EmployeeSalary", 'Int'>
    readonly allowance: FieldRef<"EmployeeSalary", 'Int'>
    readonly bonus: FieldRef<"EmployeeSalary", 'Int'>
    readonly effectiveFrom: FieldRef<"EmployeeSalary", 'DateTime'>
    readonly createdAt: FieldRef<"EmployeeSalary", 'DateTime'>
    readonly updatedAt: FieldRef<"EmployeeSalary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeSalary findUnique
   */
  export type EmployeeSalaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeSalary to fetch.
     */
    where: EmployeeSalaryWhereUniqueInput
  }

  /**
   * EmployeeSalary findUniqueOrThrow
   */
  export type EmployeeSalaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeSalary to fetch.
     */
    where: EmployeeSalaryWhereUniqueInput
  }

  /**
   * EmployeeSalary findFirst
   */
  export type EmployeeSalaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeSalary to fetch.
     */
    where?: EmployeeSalaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeSalaries to fetch.
     */
    orderBy?: EmployeeSalaryOrderByWithRelationInput | EmployeeSalaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeSalaries.
     */
    cursor?: EmployeeSalaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeSalaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeSalaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeSalaries.
     */
    distinct?: EmployeeSalaryScalarFieldEnum | EmployeeSalaryScalarFieldEnum[]
  }

  /**
   * EmployeeSalary findFirstOrThrow
   */
  export type EmployeeSalaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeSalary to fetch.
     */
    where?: EmployeeSalaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeSalaries to fetch.
     */
    orderBy?: EmployeeSalaryOrderByWithRelationInput | EmployeeSalaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeSalaries.
     */
    cursor?: EmployeeSalaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeSalaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeSalaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeSalaries.
     */
    distinct?: EmployeeSalaryScalarFieldEnum | EmployeeSalaryScalarFieldEnum[]
  }

  /**
   * EmployeeSalary findMany
   */
  export type EmployeeSalaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeSalaries to fetch.
     */
    where?: EmployeeSalaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeSalaries to fetch.
     */
    orderBy?: EmployeeSalaryOrderByWithRelationInput | EmployeeSalaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeSalaries.
     */
    cursor?: EmployeeSalaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeSalaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeSalaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeSalaries.
     */
    distinct?: EmployeeSalaryScalarFieldEnum | EmployeeSalaryScalarFieldEnum[]
  }

  /**
   * EmployeeSalary create
   */
  export type EmployeeSalaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeSalary.
     */
    data: XOR<EmployeeSalaryCreateInput, EmployeeSalaryUncheckedCreateInput>
  }

  /**
   * EmployeeSalary createMany
   */
  export type EmployeeSalaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeSalaries.
     */
    data: EmployeeSalaryCreateManyInput | EmployeeSalaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeSalary createManyAndReturn
   */
  export type EmployeeSalaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeSalaries.
     */
    data: EmployeeSalaryCreateManyInput | EmployeeSalaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeSalary update
   */
  export type EmployeeSalaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeSalary.
     */
    data: XOR<EmployeeSalaryUpdateInput, EmployeeSalaryUncheckedUpdateInput>
    /**
     * Choose, which EmployeeSalary to update.
     */
    where: EmployeeSalaryWhereUniqueInput
  }

  /**
   * EmployeeSalary updateMany
   */
  export type EmployeeSalaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeSalaries.
     */
    data: XOR<EmployeeSalaryUpdateManyMutationInput, EmployeeSalaryUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeSalaries to update
     */
    where?: EmployeeSalaryWhereInput
    /**
     * Limit how many EmployeeSalaries to update.
     */
    limit?: number
  }

  /**
   * EmployeeSalary updateManyAndReturn
   */
  export type EmployeeSalaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeSalaries.
     */
    data: XOR<EmployeeSalaryUpdateManyMutationInput, EmployeeSalaryUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeSalaries to update
     */
    where?: EmployeeSalaryWhereInput
    /**
     * Limit how many EmployeeSalaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeSalary upsert
   */
  export type EmployeeSalaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeSalary to update in case it exists.
     */
    where: EmployeeSalaryWhereUniqueInput
    /**
     * In case the EmployeeSalary found by the `where` argument doesn't exist, create a new EmployeeSalary with this data.
     */
    create: XOR<EmployeeSalaryCreateInput, EmployeeSalaryUncheckedCreateInput>
    /**
     * In case the EmployeeSalary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeSalaryUpdateInput, EmployeeSalaryUncheckedUpdateInput>
  }

  /**
   * EmployeeSalary delete
   */
  export type EmployeeSalaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
    /**
     * Filter which EmployeeSalary to delete.
     */
    where: EmployeeSalaryWhereUniqueInput
  }

  /**
   * EmployeeSalary deleteMany
   */
  export type EmployeeSalaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeSalaries to delete
     */
    where?: EmployeeSalaryWhereInput
    /**
     * Limit how many EmployeeSalaries to delete.
     */
    limit?: number
  }

  /**
   * EmployeeSalary without action
   */
  export type EmployeeSalaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeSalary
     */
    select?: EmployeeSalarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeSalary
     */
    omit?: EmployeeSalaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeSalaryInclude<ExtArgs> | null
  }


  /**
   * Model LeaveBalance
   */

  export type AggregateLeaveBalance = {
    _count: LeaveBalanceCountAggregateOutputType | null
    _avg: LeaveBalanceAvgAggregateOutputType | null
    _sum: LeaveBalanceSumAggregateOutputType | null
    _min: LeaveBalanceMinAggregateOutputType | null
    _max: LeaveBalanceMaxAggregateOutputType | null
  }

  export type LeaveBalanceAvgAggregateOutputType = {
    grantedDays: number | null
    usedDays: number | null
  }

  export type LeaveBalanceSumAggregateOutputType = {
    grantedDays: number | null
    usedDays: number | null
  }

  export type LeaveBalanceMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    grantedDays: number | null
    usedDays: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeaveBalanceMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    grantedDays: number | null
    usedDays: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeaveBalanceCountAggregateOutputType = {
    id: number
    employeeId: number
    grantedDays: number
    usedDays: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeaveBalanceAvgAggregateInputType = {
    grantedDays?: true
    usedDays?: true
  }

  export type LeaveBalanceSumAggregateInputType = {
    grantedDays?: true
    usedDays?: true
  }

  export type LeaveBalanceMinAggregateInputType = {
    id?: true
    employeeId?: true
    grantedDays?: true
    usedDays?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeaveBalanceMaxAggregateInputType = {
    id?: true
    employeeId?: true
    grantedDays?: true
    usedDays?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeaveBalanceCountAggregateInputType = {
    id?: true
    employeeId?: true
    grantedDays?: true
    usedDays?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeaveBalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveBalance to aggregate.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveBalances
    **/
    _count?: true | LeaveBalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaveBalanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaveBalanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveBalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveBalanceMaxAggregateInputType
  }

  export type GetLeaveBalanceAggregateType<T extends LeaveBalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveBalance[P]>
      : GetScalarType<T[P], AggregateLeaveBalance[P]>
  }




  export type LeaveBalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveBalanceWhereInput
    orderBy?: LeaveBalanceOrderByWithAggregationInput | LeaveBalanceOrderByWithAggregationInput[]
    by: LeaveBalanceScalarFieldEnum[] | LeaveBalanceScalarFieldEnum
    having?: LeaveBalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveBalanceCountAggregateInputType | true
    _avg?: LeaveBalanceAvgAggregateInputType
    _sum?: LeaveBalanceSumAggregateInputType
    _min?: LeaveBalanceMinAggregateInputType
    _max?: LeaveBalanceMaxAggregateInputType
  }

  export type LeaveBalanceGroupByOutputType = {
    id: string
    employeeId: string
    grantedDays: number
    usedDays: number
    createdAt: Date
    updatedAt: Date
    _count: LeaveBalanceCountAggregateOutputType | null
    _avg: LeaveBalanceAvgAggregateOutputType | null
    _sum: LeaveBalanceSumAggregateOutputType | null
    _min: LeaveBalanceMinAggregateOutputType | null
    _max: LeaveBalanceMaxAggregateOutputType | null
  }

  type GetLeaveBalanceGroupByPayload<T extends LeaveBalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveBalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveBalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveBalanceGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveBalanceGroupByOutputType[P]>
        }
      >
    >


  export type LeaveBalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    grantedDays?: boolean
    usedDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveBalance"]>

  export type LeaveBalanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    grantedDays?: boolean
    usedDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveBalance"]>

  export type LeaveBalanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    grantedDays?: boolean
    usedDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveBalance"]>

  export type LeaveBalanceSelectScalar = {
    id?: boolean
    employeeId?: boolean
    grantedDays?: boolean
    usedDays?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeaveBalanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeId" | "grantedDays" | "usedDays" | "createdAt" | "updatedAt", ExtArgs["result"]["leaveBalance"]>
  export type LeaveBalanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type LeaveBalanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type LeaveBalanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $LeaveBalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveBalance"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      grantedDays: number
      usedDays: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leaveBalance"]>
    composites: {}
  }

  type LeaveBalanceGetPayload<S extends boolean | null | undefined | LeaveBalanceDefaultArgs> = $Result.GetResult<Prisma.$LeaveBalancePayload, S>

  type LeaveBalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaveBalanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaveBalanceCountAggregateInputType | true
    }

  export interface LeaveBalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveBalance'], meta: { name: 'LeaveBalance' } }
    /**
     * Find zero or one LeaveBalance that matches the filter.
     * @param {LeaveBalanceFindUniqueArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveBalanceFindUniqueArgs>(args: SelectSubset<T, LeaveBalanceFindUniqueArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaveBalance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaveBalanceFindUniqueOrThrowArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveBalanceFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveBalanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveBalance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindFirstArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveBalanceFindFirstArgs>(args?: SelectSubset<T, LeaveBalanceFindFirstArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaveBalance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindFirstOrThrowArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveBalanceFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveBalanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaveBalances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveBalances
     * const leaveBalances = await prisma.leaveBalance.findMany()
     * 
     * // Get first 10 LeaveBalances
     * const leaveBalances = await prisma.leaveBalance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveBalanceWithIdOnly = await prisma.leaveBalance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveBalanceFindManyArgs>(args?: SelectSubset<T, LeaveBalanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaveBalance.
     * @param {LeaveBalanceCreateArgs} args - Arguments to create a LeaveBalance.
     * @example
     * // Create one LeaveBalance
     * const LeaveBalance = await prisma.leaveBalance.create({
     *   data: {
     *     // ... data to create a LeaveBalance
     *   }
     * })
     * 
     */
    create<T extends LeaveBalanceCreateArgs>(args: SelectSubset<T, LeaveBalanceCreateArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaveBalances.
     * @param {LeaveBalanceCreateManyArgs} args - Arguments to create many LeaveBalances.
     * @example
     * // Create many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveBalanceCreateManyArgs>(args?: SelectSubset<T, LeaveBalanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveBalances and returns the data saved in the database.
     * @param {LeaveBalanceCreateManyAndReturnArgs} args - Arguments to create many LeaveBalances.
     * @example
     * // Create many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveBalances and only return the `id`
     * const leaveBalanceWithIdOnly = await prisma.leaveBalance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveBalanceCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveBalanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaveBalance.
     * @param {LeaveBalanceDeleteArgs} args - Arguments to delete one LeaveBalance.
     * @example
     * // Delete one LeaveBalance
     * const LeaveBalance = await prisma.leaveBalance.delete({
     *   where: {
     *     // ... filter to delete one LeaveBalance
     *   }
     * })
     * 
     */
    delete<T extends LeaveBalanceDeleteArgs>(args: SelectSubset<T, LeaveBalanceDeleteArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaveBalance.
     * @param {LeaveBalanceUpdateArgs} args - Arguments to update one LeaveBalance.
     * @example
     * // Update one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveBalanceUpdateArgs>(args: SelectSubset<T, LeaveBalanceUpdateArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaveBalances.
     * @param {LeaveBalanceDeleteManyArgs} args - Arguments to filter LeaveBalances to delete.
     * @example
     * // Delete a few LeaveBalances
     * const { count } = await prisma.leaveBalance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveBalanceDeleteManyArgs>(args?: SelectSubset<T, LeaveBalanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveBalanceUpdateManyArgs>(args: SelectSubset<T, LeaveBalanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveBalances and returns the data updated in the database.
     * @param {LeaveBalanceUpdateManyAndReturnArgs} args - Arguments to update many LeaveBalances.
     * @example
     * // Update many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaveBalances and only return the `id`
     * const leaveBalanceWithIdOnly = await prisma.leaveBalance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeaveBalanceUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaveBalanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaveBalance.
     * @param {LeaveBalanceUpsertArgs} args - Arguments to update or create a LeaveBalance.
     * @example
     * // Update or create a LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.upsert({
     *   create: {
     *     // ... data to create a LeaveBalance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveBalance we want to update
     *   }
     * })
     */
    upsert<T extends LeaveBalanceUpsertArgs>(args: SelectSubset<T, LeaveBalanceUpsertArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaveBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceCountArgs} args - Arguments to filter LeaveBalances to count.
     * @example
     * // Count the number of LeaveBalances
     * const count = await prisma.leaveBalance.count({
     *   where: {
     *     // ... the filter for the LeaveBalances we want to count
     *   }
     * })
    **/
    count<T extends LeaveBalanceCountArgs>(
      args?: Subset<T, LeaveBalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveBalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaveBalanceAggregateArgs>(args: Subset<T, LeaveBalanceAggregateArgs>): Prisma.PrismaPromise<GetLeaveBalanceAggregateType<T>>

    /**
     * Group by LeaveBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaveBalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveBalanceGroupByArgs['orderBy'] }
        : { orderBy?: LeaveBalanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaveBalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveBalance model
   */
  readonly fields: LeaveBalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveBalance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveBalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeaveBalance model
   */
  interface LeaveBalanceFieldRefs {
    readonly id: FieldRef<"LeaveBalance", 'String'>
    readonly employeeId: FieldRef<"LeaveBalance", 'String'>
    readonly grantedDays: FieldRef<"LeaveBalance", 'Float'>
    readonly usedDays: FieldRef<"LeaveBalance", 'Float'>
    readonly createdAt: FieldRef<"LeaveBalance", 'DateTime'>
    readonly updatedAt: FieldRef<"LeaveBalance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaveBalance findUnique
   */
  export type LeaveBalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance findUniqueOrThrow
   */
  export type LeaveBalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance findFirst
   */
  export type LeaveBalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveBalances.
     */
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance findFirstOrThrow
   */
  export type LeaveBalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveBalances.
     */
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance findMany
   */
  export type LeaveBalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalances to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveBalances.
     */
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance create
   */
  export type LeaveBalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaveBalance.
     */
    data: XOR<LeaveBalanceCreateInput, LeaveBalanceUncheckedCreateInput>
  }

  /**
   * LeaveBalance createMany
   */
  export type LeaveBalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveBalances.
     */
    data: LeaveBalanceCreateManyInput | LeaveBalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveBalance createManyAndReturn
   */
  export type LeaveBalanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * The data used to create many LeaveBalances.
     */
    data: LeaveBalanceCreateManyInput | LeaveBalanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveBalance update
   */
  export type LeaveBalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaveBalance.
     */
    data: XOR<LeaveBalanceUpdateInput, LeaveBalanceUncheckedUpdateInput>
    /**
     * Choose, which LeaveBalance to update.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance updateMany
   */
  export type LeaveBalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveBalances.
     */
    data: XOR<LeaveBalanceUpdateManyMutationInput, LeaveBalanceUncheckedUpdateManyInput>
    /**
     * Filter which LeaveBalances to update
     */
    where?: LeaveBalanceWhereInput
    /**
     * Limit how many LeaveBalances to update.
     */
    limit?: number
  }

  /**
   * LeaveBalance updateManyAndReturn
   */
  export type LeaveBalanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * The data used to update LeaveBalances.
     */
    data: XOR<LeaveBalanceUpdateManyMutationInput, LeaveBalanceUncheckedUpdateManyInput>
    /**
     * Filter which LeaveBalances to update
     */
    where?: LeaveBalanceWhereInput
    /**
     * Limit how many LeaveBalances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveBalance upsert
   */
  export type LeaveBalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaveBalance to update in case it exists.
     */
    where: LeaveBalanceWhereUniqueInput
    /**
     * In case the LeaveBalance found by the `where` argument doesn't exist, create a new LeaveBalance with this data.
     */
    create: XOR<LeaveBalanceCreateInput, LeaveBalanceUncheckedCreateInput>
    /**
     * In case the LeaveBalance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveBalanceUpdateInput, LeaveBalanceUncheckedUpdateInput>
  }

  /**
   * LeaveBalance delete
   */
  export type LeaveBalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter which LeaveBalance to delete.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance deleteMany
   */
  export type LeaveBalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveBalances to delete
     */
    where?: LeaveBalanceWhereInput
    /**
     * Limit how many LeaveBalances to delete.
     */
    limit?: number
  }

  /**
   * LeaveBalance without action
   */
  export type LeaveBalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaveBalance
     */
    omit?: LeaveBalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
  }


  /**
   * Model EmployeeRequest
   */

  export type AggregateEmployeeRequest = {
    _count: EmployeeRequestCountAggregateOutputType | null
    _min: EmployeeRequestMinAggregateOutputType | null
    _max: EmployeeRequestMaxAggregateOutputType | null
  }

  export type EmployeeRequestMinAggregateOutputType = {
    id: string | null
    title: string | null
    comment: string | null
    type: $Enums.RequestType | null
    status: $Enums.RequestStatus | null
    approvalComment: string | null
    rejectionReason: string | null
    userId: string | null
    employeeId: string | null
    createdAt: Date | null
  }

  export type EmployeeRequestMaxAggregateOutputType = {
    id: string | null
    title: string | null
    comment: string | null
    type: $Enums.RequestType | null
    status: $Enums.RequestStatus | null
    approvalComment: string | null
    rejectionReason: string | null
    userId: string | null
    employeeId: string | null
    createdAt: Date | null
  }

  export type EmployeeRequestCountAggregateOutputType = {
    id: number
    title: number
    comment: number
    type: number
    status: number
    approvalComment: number
    rejectionReason: number
    userId: number
    employeeId: number
    createdAt: number
    _all: number
  }


  export type EmployeeRequestMinAggregateInputType = {
    id?: true
    title?: true
    comment?: true
    type?: true
    status?: true
    approvalComment?: true
    rejectionReason?: true
    userId?: true
    employeeId?: true
    createdAt?: true
  }

  export type EmployeeRequestMaxAggregateInputType = {
    id?: true
    title?: true
    comment?: true
    type?: true
    status?: true
    approvalComment?: true
    rejectionReason?: true
    userId?: true
    employeeId?: true
    createdAt?: true
  }

  export type EmployeeRequestCountAggregateInputType = {
    id?: true
    title?: true
    comment?: true
    type?: true
    status?: true
    approvalComment?: true
    rejectionReason?: true
    userId?: true
    employeeId?: true
    createdAt?: true
    _all?: true
  }

  export type EmployeeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeRequest to aggregate.
     */
    where?: EmployeeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeRequests to fetch.
     */
    orderBy?: EmployeeRequestOrderByWithRelationInput | EmployeeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeRequests
    **/
    _count?: true | EmployeeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeRequestMaxAggregateInputType
  }

  export type GetEmployeeRequestAggregateType<T extends EmployeeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeRequest[P]>
      : GetScalarType<T[P], AggregateEmployeeRequest[P]>
  }




  export type EmployeeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeRequestWhereInput
    orderBy?: EmployeeRequestOrderByWithAggregationInput | EmployeeRequestOrderByWithAggregationInput[]
    by: EmployeeRequestScalarFieldEnum[] | EmployeeRequestScalarFieldEnum
    having?: EmployeeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeRequestCountAggregateInputType | true
    _min?: EmployeeRequestMinAggregateInputType
    _max?: EmployeeRequestMaxAggregateInputType
  }

  export type EmployeeRequestGroupByOutputType = {
    id: string
    title: string
    comment: string | null
    type: $Enums.RequestType
    status: $Enums.RequestStatus
    approvalComment: string | null
    rejectionReason: string | null
    userId: string | null
    employeeId: string | null
    createdAt: Date
    _count: EmployeeRequestCountAggregateOutputType | null
    _min: EmployeeRequestMinAggregateOutputType | null
    _max: EmployeeRequestMaxAggregateOutputType | null
  }

  type GetEmployeeRequestGroupByPayload<T extends EmployeeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeRequestGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    comment?: boolean
    type?: boolean
    status?: boolean
    approvalComment?: boolean
    rejectionReason?: boolean
    userId?: boolean
    employeeId?: boolean
    createdAt?: boolean
    user?: boolean | EmployeeRequest$userArgs<ExtArgs>
    employee?: boolean | EmployeeRequest$employeeArgs<ExtArgs>
    histories?: boolean | EmployeeRequest$historiesArgs<ExtArgs>
    attachments?: boolean | EmployeeRequest$attachmentsArgs<ExtArgs>
    _count?: boolean | EmployeeRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employeeRequest"]>

  export type EmployeeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    comment?: boolean
    type?: boolean
    status?: boolean
    approvalComment?: boolean
    rejectionReason?: boolean
    userId?: boolean
    employeeId?: boolean
    createdAt?: boolean
    user?: boolean | EmployeeRequest$userArgs<ExtArgs>
    employee?: boolean | EmployeeRequest$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["employeeRequest"]>

  export type EmployeeRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    comment?: boolean
    type?: boolean
    status?: boolean
    approvalComment?: boolean
    rejectionReason?: boolean
    userId?: boolean
    employeeId?: boolean
    createdAt?: boolean
    user?: boolean | EmployeeRequest$userArgs<ExtArgs>
    employee?: boolean | EmployeeRequest$employeeArgs<ExtArgs>
  }, ExtArgs["result"]["employeeRequest"]>

  export type EmployeeRequestSelectScalar = {
    id?: boolean
    title?: boolean
    comment?: boolean
    type?: boolean
    status?: boolean
    approvalComment?: boolean
    rejectionReason?: boolean
    userId?: boolean
    employeeId?: boolean
    createdAt?: boolean
  }

  export type EmployeeRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "comment" | "type" | "status" | "approvalComment" | "rejectionReason" | "userId" | "employeeId" | "createdAt", ExtArgs["result"]["employeeRequest"]>
  export type EmployeeRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | EmployeeRequest$userArgs<ExtArgs>
    employee?: boolean | EmployeeRequest$employeeArgs<ExtArgs>
    histories?: boolean | EmployeeRequest$historiesArgs<ExtArgs>
    attachments?: boolean | EmployeeRequest$attachmentsArgs<ExtArgs>
    _count?: boolean | EmployeeRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | EmployeeRequest$userArgs<ExtArgs>
    employee?: boolean | EmployeeRequest$employeeArgs<ExtArgs>
  }
  export type EmployeeRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | EmployeeRequest$userArgs<ExtArgs>
    employee?: boolean | EmployeeRequest$employeeArgs<ExtArgs>
  }

  export type $EmployeeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployeeRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      employee: Prisma.$EmployeePayload<ExtArgs> | null
      histories: Prisma.$RequestHistoryPayload<ExtArgs>[]
      attachments: Prisma.$RequestAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      comment: string | null
      type: $Enums.RequestType
      status: $Enums.RequestStatus
      approvalComment: string | null
      rejectionReason: string | null
      userId: string | null
      employeeId: string | null
      createdAt: Date
    }, ExtArgs["result"]["employeeRequest"]>
    composites: {}
  }

  type EmployeeRequestGetPayload<S extends boolean | null | undefined | EmployeeRequestDefaultArgs> = $Result.GetResult<Prisma.$EmployeeRequestPayload, S>

  type EmployeeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployeeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployeeRequestCountAggregateInputType | true
    }

  export interface EmployeeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployeeRequest'], meta: { name: 'EmployeeRequest' } }
    /**
     * Find zero or one EmployeeRequest that matches the filter.
     * @param {EmployeeRequestFindUniqueArgs} args - Arguments to find a EmployeeRequest
     * @example
     * // Get one EmployeeRequest
     * const employeeRequest = await prisma.employeeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeRequestFindUniqueArgs>(args: SelectSubset<T, EmployeeRequestFindUniqueArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmployeeRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployeeRequestFindUniqueOrThrowArgs} args - Arguments to find a EmployeeRequest
     * @example
     * // Get one EmployeeRequest
     * const employeeRequest = await prisma.employeeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeRequestFindFirstArgs} args - Arguments to find a EmployeeRequest
     * @example
     * // Get one EmployeeRequest
     * const employeeRequest = await prisma.employeeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeRequestFindFirstArgs>(args?: SelectSubset<T, EmployeeRequestFindFirstArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmployeeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeRequestFindFirstOrThrowArgs} args - Arguments to find a EmployeeRequest
     * @example
     * // Get one EmployeeRequest
     * const employeeRequest = await prisma.employeeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmployeeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeRequests
     * const employeeRequests = await prisma.employeeRequest.findMany()
     * 
     * // Get first 10 EmployeeRequests
     * const employeeRequests = await prisma.employeeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeRequestWithIdOnly = await prisma.employeeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeRequestFindManyArgs>(args?: SelectSubset<T, EmployeeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmployeeRequest.
     * @param {EmployeeRequestCreateArgs} args - Arguments to create a EmployeeRequest.
     * @example
     * // Create one EmployeeRequest
     * const EmployeeRequest = await prisma.employeeRequest.create({
     *   data: {
     *     // ... data to create a EmployeeRequest
     *   }
     * })
     * 
     */
    create<T extends EmployeeRequestCreateArgs>(args: SelectSubset<T, EmployeeRequestCreateArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmployeeRequests.
     * @param {EmployeeRequestCreateManyArgs} args - Arguments to create many EmployeeRequests.
     * @example
     * // Create many EmployeeRequests
     * const employeeRequest = await prisma.employeeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeRequestCreateManyArgs>(args?: SelectSubset<T, EmployeeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmployeeRequests and returns the data saved in the database.
     * @param {EmployeeRequestCreateManyAndReturnArgs} args - Arguments to create many EmployeeRequests.
     * @example
     * // Create many EmployeeRequests
     * const employeeRequest = await prisma.employeeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmployeeRequests and only return the `id`
     * const employeeRequestWithIdOnly = await prisma.employeeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmployeeRequest.
     * @param {EmployeeRequestDeleteArgs} args - Arguments to delete one EmployeeRequest.
     * @example
     * // Delete one EmployeeRequest
     * const EmployeeRequest = await prisma.employeeRequest.delete({
     *   where: {
     *     // ... filter to delete one EmployeeRequest
     *   }
     * })
     * 
     */
    delete<T extends EmployeeRequestDeleteArgs>(args: SelectSubset<T, EmployeeRequestDeleteArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmployeeRequest.
     * @param {EmployeeRequestUpdateArgs} args - Arguments to update one EmployeeRequest.
     * @example
     * // Update one EmployeeRequest
     * const employeeRequest = await prisma.employeeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeRequestUpdateArgs>(args: SelectSubset<T, EmployeeRequestUpdateArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmployeeRequests.
     * @param {EmployeeRequestDeleteManyArgs} args - Arguments to filter EmployeeRequests to delete.
     * @example
     * // Delete a few EmployeeRequests
     * const { count } = await prisma.employeeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeRequestDeleteManyArgs>(args?: SelectSubset<T, EmployeeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeRequests
     * const employeeRequest = await prisma.employeeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeRequestUpdateManyArgs>(args: SelectSubset<T, EmployeeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeRequests and returns the data updated in the database.
     * @param {EmployeeRequestUpdateManyAndReturnArgs} args - Arguments to update many EmployeeRequests.
     * @example
     * // Update many EmployeeRequests
     * const employeeRequest = await prisma.employeeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmployeeRequests and only return the `id`
     * const employeeRequestWithIdOnly = await prisma.employeeRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmployeeRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, EmployeeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmployeeRequest.
     * @param {EmployeeRequestUpsertArgs} args - Arguments to update or create a EmployeeRequest.
     * @example
     * // Update or create a EmployeeRequest
     * const employeeRequest = await prisma.employeeRequest.upsert({
     *   create: {
     *     // ... data to create a EmployeeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeRequest we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeRequestUpsertArgs>(args: SelectSubset<T, EmployeeRequestUpsertArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmployeeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeRequestCountArgs} args - Arguments to filter EmployeeRequests to count.
     * @example
     * // Count the number of EmployeeRequests
     * const count = await prisma.employeeRequest.count({
     *   where: {
     *     // ... the filter for the EmployeeRequests we want to count
     *   }
     * })
    **/
    count<T extends EmployeeRequestCountArgs>(
      args?: Subset<T, EmployeeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeRequestAggregateArgs>(args: Subset<T, EmployeeRequestAggregateArgs>): Prisma.PrismaPromise<GetEmployeeRequestAggregateType<T>>

    /**
     * Group by EmployeeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeRequestGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployeeRequest model
   */
  readonly fields: EmployeeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends EmployeeRequest$userArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeRequest$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    employee<T extends EmployeeRequest$employeeArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeRequest$employeeArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    histories<T extends EmployeeRequest$historiesArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeRequest$historiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attachments<T extends EmployeeRequest$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeRequest$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmployeeRequest model
   */
  interface EmployeeRequestFieldRefs {
    readonly id: FieldRef<"EmployeeRequest", 'String'>
    readonly title: FieldRef<"EmployeeRequest", 'String'>
    readonly comment: FieldRef<"EmployeeRequest", 'String'>
    readonly type: FieldRef<"EmployeeRequest", 'RequestType'>
    readonly status: FieldRef<"EmployeeRequest", 'RequestStatus'>
    readonly approvalComment: FieldRef<"EmployeeRequest", 'String'>
    readonly rejectionReason: FieldRef<"EmployeeRequest", 'String'>
    readonly userId: FieldRef<"EmployeeRequest", 'String'>
    readonly employeeId: FieldRef<"EmployeeRequest", 'String'>
    readonly createdAt: FieldRef<"EmployeeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmployeeRequest findUnique
   */
  export type EmployeeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeRequest to fetch.
     */
    where: EmployeeRequestWhereUniqueInput
  }

  /**
   * EmployeeRequest findUniqueOrThrow
   */
  export type EmployeeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeRequest to fetch.
     */
    where: EmployeeRequestWhereUniqueInput
  }

  /**
   * EmployeeRequest findFirst
   */
  export type EmployeeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeRequest to fetch.
     */
    where?: EmployeeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeRequests to fetch.
     */
    orderBy?: EmployeeRequestOrderByWithRelationInput | EmployeeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeRequests.
     */
    cursor?: EmployeeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeRequests.
     */
    distinct?: EmployeeRequestScalarFieldEnum | EmployeeRequestScalarFieldEnum[]
  }

  /**
   * EmployeeRequest findFirstOrThrow
   */
  export type EmployeeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeRequest to fetch.
     */
    where?: EmployeeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeRequests to fetch.
     */
    orderBy?: EmployeeRequestOrderByWithRelationInput | EmployeeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeRequests.
     */
    cursor?: EmployeeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeRequests.
     */
    distinct?: EmployeeRequestScalarFieldEnum | EmployeeRequestScalarFieldEnum[]
  }

  /**
   * EmployeeRequest findMany
   */
  export type EmployeeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * Filter, which EmployeeRequests to fetch.
     */
    where?: EmployeeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeRequests to fetch.
     */
    orderBy?: EmployeeRequestOrderByWithRelationInput | EmployeeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeRequests.
     */
    cursor?: EmployeeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeRequests.
     */
    distinct?: EmployeeRequestScalarFieldEnum | EmployeeRequestScalarFieldEnum[]
  }

  /**
   * EmployeeRequest create
   */
  export type EmployeeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployeeRequest.
     */
    data: XOR<EmployeeRequestCreateInput, EmployeeRequestUncheckedCreateInput>
  }

  /**
   * EmployeeRequest createMany
   */
  export type EmployeeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployeeRequests.
     */
    data: EmployeeRequestCreateManyInput | EmployeeRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmployeeRequest createManyAndReturn
   */
  export type EmployeeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * The data used to create many EmployeeRequests.
     */
    data: EmployeeRequestCreateManyInput | EmployeeRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeRequest update
   */
  export type EmployeeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployeeRequest.
     */
    data: XOR<EmployeeRequestUpdateInput, EmployeeRequestUncheckedUpdateInput>
    /**
     * Choose, which EmployeeRequest to update.
     */
    where: EmployeeRequestWhereUniqueInput
  }

  /**
   * EmployeeRequest updateMany
   */
  export type EmployeeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployeeRequests.
     */
    data: XOR<EmployeeRequestUpdateManyMutationInput, EmployeeRequestUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeRequests to update
     */
    where?: EmployeeRequestWhereInput
    /**
     * Limit how many EmployeeRequests to update.
     */
    limit?: number
  }

  /**
   * EmployeeRequest updateManyAndReturn
   */
  export type EmployeeRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * The data used to update EmployeeRequests.
     */
    data: XOR<EmployeeRequestUpdateManyMutationInput, EmployeeRequestUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeRequests to update
     */
    where?: EmployeeRequestWhereInput
    /**
     * Limit how many EmployeeRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmployeeRequest upsert
   */
  export type EmployeeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployeeRequest to update in case it exists.
     */
    where: EmployeeRequestWhereUniqueInput
    /**
     * In case the EmployeeRequest found by the `where` argument doesn't exist, create a new EmployeeRequest with this data.
     */
    create: XOR<EmployeeRequestCreateInput, EmployeeRequestUncheckedCreateInput>
    /**
     * In case the EmployeeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeRequestUpdateInput, EmployeeRequestUncheckedUpdateInput>
  }

  /**
   * EmployeeRequest delete
   */
  export type EmployeeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
    /**
     * Filter which EmployeeRequest to delete.
     */
    where: EmployeeRequestWhereUniqueInput
  }

  /**
   * EmployeeRequest deleteMany
   */
  export type EmployeeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployeeRequests to delete
     */
    where?: EmployeeRequestWhereInput
    /**
     * Limit how many EmployeeRequests to delete.
     */
    limit?: number
  }

  /**
   * EmployeeRequest.user
   */
  export type EmployeeRequest$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * EmployeeRequest.employee
   */
  export type EmployeeRequest$employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employee
     */
    omit?: EmployeeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }

  /**
   * EmployeeRequest.histories
   */
  export type EmployeeRequest$historiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    where?: RequestHistoryWhereInput
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    cursor?: RequestHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestHistoryScalarFieldEnum | RequestHistoryScalarFieldEnum[]
  }

  /**
   * EmployeeRequest.attachments
   */
  export type EmployeeRequest$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    where?: RequestAttachmentWhereInput
    orderBy?: RequestAttachmentOrderByWithRelationInput | RequestAttachmentOrderByWithRelationInput[]
    cursor?: RequestAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestAttachmentScalarFieldEnum | RequestAttachmentScalarFieldEnum[]
  }

  /**
   * EmployeeRequest without action
   */
  export type EmployeeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeRequest
     */
    select?: EmployeeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmployeeRequest
     */
    omit?: EmployeeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeRequestInclude<ExtArgs> | null
  }


  /**
   * Model RequestAttachment
   */

  export type AggregateRequestAttachment = {
    _count: RequestAttachmentCountAggregateOutputType | null
    _avg: RequestAttachmentAvgAggregateOutputType | null
    _sum: RequestAttachmentSumAggregateOutputType | null
    _min: RequestAttachmentMinAggregateOutputType | null
    _max: RequestAttachmentMaxAggregateOutputType | null
  }

  export type RequestAttachmentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type RequestAttachmentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type RequestAttachmentMinAggregateOutputType = {
    id: string | null
    fileName: string | null
    filePath: string | null
    fileSize: number | null
    mimeType: string | null
    requestId: string | null
    createdAt: Date | null
  }

  export type RequestAttachmentMaxAggregateOutputType = {
    id: string | null
    fileName: string | null
    filePath: string | null
    fileSize: number | null
    mimeType: string | null
    requestId: string | null
    createdAt: Date | null
  }

  export type RequestAttachmentCountAggregateOutputType = {
    id: number
    fileName: number
    filePath: number
    fileSize: number
    mimeType: number
    requestId: number
    createdAt: number
    _all: number
  }


  export type RequestAttachmentAvgAggregateInputType = {
    fileSize?: true
  }

  export type RequestAttachmentSumAggregateInputType = {
    fileSize?: true
  }

  export type RequestAttachmentMinAggregateInputType = {
    id?: true
    fileName?: true
    filePath?: true
    fileSize?: true
    mimeType?: true
    requestId?: true
    createdAt?: true
  }

  export type RequestAttachmentMaxAggregateInputType = {
    id?: true
    fileName?: true
    filePath?: true
    fileSize?: true
    mimeType?: true
    requestId?: true
    createdAt?: true
  }

  export type RequestAttachmentCountAggregateInputType = {
    id?: true
    fileName?: true
    filePath?: true
    fileSize?: true
    mimeType?: true
    requestId?: true
    createdAt?: true
    _all?: true
  }

  export type RequestAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestAttachment to aggregate.
     */
    where?: RequestAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestAttachments to fetch.
     */
    orderBy?: RequestAttachmentOrderByWithRelationInput | RequestAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestAttachments
    **/
    _count?: true | RequestAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestAttachmentMaxAggregateInputType
  }

  export type GetRequestAttachmentAggregateType<T extends RequestAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestAttachment[P]>
      : GetScalarType<T[P], AggregateRequestAttachment[P]>
  }




  export type RequestAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestAttachmentWhereInput
    orderBy?: RequestAttachmentOrderByWithAggregationInput | RequestAttachmentOrderByWithAggregationInput[]
    by: RequestAttachmentScalarFieldEnum[] | RequestAttachmentScalarFieldEnum
    having?: RequestAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestAttachmentCountAggregateInputType | true
    _avg?: RequestAttachmentAvgAggregateInputType
    _sum?: RequestAttachmentSumAggregateInputType
    _min?: RequestAttachmentMinAggregateInputType
    _max?: RequestAttachmentMaxAggregateInputType
  }

  export type RequestAttachmentGroupByOutputType = {
    id: string
    fileName: string
    filePath: string
    fileSize: number | null
    mimeType: string | null
    requestId: string
    createdAt: Date
    _count: RequestAttachmentCountAggregateOutputType | null
    _avg: RequestAttachmentAvgAggregateOutputType | null
    _sum: RequestAttachmentSumAggregateOutputType | null
    _min: RequestAttachmentMinAggregateOutputType | null
    _max: RequestAttachmentMaxAggregateOutputType | null
  }

  type GetRequestAttachmentGroupByPayload<T extends RequestAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], RequestAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type RequestAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    filePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    requestId?: boolean
    createdAt?: boolean
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestAttachment"]>

  export type RequestAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    filePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    requestId?: boolean
    createdAt?: boolean
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestAttachment"]>

  export type RequestAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    filePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    requestId?: boolean
    createdAt?: boolean
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestAttachment"]>

  export type RequestAttachmentSelectScalar = {
    id?: boolean
    fileName?: boolean
    filePath?: boolean
    fileSize?: boolean
    mimeType?: boolean
    requestId?: boolean
    createdAt?: boolean
  }

  export type RequestAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileName" | "filePath" | "fileSize" | "mimeType" | "requestId" | "createdAt", ExtArgs["result"]["requestAttachment"]>
  export type RequestAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }
  export type RequestAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }
  export type RequestAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }

  export type $RequestAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestAttachment"
    objects: {
      request: Prisma.$EmployeeRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileName: string
      filePath: string
      fileSize: number | null
      mimeType: string | null
      requestId: string
      createdAt: Date
    }, ExtArgs["result"]["requestAttachment"]>
    composites: {}
  }

  type RequestAttachmentGetPayload<S extends boolean | null | undefined | RequestAttachmentDefaultArgs> = $Result.GetResult<Prisma.$RequestAttachmentPayload, S>

  type RequestAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestAttachmentCountAggregateInputType | true
    }

  export interface RequestAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestAttachment'], meta: { name: 'RequestAttachment' } }
    /**
     * Find zero or one RequestAttachment that matches the filter.
     * @param {RequestAttachmentFindUniqueArgs} args - Arguments to find a RequestAttachment
     * @example
     * // Get one RequestAttachment
     * const requestAttachment = await prisma.requestAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestAttachmentFindUniqueArgs>(args: SelectSubset<T, RequestAttachmentFindUniqueArgs<ExtArgs>>): Prisma__RequestAttachmentClient<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestAttachmentFindUniqueOrThrowArgs} args - Arguments to find a RequestAttachment
     * @example
     * // Get one RequestAttachment
     * const requestAttachment = await prisma.requestAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestAttachmentClient<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAttachmentFindFirstArgs} args - Arguments to find a RequestAttachment
     * @example
     * // Get one RequestAttachment
     * const requestAttachment = await prisma.requestAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestAttachmentFindFirstArgs>(args?: SelectSubset<T, RequestAttachmentFindFirstArgs<ExtArgs>>): Prisma__RequestAttachmentClient<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAttachmentFindFirstOrThrowArgs} args - Arguments to find a RequestAttachment
     * @example
     * // Get one RequestAttachment
     * const requestAttachment = await prisma.requestAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestAttachmentClient<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestAttachments
     * const requestAttachments = await prisma.requestAttachment.findMany()
     * 
     * // Get first 10 RequestAttachments
     * const requestAttachments = await prisma.requestAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestAttachmentWithIdOnly = await prisma.requestAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestAttachmentFindManyArgs>(args?: SelectSubset<T, RequestAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestAttachment.
     * @param {RequestAttachmentCreateArgs} args - Arguments to create a RequestAttachment.
     * @example
     * // Create one RequestAttachment
     * const RequestAttachment = await prisma.requestAttachment.create({
     *   data: {
     *     // ... data to create a RequestAttachment
     *   }
     * })
     * 
     */
    create<T extends RequestAttachmentCreateArgs>(args: SelectSubset<T, RequestAttachmentCreateArgs<ExtArgs>>): Prisma__RequestAttachmentClient<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestAttachments.
     * @param {RequestAttachmentCreateManyArgs} args - Arguments to create many RequestAttachments.
     * @example
     * // Create many RequestAttachments
     * const requestAttachment = await prisma.requestAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestAttachmentCreateManyArgs>(args?: SelectSubset<T, RequestAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestAttachments and returns the data saved in the database.
     * @param {RequestAttachmentCreateManyAndReturnArgs} args - Arguments to create many RequestAttachments.
     * @example
     * // Create many RequestAttachments
     * const requestAttachment = await prisma.requestAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestAttachments and only return the `id`
     * const requestAttachmentWithIdOnly = await prisma.requestAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestAttachment.
     * @param {RequestAttachmentDeleteArgs} args - Arguments to delete one RequestAttachment.
     * @example
     * // Delete one RequestAttachment
     * const RequestAttachment = await prisma.requestAttachment.delete({
     *   where: {
     *     // ... filter to delete one RequestAttachment
     *   }
     * })
     * 
     */
    delete<T extends RequestAttachmentDeleteArgs>(args: SelectSubset<T, RequestAttachmentDeleteArgs<ExtArgs>>): Prisma__RequestAttachmentClient<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestAttachment.
     * @param {RequestAttachmentUpdateArgs} args - Arguments to update one RequestAttachment.
     * @example
     * // Update one RequestAttachment
     * const requestAttachment = await prisma.requestAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestAttachmentUpdateArgs>(args: SelectSubset<T, RequestAttachmentUpdateArgs<ExtArgs>>): Prisma__RequestAttachmentClient<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestAttachments.
     * @param {RequestAttachmentDeleteManyArgs} args - Arguments to filter RequestAttachments to delete.
     * @example
     * // Delete a few RequestAttachments
     * const { count } = await prisma.requestAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestAttachmentDeleteManyArgs>(args?: SelectSubset<T, RequestAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestAttachments
     * const requestAttachment = await prisma.requestAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestAttachmentUpdateManyArgs>(args: SelectSubset<T, RequestAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestAttachments and returns the data updated in the database.
     * @param {RequestAttachmentUpdateManyAndReturnArgs} args - Arguments to update many RequestAttachments.
     * @example
     * // Update many RequestAttachments
     * const requestAttachment = await prisma.requestAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestAttachments and only return the `id`
     * const requestAttachmentWithIdOnly = await prisma.requestAttachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestAttachment.
     * @param {RequestAttachmentUpsertArgs} args - Arguments to update or create a RequestAttachment.
     * @example
     * // Update or create a RequestAttachment
     * const requestAttachment = await prisma.requestAttachment.upsert({
     *   create: {
     *     // ... data to create a RequestAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestAttachment we want to update
     *   }
     * })
     */
    upsert<T extends RequestAttachmentUpsertArgs>(args: SelectSubset<T, RequestAttachmentUpsertArgs<ExtArgs>>): Prisma__RequestAttachmentClient<$Result.GetResult<Prisma.$RequestAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAttachmentCountArgs} args - Arguments to filter RequestAttachments to count.
     * @example
     * // Count the number of RequestAttachments
     * const count = await prisma.requestAttachment.count({
     *   where: {
     *     // ... the filter for the RequestAttachments we want to count
     *   }
     * })
    **/
    count<T extends RequestAttachmentCountArgs>(
      args?: Subset<T, RequestAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestAttachmentAggregateArgs>(args: Subset<T, RequestAttachmentAggregateArgs>): Prisma.PrismaPromise<GetRequestAttachmentAggregateType<T>>

    /**
     * Group by RequestAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: RequestAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestAttachment model
   */
  readonly fields: RequestAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends EmployeeRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeRequestDefaultArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestAttachment model
   */
  interface RequestAttachmentFieldRefs {
    readonly id: FieldRef<"RequestAttachment", 'String'>
    readonly fileName: FieldRef<"RequestAttachment", 'String'>
    readonly filePath: FieldRef<"RequestAttachment", 'String'>
    readonly fileSize: FieldRef<"RequestAttachment", 'Int'>
    readonly mimeType: FieldRef<"RequestAttachment", 'String'>
    readonly requestId: FieldRef<"RequestAttachment", 'String'>
    readonly createdAt: FieldRef<"RequestAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestAttachment findUnique
   */
  export type RequestAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which RequestAttachment to fetch.
     */
    where: RequestAttachmentWhereUniqueInput
  }

  /**
   * RequestAttachment findUniqueOrThrow
   */
  export type RequestAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which RequestAttachment to fetch.
     */
    where: RequestAttachmentWhereUniqueInput
  }

  /**
   * RequestAttachment findFirst
   */
  export type RequestAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which RequestAttachment to fetch.
     */
    where?: RequestAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestAttachments to fetch.
     */
    orderBy?: RequestAttachmentOrderByWithRelationInput | RequestAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestAttachments.
     */
    cursor?: RequestAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestAttachments.
     */
    distinct?: RequestAttachmentScalarFieldEnum | RequestAttachmentScalarFieldEnum[]
  }

  /**
   * RequestAttachment findFirstOrThrow
   */
  export type RequestAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which RequestAttachment to fetch.
     */
    where?: RequestAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestAttachments to fetch.
     */
    orderBy?: RequestAttachmentOrderByWithRelationInput | RequestAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestAttachments.
     */
    cursor?: RequestAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestAttachments.
     */
    distinct?: RequestAttachmentScalarFieldEnum | RequestAttachmentScalarFieldEnum[]
  }

  /**
   * RequestAttachment findMany
   */
  export type RequestAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which RequestAttachments to fetch.
     */
    where?: RequestAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestAttachments to fetch.
     */
    orderBy?: RequestAttachmentOrderByWithRelationInput | RequestAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestAttachments.
     */
    cursor?: RequestAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestAttachments.
     */
    distinct?: RequestAttachmentScalarFieldEnum | RequestAttachmentScalarFieldEnum[]
  }

  /**
   * RequestAttachment create
   */
  export type RequestAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestAttachment.
     */
    data: XOR<RequestAttachmentCreateInput, RequestAttachmentUncheckedCreateInput>
  }

  /**
   * RequestAttachment createMany
   */
  export type RequestAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestAttachments.
     */
    data: RequestAttachmentCreateManyInput | RequestAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestAttachment createManyAndReturn
   */
  export type RequestAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many RequestAttachments.
     */
    data: RequestAttachmentCreateManyInput | RequestAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestAttachment update
   */
  export type RequestAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestAttachment.
     */
    data: XOR<RequestAttachmentUpdateInput, RequestAttachmentUncheckedUpdateInput>
    /**
     * Choose, which RequestAttachment to update.
     */
    where: RequestAttachmentWhereUniqueInput
  }

  /**
   * RequestAttachment updateMany
   */
  export type RequestAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestAttachments.
     */
    data: XOR<RequestAttachmentUpdateManyMutationInput, RequestAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which RequestAttachments to update
     */
    where?: RequestAttachmentWhereInput
    /**
     * Limit how many RequestAttachments to update.
     */
    limit?: number
  }

  /**
   * RequestAttachment updateManyAndReturn
   */
  export type RequestAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update RequestAttachments.
     */
    data: XOR<RequestAttachmentUpdateManyMutationInput, RequestAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which RequestAttachments to update
     */
    where?: RequestAttachmentWhereInput
    /**
     * Limit how many RequestAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestAttachment upsert
   */
  export type RequestAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestAttachment to update in case it exists.
     */
    where: RequestAttachmentWhereUniqueInput
    /**
     * In case the RequestAttachment found by the `where` argument doesn't exist, create a new RequestAttachment with this data.
     */
    create: XOR<RequestAttachmentCreateInput, RequestAttachmentUncheckedCreateInput>
    /**
     * In case the RequestAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestAttachmentUpdateInput, RequestAttachmentUncheckedUpdateInput>
  }

  /**
   * RequestAttachment delete
   */
  export type RequestAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
    /**
     * Filter which RequestAttachment to delete.
     */
    where: RequestAttachmentWhereUniqueInput
  }

  /**
   * RequestAttachment deleteMany
   */
  export type RequestAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestAttachments to delete
     */
    where?: RequestAttachmentWhereInput
    /**
     * Limit how many RequestAttachments to delete.
     */
    limit?: number
  }

  /**
   * RequestAttachment without action
   */
  export type RequestAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestAttachment
     */
    select?: RequestAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestAttachment
     */
    omit?: RequestAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model RequestHistory
   */

  export type AggregateRequestHistory = {
    _count: RequestHistoryCountAggregateOutputType | null
    _min: RequestHistoryMinAggregateOutputType | null
    _max: RequestHistoryMaxAggregateOutputType | null
  }

  export type RequestHistoryMinAggregateOutputType = {
    id: string | null
    action: $Enums.RequestHistoryAction | null
    comment: string | null
    actor: string | null
    requestId: string | null
    createdAt: Date | null
  }

  export type RequestHistoryMaxAggregateOutputType = {
    id: string | null
    action: $Enums.RequestHistoryAction | null
    comment: string | null
    actor: string | null
    requestId: string | null
    createdAt: Date | null
  }

  export type RequestHistoryCountAggregateOutputType = {
    id: number
    action: number
    comment: number
    actor: number
    requestId: number
    createdAt: number
    _all: number
  }


  export type RequestHistoryMinAggregateInputType = {
    id?: true
    action?: true
    comment?: true
    actor?: true
    requestId?: true
    createdAt?: true
  }

  export type RequestHistoryMaxAggregateInputType = {
    id?: true
    action?: true
    comment?: true
    actor?: true
    requestId?: true
    createdAt?: true
  }

  export type RequestHistoryCountAggregateInputType = {
    id?: true
    action?: true
    comment?: true
    actor?: true
    requestId?: true
    createdAt?: true
    _all?: true
  }

  export type RequestHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestHistory to aggregate.
     */
    where?: RequestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestHistories to fetch.
     */
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestHistories
    **/
    _count?: true | RequestHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestHistoryMaxAggregateInputType
  }

  export type GetRequestHistoryAggregateType<T extends RequestHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestHistory[P]>
      : GetScalarType<T[P], AggregateRequestHistory[P]>
  }




  export type RequestHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestHistoryWhereInput
    orderBy?: RequestHistoryOrderByWithAggregationInput | RequestHistoryOrderByWithAggregationInput[]
    by: RequestHistoryScalarFieldEnum[] | RequestHistoryScalarFieldEnum
    having?: RequestHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestHistoryCountAggregateInputType | true
    _min?: RequestHistoryMinAggregateInputType
    _max?: RequestHistoryMaxAggregateInputType
  }

  export type RequestHistoryGroupByOutputType = {
    id: string
    action: $Enums.RequestHistoryAction
    comment: string | null
    actor: string | null
    requestId: string
    createdAt: Date
    _count: RequestHistoryCountAggregateOutputType | null
    _min: RequestHistoryMinAggregateOutputType | null
    _max: RequestHistoryMaxAggregateOutputType | null
  }

  type GetRequestHistoryGroupByPayload<T extends RequestHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], RequestHistoryGroupByOutputType[P]>
        }
      >
    >


  export type RequestHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    comment?: boolean
    actor?: boolean
    requestId?: boolean
    createdAt?: boolean
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestHistory"]>

  export type RequestHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    comment?: boolean
    actor?: boolean
    requestId?: boolean
    createdAt?: boolean
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestHistory"]>

  export type RequestHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    comment?: boolean
    actor?: boolean
    requestId?: boolean
    createdAt?: boolean
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestHistory"]>

  export type RequestHistorySelectScalar = {
    id?: boolean
    action?: boolean
    comment?: boolean
    actor?: boolean
    requestId?: boolean
    createdAt?: boolean
  }

  export type RequestHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "comment" | "actor" | "requestId" | "createdAt", ExtArgs["result"]["requestHistory"]>
  export type RequestHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }
  export type RequestHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }
  export type RequestHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | EmployeeRequestDefaultArgs<ExtArgs>
  }

  export type $RequestHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestHistory"
    objects: {
      request: Prisma.$EmployeeRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: $Enums.RequestHistoryAction
      comment: string | null
      actor: string | null
      requestId: string
      createdAt: Date
    }, ExtArgs["result"]["requestHistory"]>
    composites: {}
  }

  type RequestHistoryGetPayload<S extends boolean | null | undefined | RequestHistoryDefaultArgs> = $Result.GetResult<Prisma.$RequestHistoryPayload, S>

  type RequestHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestHistoryCountAggregateInputType | true
    }

  export interface RequestHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestHistory'], meta: { name: 'RequestHistory' } }
    /**
     * Find zero or one RequestHistory that matches the filter.
     * @param {RequestHistoryFindUniqueArgs} args - Arguments to find a RequestHistory
     * @example
     * // Get one RequestHistory
     * const requestHistory = await prisma.requestHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestHistoryFindUniqueArgs>(args: SelectSubset<T, RequestHistoryFindUniqueArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestHistoryFindUniqueOrThrowArgs} args - Arguments to find a RequestHistory
     * @example
     * // Get one RequestHistory
     * const requestHistory = await prisma.requestHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryFindFirstArgs} args - Arguments to find a RequestHistory
     * @example
     * // Get one RequestHistory
     * const requestHistory = await prisma.requestHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestHistoryFindFirstArgs>(args?: SelectSubset<T, RequestHistoryFindFirstArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryFindFirstOrThrowArgs} args - Arguments to find a RequestHistory
     * @example
     * // Get one RequestHistory
     * const requestHistory = await prisma.requestHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestHistories
     * const requestHistories = await prisma.requestHistory.findMany()
     * 
     * // Get first 10 RequestHistories
     * const requestHistories = await prisma.requestHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestHistoryWithIdOnly = await prisma.requestHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestHistoryFindManyArgs>(args?: SelectSubset<T, RequestHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestHistory.
     * @param {RequestHistoryCreateArgs} args - Arguments to create a RequestHistory.
     * @example
     * // Create one RequestHistory
     * const RequestHistory = await prisma.requestHistory.create({
     *   data: {
     *     // ... data to create a RequestHistory
     *   }
     * })
     * 
     */
    create<T extends RequestHistoryCreateArgs>(args: SelectSubset<T, RequestHistoryCreateArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestHistories.
     * @param {RequestHistoryCreateManyArgs} args - Arguments to create many RequestHistories.
     * @example
     * // Create many RequestHistories
     * const requestHistory = await prisma.requestHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestHistoryCreateManyArgs>(args?: SelectSubset<T, RequestHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestHistories and returns the data saved in the database.
     * @param {RequestHistoryCreateManyAndReturnArgs} args - Arguments to create many RequestHistories.
     * @example
     * // Create many RequestHistories
     * const requestHistory = await prisma.requestHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestHistories and only return the `id`
     * const requestHistoryWithIdOnly = await prisma.requestHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestHistory.
     * @param {RequestHistoryDeleteArgs} args - Arguments to delete one RequestHistory.
     * @example
     * // Delete one RequestHistory
     * const RequestHistory = await prisma.requestHistory.delete({
     *   where: {
     *     // ... filter to delete one RequestHistory
     *   }
     * })
     * 
     */
    delete<T extends RequestHistoryDeleteArgs>(args: SelectSubset<T, RequestHistoryDeleteArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestHistory.
     * @param {RequestHistoryUpdateArgs} args - Arguments to update one RequestHistory.
     * @example
     * // Update one RequestHistory
     * const requestHistory = await prisma.requestHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestHistoryUpdateArgs>(args: SelectSubset<T, RequestHistoryUpdateArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestHistories.
     * @param {RequestHistoryDeleteManyArgs} args - Arguments to filter RequestHistories to delete.
     * @example
     * // Delete a few RequestHistories
     * const { count } = await prisma.requestHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestHistoryDeleteManyArgs>(args?: SelectSubset<T, RequestHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestHistories
     * const requestHistory = await prisma.requestHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestHistoryUpdateManyArgs>(args: SelectSubset<T, RequestHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestHistories and returns the data updated in the database.
     * @param {RequestHistoryUpdateManyAndReturnArgs} args - Arguments to update many RequestHistories.
     * @example
     * // Update many RequestHistories
     * const requestHistory = await prisma.requestHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestHistories and only return the `id`
     * const requestHistoryWithIdOnly = await prisma.requestHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestHistory.
     * @param {RequestHistoryUpsertArgs} args - Arguments to update or create a RequestHistory.
     * @example
     * // Update or create a RequestHistory
     * const requestHistory = await prisma.requestHistory.upsert({
     *   create: {
     *     // ... data to create a RequestHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestHistory we want to update
     *   }
     * })
     */
    upsert<T extends RequestHistoryUpsertArgs>(args: SelectSubset<T, RequestHistoryUpsertArgs<ExtArgs>>): Prisma__RequestHistoryClient<$Result.GetResult<Prisma.$RequestHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryCountArgs} args - Arguments to filter RequestHistories to count.
     * @example
     * // Count the number of RequestHistories
     * const count = await prisma.requestHistory.count({
     *   where: {
     *     // ... the filter for the RequestHistories we want to count
     *   }
     * })
    **/
    count<T extends RequestHistoryCountArgs>(
      args?: Subset<T, RequestHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestHistoryAggregateArgs>(args: Subset<T, RequestHistoryAggregateArgs>): Prisma.PrismaPromise<GetRequestHistoryAggregateType<T>>

    /**
     * Group by RequestHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestHistoryGroupByArgs['orderBy'] }
        : { orderBy?: RequestHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestHistory model
   */
  readonly fields: RequestHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends EmployeeRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeRequestDefaultArgs<ExtArgs>>): Prisma__EmployeeRequestClient<$Result.GetResult<Prisma.$EmployeeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestHistory model
   */
  interface RequestHistoryFieldRefs {
    readonly id: FieldRef<"RequestHistory", 'String'>
    readonly action: FieldRef<"RequestHistory", 'RequestHistoryAction'>
    readonly comment: FieldRef<"RequestHistory", 'String'>
    readonly actor: FieldRef<"RequestHistory", 'String'>
    readonly requestId: FieldRef<"RequestHistory", 'String'>
    readonly createdAt: FieldRef<"RequestHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestHistory findUnique
   */
  export type RequestHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RequestHistory to fetch.
     */
    where: RequestHistoryWhereUniqueInput
  }

  /**
   * RequestHistory findUniqueOrThrow
   */
  export type RequestHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RequestHistory to fetch.
     */
    where: RequestHistoryWhereUniqueInput
  }

  /**
   * RequestHistory findFirst
   */
  export type RequestHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RequestHistory to fetch.
     */
    where?: RequestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestHistories to fetch.
     */
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestHistories.
     */
    cursor?: RequestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestHistories.
     */
    distinct?: RequestHistoryScalarFieldEnum | RequestHistoryScalarFieldEnum[]
  }

  /**
   * RequestHistory findFirstOrThrow
   */
  export type RequestHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RequestHistory to fetch.
     */
    where?: RequestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestHistories to fetch.
     */
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestHistories.
     */
    cursor?: RequestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestHistories.
     */
    distinct?: RequestHistoryScalarFieldEnum | RequestHistoryScalarFieldEnum[]
  }

  /**
   * RequestHistory findMany
   */
  export type RequestHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * Filter, which RequestHistories to fetch.
     */
    where?: RequestHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestHistories to fetch.
     */
    orderBy?: RequestHistoryOrderByWithRelationInput | RequestHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestHistories.
     */
    cursor?: RequestHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestHistories.
     */
    distinct?: RequestHistoryScalarFieldEnum | RequestHistoryScalarFieldEnum[]
  }

  /**
   * RequestHistory create
   */
  export type RequestHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestHistory.
     */
    data: XOR<RequestHistoryCreateInput, RequestHistoryUncheckedCreateInput>
  }

  /**
   * RequestHistory createMany
   */
  export type RequestHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestHistories.
     */
    data: RequestHistoryCreateManyInput | RequestHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestHistory createManyAndReturn
   */
  export type RequestHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many RequestHistories.
     */
    data: RequestHistoryCreateManyInput | RequestHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestHistory update
   */
  export type RequestHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestHistory.
     */
    data: XOR<RequestHistoryUpdateInput, RequestHistoryUncheckedUpdateInput>
    /**
     * Choose, which RequestHistory to update.
     */
    where: RequestHistoryWhereUniqueInput
  }

  /**
   * RequestHistory updateMany
   */
  export type RequestHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestHistories.
     */
    data: XOR<RequestHistoryUpdateManyMutationInput, RequestHistoryUncheckedUpdateManyInput>
    /**
     * Filter which RequestHistories to update
     */
    where?: RequestHistoryWhereInput
    /**
     * Limit how many RequestHistories to update.
     */
    limit?: number
  }

  /**
   * RequestHistory updateManyAndReturn
   */
  export type RequestHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * The data used to update RequestHistories.
     */
    data: XOR<RequestHistoryUpdateManyMutationInput, RequestHistoryUncheckedUpdateManyInput>
    /**
     * Filter which RequestHistories to update
     */
    where?: RequestHistoryWhereInput
    /**
     * Limit how many RequestHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestHistory upsert
   */
  export type RequestHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestHistory to update in case it exists.
     */
    where: RequestHistoryWhereUniqueInput
    /**
     * In case the RequestHistory found by the `where` argument doesn't exist, create a new RequestHistory with this data.
     */
    create: XOR<RequestHistoryCreateInput, RequestHistoryUncheckedCreateInput>
    /**
     * In case the RequestHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestHistoryUpdateInput, RequestHistoryUncheckedUpdateInput>
  }

  /**
   * RequestHistory delete
   */
  export type RequestHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
    /**
     * Filter which RequestHistory to delete.
     */
    where: RequestHistoryWhereUniqueInput
  }

  /**
   * RequestHistory deleteMany
   */
  export type RequestHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestHistories to delete
     */
    where?: RequestHistoryWhereInput
    /**
     * Limit how many RequestHistories to delete.
     */
    limit?: number
  }

  /**
   * RequestHistory without action
   */
  export type RequestHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestHistory
     */
    select?: RequestHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestHistory
     */
    omit?: RequestHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestHistoryInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    userName: string | null
    action: string | null
    targetType: string | null
    targetId: string | null
    description: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    userName: string | null
    action: string | null
    targetType: string | null
    targetId: string | null
    description: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    userName: number
    action: number
    targetType: number
    targetId: number
    description: number
    beforeData: number
    afterData: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    action?: true
    targetType?: true
    targetId?: true
    description?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    action?: true
    targetType?: true
    targetId?: true
    description?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    userName?: true
    action?: true
    targetType?: true
    targetId?: true
    description?: true
    beforeData?: true
    afterData?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    userName: string | null
    action: string
    targetType: string
    targetId: string | null
    description: string | null
    beforeData: JsonValue | null
    afterData: JsonValue | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userName?: boolean
    action?: boolean
    targetType?: boolean
    targetId?: boolean
    description?: boolean
    beforeData?: boolean
    afterData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userName?: boolean
    action?: boolean
    targetType?: boolean
    targetId?: boolean
    description?: boolean
    beforeData?: boolean
    afterData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userName?: boolean
    action?: boolean
    targetType?: boolean
    targetId?: boolean
    description?: boolean
    beforeData?: boolean
    afterData?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    userName?: boolean
    action?: boolean
    targetType?: boolean
    targetId?: boolean
    description?: boolean
    beforeData?: boolean
    afterData?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "userName" | "action" | "targetType" | "targetId" | "description" | "beforeData" | "afterData" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      userName: string | null
      action: string
      targetType: string
      targetId: string | null
      description: string | null
      beforeData: Prisma.JsonValue | null
      afterData: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly userName: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly targetType: FieldRef<"AuditLog", 'String'>
    readonly targetId: FieldRef<"AuditLog", 'String'>
    readonly description: FieldRef<"AuditLog", 'String'>
    readonly beforeData: FieldRef<"AuditLog", 'Json'>
    readonly afterData: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    employeeNo: 'employeeNo',
    lastName: 'lastName',
    firstName: 'firstName',
    lastNameKana: 'lastNameKana',
    firstNameKana: 'firstNameKana',
    gender: 'gender',
    birthDate: 'birthDate',
    phoneNumber: 'phoneNumber',
    address: 'address',
    email: 'email',
    departmentId: 'departmentId',
    occupation: 'occupation',
    position: 'position',
    hireDate: 'hireDate',
    employmentType: 'employmentType',
    commutingType: 'commutingType',
    status: 'status',
    retirementDate: 'retirementDate',
    healthInsuranceNo: 'healthInsuranceNo',
    employmentInsuranceNo: 'employmentInsuranceNo',
    photoPath: 'photoPath',
    createdAt: 'createdAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const EmployeeMyNumberScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    encryptedNumber: 'encryptedNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeMyNumberScalarFieldEnum = (typeof EmployeeMyNumberScalarFieldEnum)[keyof typeof EmployeeMyNumberScalarFieldEnum]


  export const EmployeeSalaryScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    baseSalary: 'baseSalary',
    allowance: 'allowance',
    bonus: 'bonus',
    effectiveFrom: 'effectiveFrom',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeSalaryScalarFieldEnum = (typeof EmployeeSalaryScalarFieldEnum)[keyof typeof EmployeeSalaryScalarFieldEnum]


  export const LeaveBalanceScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    grantedDays: 'grantedDays',
    usedDays: 'usedDays',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeaveBalanceScalarFieldEnum = (typeof LeaveBalanceScalarFieldEnum)[keyof typeof LeaveBalanceScalarFieldEnum]


  export const EmployeeRequestScalarFieldEnum: {
    id: 'id',
    title: 'title',
    comment: 'comment',
    type: 'type',
    status: 'status',
    approvalComment: 'approvalComment',
    rejectionReason: 'rejectionReason',
    userId: 'userId',
    employeeId: 'employeeId',
    createdAt: 'createdAt'
  };

  export type EmployeeRequestScalarFieldEnum = (typeof EmployeeRequestScalarFieldEnum)[keyof typeof EmployeeRequestScalarFieldEnum]


  export const RequestAttachmentScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    filePath: 'filePath',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    requestId: 'requestId',
    createdAt: 'createdAt'
  };

  export type RequestAttachmentScalarFieldEnum = (typeof RequestAttachmentScalarFieldEnum)[keyof typeof RequestAttachmentScalarFieldEnum]


  export const RequestHistoryScalarFieldEnum: {
    id: 'id',
    action: 'action',
    comment: 'comment',
    actor: 'actor',
    requestId: 'requestId',
    createdAt: 'createdAt'
  };

  export type RequestHistoryScalarFieldEnum = (typeof RequestHistoryScalarFieldEnum)[keyof typeof RequestHistoryScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    userName: 'userName',
    action: 'action',
    targetType: 'targetType',
    targetId: 'targetId',
    description: 'description',
    beforeData: 'beforeData',
    afterData: 'afterData',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'EmploymentType'
   */
  export type EnumEmploymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmploymentType'>
    


  /**
   * Reference to a field of type 'EmploymentType[]'
   */
  export type ListEnumEmploymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmploymentType[]'>
    


  /**
   * Reference to a field of type 'EmployeeStatus'
   */
  export type EnumEmployeeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeStatus'>
    


  /**
   * Reference to a field of type 'EmployeeStatus[]'
   */
  export type ListEnumEmployeeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'RequestType'
   */
  export type EnumRequestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestType'>
    


  /**
   * Reference to a field of type 'RequestType[]'
   */
  export type ListEnumRequestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestType[]'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    


  /**
   * Reference to a field of type 'RequestHistoryAction'
   */
  export type EnumRequestHistoryActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestHistoryAction'>
    


  /**
   * Reference to a field of type 'RequestHistoryAction[]'
   */
  export type ListEnumRequestHistoryActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestHistoryAction[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    requests?: EmployeeRequestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    requests?: EmployeeRequestOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    requests?: EmployeeRequestListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    createdAt?: DateTimeFilter<"Department"> | Date | string
    employees?: EmployeeListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    employees?: EmployeeOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    createdAt?: DateTimeFilter<"Department"> | Date | string
    employees?: EmployeeListRelationFilter
  }, "id" | "name">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Department"> | string
    name?: StringWithAggregatesFilter<"Department"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    employeeNo?: StringFilter<"Employee"> | string
    lastName?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastNameKana?: StringNullableFilter<"Employee"> | string | null
    firstNameKana?: StringNullableFilter<"Employee"> | string | null
    gender?: EnumGenderNullableFilter<"Employee"> | $Enums.Gender | null
    birthDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    phoneNumber?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    email?: StringFilter<"Employee"> | string
    departmentId?: StringNullableFilter<"Employee"> | string | null
    occupation?: StringNullableFilter<"Employee"> | string | null
    position?: StringNullableFilter<"Employee"> | string | null
    hireDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    employmentType?: EnumEmploymentTypeNullableFilter<"Employee"> | $Enums.EmploymentType | null
    commutingType?: StringNullableFilter<"Employee"> | string | null
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    retirementDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    healthInsuranceNo?: StringNullableFilter<"Employee"> | string | null
    employmentInsuranceNo?: StringNullableFilter<"Employee"> | string | null
    photoPath?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    requests?: EmployeeRequestListRelationFilter
    employeeMyNumber?: XOR<EmployeeMyNumberNullableScalarRelationFilter, EmployeeMyNumberWhereInput> | null
    employeeSalary?: XOR<EmployeeSalaryNullableScalarRelationFilter, EmployeeSalaryWhereInput> | null
    leaveBalance?: XOR<LeaveBalanceNullableScalarRelationFilter, LeaveBalanceWhereInput> | null
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    employeeNo?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    lastNameKana?: SortOrderInput | SortOrder
    firstNameKana?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    email?: SortOrder
    departmentId?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    hireDate?: SortOrderInput | SortOrder
    employmentType?: SortOrderInput | SortOrder
    commutingType?: SortOrderInput | SortOrder
    status?: SortOrder
    retirementDate?: SortOrderInput | SortOrder
    healthInsuranceNo?: SortOrderInput | SortOrder
    employmentInsuranceNo?: SortOrderInput | SortOrder
    photoPath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    department?: DepartmentOrderByWithRelationInput
    requests?: EmployeeRequestOrderByRelationAggregateInput
    employeeMyNumber?: EmployeeMyNumberOrderByWithRelationInput
    employeeSalary?: EmployeeSalaryOrderByWithRelationInput
    leaveBalance?: LeaveBalanceOrderByWithRelationInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeNo?: string
    email?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    lastName?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastNameKana?: StringNullableFilter<"Employee"> | string | null
    firstNameKana?: StringNullableFilter<"Employee"> | string | null
    gender?: EnumGenderNullableFilter<"Employee"> | $Enums.Gender | null
    birthDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    phoneNumber?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    departmentId?: StringNullableFilter<"Employee"> | string | null
    occupation?: StringNullableFilter<"Employee"> | string | null
    position?: StringNullableFilter<"Employee"> | string | null
    hireDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    employmentType?: EnumEmploymentTypeNullableFilter<"Employee"> | $Enums.EmploymentType | null
    commutingType?: StringNullableFilter<"Employee"> | string | null
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    retirementDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    healthInsuranceNo?: StringNullableFilter<"Employee"> | string | null
    employmentInsuranceNo?: StringNullableFilter<"Employee"> | string | null
    photoPath?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    requests?: EmployeeRequestListRelationFilter
    employeeMyNumber?: XOR<EmployeeMyNumberNullableScalarRelationFilter, EmployeeMyNumberWhereInput> | null
    employeeSalary?: XOR<EmployeeSalaryNullableScalarRelationFilter, EmployeeSalaryWhereInput> | null
    leaveBalance?: XOR<LeaveBalanceNullableScalarRelationFilter, LeaveBalanceWhereInput> | null
  }, "id" | "employeeNo" | "email">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    employeeNo?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    lastNameKana?: SortOrderInput | SortOrder
    firstNameKana?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    email?: SortOrder
    departmentId?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    hireDate?: SortOrderInput | SortOrder
    employmentType?: SortOrderInput | SortOrder
    commutingType?: SortOrderInput | SortOrder
    status?: SortOrder
    retirementDate?: SortOrderInput | SortOrder
    healthInsuranceNo?: SortOrderInput | SortOrder
    employmentInsuranceNo?: SortOrderInput | SortOrder
    photoPath?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    employeeNo?: StringWithAggregatesFilter<"Employee"> | string
    lastName?: StringWithAggregatesFilter<"Employee"> | string
    firstName?: StringWithAggregatesFilter<"Employee"> | string
    lastNameKana?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    firstNameKana?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    gender?: EnumGenderNullableWithAggregatesFilter<"Employee"> | $Enums.Gender | null
    birthDate?: DateTimeNullableWithAggregatesFilter<"Employee"> | Date | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    address?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    email?: StringWithAggregatesFilter<"Employee"> | string
    departmentId?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    occupation?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    position?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    hireDate?: DateTimeNullableWithAggregatesFilter<"Employee"> | Date | string | null
    employmentType?: EnumEmploymentTypeNullableWithAggregatesFilter<"Employee"> | $Enums.EmploymentType | null
    commutingType?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    status?: EnumEmployeeStatusWithAggregatesFilter<"Employee"> | $Enums.EmployeeStatus
    retirementDate?: DateTimeNullableWithAggregatesFilter<"Employee"> | Date | string | null
    healthInsuranceNo?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    employmentInsuranceNo?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    photoPath?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type EmployeeMyNumberWhereInput = {
    AND?: EmployeeMyNumberWhereInput | EmployeeMyNumberWhereInput[]
    OR?: EmployeeMyNumberWhereInput[]
    NOT?: EmployeeMyNumberWhereInput | EmployeeMyNumberWhereInput[]
    id?: StringFilter<"EmployeeMyNumber"> | string
    employeeId?: StringFilter<"EmployeeMyNumber"> | string
    encryptedNumber?: StringFilter<"EmployeeMyNumber"> | string
    createdAt?: DateTimeFilter<"EmployeeMyNumber"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeMyNumber"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type EmployeeMyNumberOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    encryptedNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type EmployeeMyNumberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId?: string
    AND?: EmployeeMyNumberWhereInput | EmployeeMyNumberWhereInput[]
    OR?: EmployeeMyNumberWhereInput[]
    NOT?: EmployeeMyNumberWhereInput | EmployeeMyNumberWhereInput[]
    encryptedNumber?: StringFilter<"EmployeeMyNumber"> | string
    createdAt?: DateTimeFilter<"EmployeeMyNumber"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeMyNumber"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id" | "employeeId">

  export type EmployeeMyNumberOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    encryptedNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeMyNumberCountOrderByAggregateInput
    _max?: EmployeeMyNumberMaxOrderByAggregateInput
    _min?: EmployeeMyNumberMinOrderByAggregateInput
  }

  export type EmployeeMyNumberScalarWhereWithAggregatesInput = {
    AND?: EmployeeMyNumberScalarWhereWithAggregatesInput | EmployeeMyNumberScalarWhereWithAggregatesInput[]
    OR?: EmployeeMyNumberScalarWhereWithAggregatesInput[]
    NOT?: EmployeeMyNumberScalarWhereWithAggregatesInput | EmployeeMyNumberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeMyNumber"> | string
    employeeId?: StringWithAggregatesFilter<"EmployeeMyNumber"> | string
    encryptedNumber?: StringWithAggregatesFilter<"EmployeeMyNumber"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EmployeeMyNumber"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmployeeMyNumber"> | Date | string
  }

  export type EmployeeSalaryWhereInput = {
    AND?: EmployeeSalaryWhereInput | EmployeeSalaryWhereInput[]
    OR?: EmployeeSalaryWhereInput[]
    NOT?: EmployeeSalaryWhereInput | EmployeeSalaryWhereInput[]
    id?: StringFilter<"EmployeeSalary"> | string
    employeeId?: StringFilter<"EmployeeSalary"> | string
    baseSalary?: IntFilter<"EmployeeSalary"> | number
    allowance?: IntFilter<"EmployeeSalary"> | number
    bonus?: IntFilter<"EmployeeSalary"> | number
    effectiveFrom?: DateTimeFilter<"EmployeeSalary"> | Date | string
    createdAt?: DateTimeFilter<"EmployeeSalary"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeSalary"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type EmployeeSalaryOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    baseSalary?: SortOrder
    allowance?: SortOrder
    bonus?: SortOrder
    effectiveFrom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type EmployeeSalaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId?: string
    AND?: EmployeeSalaryWhereInput | EmployeeSalaryWhereInput[]
    OR?: EmployeeSalaryWhereInput[]
    NOT?: EmployeeSalaryWhereInput | EmployeeSalaryWhereInput[]
    baseSalary?: IntFilter<"EmployeeSalary"> | number
    allowance?: IntFilter<"EmployeeSalary"> | number
    bonus?: IntFilter<"EmployeeSalary"> | number
    effectiveFrom?: DateTimeFilter<"EmployeeSalary"> | Date | string
    createdAt?: DateTimeFilter<"EmployeeSalary"> | Date | string
    updatedAt?: DateTimeFilter<"EmployeeSalary"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id" | "employeeId">

  export type EmployeeSalaryOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    baseSalary?: SortOrder
    allowance?: SortOrder
    bonus?: SortOrder
    effectiveFrom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeSalaryCountOrderByAggregateInput
    _avg?: EmployeeSalaryAvgOrderByAggregateInput
    _max?: EmployeeSalaryMaxOrderByAggregateInput
    _min?: EmployeeSalaryMinOrderByAggregateInput
    _sum?: EmployeeSalarySumOrderByAggregateInput
  }

  export type EmployeeSalaryScalarWhereWithAggregatesInput = {
    AND?: EmployeeSalaryScalarWhereWithAggregatesInput | EmployeeSalaryScalarWhereWithAggregatesInput[]
    OR?: EmployeeSalaryScalarWhereWithAggregatesInput[]
    NOT?: EmployeeSalaryScalarWhereWithAggregatesInput | EmployeeSalaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeSalary"> | string
    employeeId?: StringWithAggregatesFilter<"EmployeeSalary"> | string
    baseSalary?: IntWithAggregatesFilter<"EmployeeSalary"> | number
    allowance?: IntWithAggregatesFilter<"EmployeeSalary"> | number
    bonus?: IntWithAggregatesFilter<"EmployeeSalary"> | number
    effectiveFrom?: DateTimeWithAggregatesFilter<"EmployeeSalary"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"EmployeeSalary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmployeeSalary"> | Date | string
  }

  export type LeaveBalanceWhereInput = {
    AND?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    OR?: LeaveBalanceWhereInput[]
    NOT?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    id?: StringFilter<"LeaveBalance"> | string
    employeeId?: StringFilter<"LeaveBalance"> | string
    grantedDays?: FloatFilter<"LeaveBalance"> | number
    usedDays?: FloatFilter<"LeaveBalance"> | number
    createdAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    updatedAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }

  export type LeaveBalanceOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    grantedDays?: SortOrder
    usedDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type LeaveBalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId?: string
    AND?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    OR?: LeaveBalanceWhereInput[]
    NOT?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    grantedDays?: FloatFilter<"LeaveBalance"> | number
    usedDays?: FloatFilter<"LeaveBalance"> | number
    createdAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    updatedAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    employee?: XOR<EmployeeScalarRelationFilter, EmployeeWhereInput>
  }, "id" | "employeeId">

  export type LeaveBalanceOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    grantedDays?: SortOrder
    usedDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeaveBalanceCountOrderByAggregateInput
    _avg?: LeaveBalanceAvgOrderByAggregateInput
    _max?: LeaveBalanceMaxOrderByAggregateInput
    _min?: LeaveBalanceMinOrderByAggregateInput
    _sum?: LeaveBalanceSumOrderByAggregateInput
  }

  export type LeaveBalanceScalarWhereWithAggregatesInput = {
    AND?: LeaveBalanceScalarWhereWithAggregatesInput | LeaveBalanceScalarWhereWithAggregatesInput[]
    OR?: LeaveBalanceScalarWhereWithAggregatesInput[]
    NOT?: LeaveBalanceScalarWhereWithAggregatesInput | LeaveBalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveBalance"> | string
    employeeId?: StringWithAggregatesFilter<"LeaveBalance"> | string
    grantedDays?: FloatWithAggregatesFilter<"LeaveBalance"> | number
    usedDays?: FloatWithAggregatesFilter<"LeaveBalance"> | number
    createdAt?: DateTimeWithAggregatesFilter<"LeaveBalance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LeaveBalance"> | Date | string
  }

  export type EmployeeRequestWhereInput = {
    AND?: EmployeeRequestWhereInput | EmployeeRequestWhereInput[]
    OR?: EmployeeRequestWhereInput[]
    NOT?: EmployeeRequestWhereInput | EmployeeRequestWhereInput[]
    id?: StringFilter<"EmployeeRequest"> | string
    title?: StringFilter<"EmployeeRequest"> | string
    comment?: StringNullableFilter<"EmployeeRequest"> | string | null
    type?: EnumRequestTypeFilter<"EmployeeRequest"> | $Enums.RequestType
    status?: EnumRequestStatusFilter<"EmployeeRequest"> | $Enums.RequestStatus
    approvalComment?: StringNullableFilter<"EmployeeRequest"> | string | null
    rejectionReason?: StringNullableFilter<"EmployeeRequest"> | string | null
    userId?: StringNullableFilter<"EmployeeRequest"> | string | null
    employeeId?: StringNullableFilter<"EmployeeRequest"> | string | null
    createdAt?: DateTimeFilter<"EmployeeRequest"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    employee?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    histories?: RequestHistoryListRelationFilter
    attachments?: RequestAttachmentListRelationFilter
  }

  export type EmployeeRequestOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    comment?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    approvalComment?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    employeeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    employee?: EmployeeOrderByWithRelationInput
    histories?: RequestHistoryOrderByRelationAggregateInput
    attachments?: RequestAttachmentOrderByRelationAggregateInput
  }

  export type EmployeeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployeeRequestWhereInput | EmployeeRequestWhereInput[]
    OR?: EmployeeRequestWhereInput[]
    NOT?: EmployeeRequestWhereInput | EmployeeRequestWhereInput[]
    title?: StringFilter<"EmployeeRequest"> | string
    comment?: StringNullableFilter<"EmployeeRequest"> | string | null
    type?: EnumRequestTypeFilter<"EmployeeRequest"> | $Enums.RequestType
    status?: EnumRequestStatusFilter<"EmployeeRequest"> | $Enums.RequestStatus
    approvalComment?: StringNullableFilter<"EmployeeRequest"> | string | null
    rejectionReason?: StringNullableFilter<"EmployeeRequest"> | string | null
    userId?: StringNullableFilter<"EmployeeRequest"> | string | null
    employeeId?: StringNullableFilter<"EmployeeRequest"> | string | null
    createdAt?: DateTimeFilter<"EmployeeRequest"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    employee?: XOR<EmployeeNullableScalarRelationFilter, EmployeeWhereInput> | null
    histories?: RequestHistoryListRelationFilter
    attachments?: RequestAttachmentListRelationFilter
  }, "id">

  export type EmployeeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    comment?: SortOrderInput | SortOrder
    type?: SortOrder
    status?: SortOrder
    approvalComment?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    employeeId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmployeeRequestCountOrderByAggregateInput
    _max?: EmployeeRequestMaxOrderByAggregateInput
    _min?: EmployeeRequestMinOrderByAggregateInput
  }

  export type EmployeeRequestScalarWhereWithAggregatesInput = {
    AND?: EmployeeRequestScalarWhereWithAggregatesInput | EmployeeRequestScalarWhereWithAggregatesInput[]
    OR?: EmployeeRequestScalarWhereWithAggregatesInput[]
    NOT?: EmployeeRequestScalarWhereWithAggregatesInput | EmployeeRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployeeRequest"> | string
    title?: StringWithAggregatesFilter<"EmployeeRequest"> | string
    comment?: StringNullableWithAggregatesFilter<"EmployeeRequest"> | string | null
    type?: EnumRequestTypeWithAggregatesFilter<"EmployeeRequest"> | $Enums.RequestType
    status?: EnumRequestStatusWithAggregatesFilter<"EmployeeRequest"> | $Enums.RequestStatus
    approvalComment?: StringNullableWithAggregatesFilter<"EmployeeRequest"> | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"EmployeeRequest"> | string | null
    userId?: StringNullableWithAggregatesFilter<"EmployeeRequest"> | string | null
    employeeId?: StringNullableWithAggregatesFilter<"EmployeeRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EmployeeRequest"> | Date | string
  }

  export type RequestAttachmentWhereInput = {
    AND?: RequestAttachmentWhereInput | RequestAttachmentWhereInput[]
    OR?: RequestAttachmentWhereInput[]
    NOT?: RequestAttachmentWhereInput | RequestAttachmentWhereInput[]
    id?: StringFilter<"RequestAttachment"> | string
    fileName?: StringFilter<"RequestAttachment"> | string
    filePath?: StringFilter<"RequestAttachment"> | string
    fileSize?: IntNullableFilter<"RequestAttachment"> | number | null
    mimeType?: StringNullableFilter<"RequestAttachment"> | string | null
    requestId?: StringFilter<"RequestAttachment"> | string
    createdAt?: DateTimeFilter<"RequestAttachment"> | Date | string
    request?: XOR<EmployeeRequestScalarRelationFilter, EmployeeRequestWhereInput>
  }

  export type RequestAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
    request?: EmployeeRequestOrderByWithRelationInput
  }

  export type RequestAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RequestAttachmentWhereInput | RequestAttachmentWhereInput[]
    OR?: RequestAttachmentWhereInput[]
    NOT?: RequestAttachmentWhereInput | RequestAttachmentWhereInput[]
    fileName?: StringFilter<"RequestAttachment"> | string
    filePath?: StringFilter<"RequestAttachment"> | string
    fileSize?: IntNullableFilter<"RequestAttachment"> | number | null
    mimeType?: StringNullableFilter<"RequestAttachment"> | string | null
    requestId?: StringFilter<"RequestAttachment"> | string
    createdAt?: DateTimeFilter<"RequestAttachment"> | Date | string
    request?: XOR<EmployeeRequestScalarRelationFilter, EmployeeRequestWhereInput>
  }, "id">

  export type RequestAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
    _count?: RequestAttachmentCountOrderByAggregateInput
    _avg?: RequestAttachmentAvgOrderByAggregateInput
    _max?: RequestAttachmentMaxOrderByAggregateInput
    _min?: RequestAttachmentMinOrderByAggregateInput
    _sum?: RequestAttachmentSumOrderByAggregateInput
  }

  export type RequestAttachmentScalarWhereWithAggregatesInput = {
    AND?: RequestAttachmentScalarWhereWithAggregatesInput | RequestAttachmentScalarWhereWithAggregatesInput[]
    OR?: RequestAttachmentScalarWhereWithAggregatesInput[]
    NOT?: RequestAttachmentScalarWhereWithAggregatesInput | RequestAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestAttachment"> | string
    fileName?: StringWithAggregatesFilter<"RequestAttachment"> | string
    filePath?: StringWithAggregatesFilter<"RequestAttachment"> | string
    fileSize?: IntNullableWithAggregatesFilter<"RequestAttachment"> | number | null
    mimeType?: StringNullableWithAggregatesFilter<"RequestAttachment"> | string | null
    requestId?: StringWithAggregatesFilter<"RequestAttachment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RequestAttachment"> | Date | string
  }

  export type RequestHistoryWhereInput = {
    AND?: RequestHistoryWhereInput | RequestHistoryWhereInput[]
    OR?: RequestHistoryWhereInput[]
    NOT?: RequestHistoryWhereInput | RequestHistoryWhereInput[]
    id?: StringFilter<"RequestHistory"> | string
    action?: EnumRequestHistoryActionFilter<"RequestHistory"> | $Enums.RequestHistoryAction
    comment?: StringNullableFilter<"RequestHistory"> | string | null
    actor?: StringNullableFilter<"RequestHistory"> | string | null
    requestId?: StringFilter<"RequestHistory"> | string
    createdAt?: DateTimeFilter<"RequestHistory"> | Date | string
    request?: XOR<EmployeeRequestScalarRelationFilter, EmployeeRequestWhereInput>
  }

  export type RequestHistoryOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    comment?: SortOrderInput | SortOrder
    actor?: SortOrderInput | SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
    request?: EmployeeRequestOrderByWithRelationInput
  }

  export type RequestHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RequestHistoryWhereInput | RequestHistoryWhereInput[]
    OR?: RequestHistoryWhereInput[]
    NOT?: RequestHistoryWhereInput | RequestHistoryWhereInput[]
    action?: EnumRequestHistoryActionFilter<"RequestHistory"> | $Enums.RequestHistoryAction
    comment?: StringNullableFilter<"RequestHistory"> | string | null
    actor?: StringNullableFilter<"RequestHistory"> | string | null
    requestId?: StringFilter<"RequestHistory"> | string
    createdAt?: DateTimeFilter<"RequestHistory"> | Date | string
    request?: XOR<EmployeeRequestScalarRelationFilter, EmployeeRequestWhereInput>
  }, "id">

  export type RequestHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    comment?: SortOrderInput | SortOrder
    actor?: SortOrderInput | SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
    _count?: RequestHistoryCountOrderByAggregateInput
    _max?: RequestHistoryMaxOrderByAggregateInput
    _min?: RequestHistoryMinOrderByAggregateInput
  }

  export type RequestHistoryScalarWhereWithAggregatesInput = {
    AND?: RequestHistoryScalarWhereWithAggregatesInput | RequestHistoryScalarWhereWithAggregatesInput[]
    OR?: RequestHistoryScalarWhereWithAggregatesInput[]
    NOT?: RequestHistoryScalarWhereWithAggregatesInput | RequestHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestHistory"> | string
    action?: EnumRequestHistoryActionWithAggregatesFilter<"RequestHistory"> | $Enums.RequestHistoryAction
    comment?: StringNullableWithAggregatesFilter<"RequestHistory"> | string | null
    actor?: StringNullableWithAggregatesFilter<"RequestHistory"> | string | null
    requestId?: StringWithAggregatesFilter<"RequestHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RequestHistory"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    userName?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    targetType?: StringFilter<"AuditLog"> | string
    targetId?: StringNullableFilter<"AuditLog"> | string | null
    description?: StringNullableFilter<"AuditLog"> | string | null
    beforeData?: JsonNullableFilter<"AuditLog">
    afterData?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    userName?: SortOrderInput | SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    beforeData?: SortOrderInput | SortOrder
    afterData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    userName?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    targetType?: StringFilter<"AuditLog"> | string
    targetId?: StringNullableFilter<"AuditLog"> | string | null
    description?: StringNullableFilter<"AuditLog"> | string | null
    beforeData?: JsonNullableFilter<"AuditLog">
    afterData?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    userName?: SortOrderInput | SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    beforeData?: SortOrderInput | SortOrder
    afterData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userName?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    targetType?: StringWithAggregatesFilter<"AuditLog"> | string
    targetId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    description?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    beforeData?: JsonNullableWithAggregatesFilter<"AuditLog">
    afterData?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    requests?: EmployeeRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
    requests?: EmployeeRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: EmployeeRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: EmployeeRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutEmployeesInput
    requests?: EmployeeRequestCreateNestedManyWithoutEmployeeInput
    employeeMyNumber?: EmployeeMyNumberCreateNestedOneWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    departmentId?: string | null
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    requests?: EmployeeRequestUncheckedCreateNestedManyWithoutEmployeeInput
    employeeMyNumber?: EmployeeMyNumberUncheckedCreateNestedOneWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryUncheckedCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutEmployeesNestedInput
    requests?: EmployeeRequestUpdateManyWithoutEmployeeNestedInput
    employeeMyNumber?: EmployeeMyNumberUpdateOneWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: EmployeeRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    employeeMyNumber?: EmployeeMyNumberUncheckedUpdateOneWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUncheckedUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    departmentId?: string | null
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeMyNumberCreateInput = {
    id?: string
    encryptedNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutEmployeeMyNumberInput
  }

  export type EmployeeMyNumberUncheckedCreateInput = {
    id?: string
    employeeId: string
    encryptedNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeMyNumberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    encryptedNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutEmployeeMyNumberNestedInput
  }

  export type EmployeeMyNumberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    encryptedNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeMyNumberCreateManyInput = {
    id?: string
    employeeId: string
    encryptedNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeMyNumberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    encryptedNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeMyNumberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    encryptedNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeSalaryCreateInput = {
    id?: string
    baseSalary: number
    allowance?: number
    bonus?: number
    effectiveFrom: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutEmployeeSalaryInput
  }

  export type EmployeeSalaryUncheckedCreateInput = {
    id?: string
    employeeId: string
    baseSalary: number
    allowance?: number
    bonus?: number
    effectiveFrom: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeSalaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseSalary?: IntFieldUpdateOperationsInput | number
    allowance?: IntFieldUpdateOperationsInput | number
    bonus?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutEmployeeSalaryNestedInput
  }

  export type EmployeeSalaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    baseSalary?: IntFieldUpdateOperationsInput | number
    allowance?: IntFieldUpdateOperationsInput | number
    bonus?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeSalaryCreateManyInput = {
    id?: string
    employeeId: string
    baseSalary: number
    allowance?: number
    bonus?: number
    effectiveFrom: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeSalaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseSalary?: IntFieldUpdateOperationsInput | number
    allowance?: IntFieldUpdateOperationsInput | number
    bonus?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeSalaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    baseSalary?: IntFieldUpdateOperationsInput | number
    allowance?: IntFieldUpdateOperationsInput | number
    bonus?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceCreateInput = {
    id?: string
    grantedDays?: number
    usedDays?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutLeaveBalanceInput
  }

  export type LeaveBalanceUncheckedCreateInput = {
    id?: string
    employeeId: string
    grantedDays?: number
    usedDays?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveBalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    grantedDays?: FloatFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutLeaveBalanceNestedInput
  }

  export type LeaveBalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    grantedDays?: FloatFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceCreateManyInput = {
    id?: string
    employeeId: string
    grantedDays?: number
    usedDays?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveBalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    grantedDays?: FloatFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    grantedDays?: FloatFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeRequestCreateInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutRequestsInput
    employee?: EmployeeCreateNestedOneWithoutRequestsInput
    histories?: RequestHistoryCreateNestedManyWithoutRequestInput
    attachments?: RequestAttachmentCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestUncheckedCreateInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    userId?: string | null
    employeeId?: string | null
    createdAt?: Date | string
    histories?: RequestHistoryUncheckedCreateNestedManyWithoutRequestInput
    attachments?: RequestAttachmentUncheckedCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRequestsNestedInput
    employee?: EmployeeUpdateOneWithoutRequestsNestedInput
    histories?: RequestHistoryUpdateManyWithoutRequestNestedInput
    attachments?: RequestAttachmentUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: RequestHistoryUncheckedUpdateManyWithoutRequestNestedInput
    attachments?: RequestAttachmentUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestCreateManyInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    userId?: string | null
    employeeId?: string | null
    createdAt?: Date | string
  }

  export type EmployeeRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestAttachmentCreateInput = {
    id?: string
    fileName: string
    filePath: string
    fileSize?: number | null
    mimeType?: string | null
    createdAt?: Date | string
    request: EmployeeRequestCreateNestedOneWithoutAttachmentsInput
  }

  export type RequestAttachmentUncheckedCreateInput = {
    id?: string
    fileName: string
    filePath: string
    fileSize?: number | null
    mimeType?: string | null
    requestId: string
    createdAt?: Date | string
  }

  export type RequestAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: EmployeeRequestUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type RequestAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestAttachmentCreateManyInput = {
    id?: string
    fileName: string
    filePath: string
    fileSize?: number | null
    mimeType?: string | null
    requestId: string
    createdAt?: Date | string
  }

  export type RequestAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryCreateInput = {
    id?: string
    action: $Enums.RequestHistoryAction
    comment?: string | null
    actor?: string | null
    createdAt?: Date | string
    request: EmployeeRequestCreateNestedOneWithoutHistoriesInput
  }

  export type RequestHistoryUncheckedCreateInput = {
    id?: string
    action: $Enums.RequestHistoryAction
    comment?: string | null
    actor?: string | null
    requestId: string
    createdAt?: Date | string
  }

  export type RequestHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumRequestHistoryActionFieldUpdateOperationsInput | $Enums.RequestHistoryAction
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: EmployeeRequestUpdateOneRequiredWithoutHistoriesNestedInput
  }

  export type RequestHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumRequestHistoryActionFieldUpdateOperationsInput | $Enums.RequestHistoryAction
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryCreateManyInput = {
    id?: string
    action: $Enums.RequestHistoryAction
    comment?: string | null
    actor?: string | null
    requestId: string
    createdAt?: Date | string
  }

  export type RequestHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumRequestHistoryActionFieldUpdateOperationsInput | $Enums.RequestHistoryAction
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumRequestHistoryActionFieldUpdateOperationsInput | $Enums.RequestHistoryAction
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    requestId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    userId?: string | null
    userName?: string | null
    action: string
    targetType: string
    targetId?: string | null
    description?: string | null
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    userName?: string | null
    action: string
    targetType: string
    targetId?: string | null
    description?: string | null
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    userName?: string | null
    action: string
    targetType: string
    targetId?: string | null
    description?: string | null
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    userName?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    beforeData?: NullableJsonNullValueInput | InputJsonValue
    afterData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EmployeeRequestListRelationFilter = {
    every?: EmployeeRequestWhereInput
    some?: EmployeeRequestWhereInput
    none?: EmployeeRequestWhereInput
  }

  export type EmployeeRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumEmploymentTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentType | EnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmploymentTypeNullableFilter<$PrismaModel> | $Enums.EmploymentType | null
  }

  export type EnumEmployeeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusFilter<$PrismaModel> | $Enums.EmployeeStatus
  }

  export type DepartmentNullableScalarRelationFilter = {
    is?: DepartmentWhereInput | null
    isNot?: DepartmentWhereInput | null
  }

  export type EmployeeMyNumberNullableScalarRelationFilter = {
    is?: EmployeeMyNumberWhereInput | null
    isNot?: EmployeeMyNumberWhereInput | null
  }

  export type EmployeeSalaryNullableScalarRelationFilter = {
    is?: EmployeeSalaryWhereInput | null
    isNot?: EmployeeSalaryWhereInput | null
  }

  export type LeaveBalanceNullableScalarRelationFilter = {
    is?: LeaveBalanceWhereInput | null
    isNot?: LeaveBalanceWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    employeeNo?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    lastNameKana?: SortOrder
    firstNameKana?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    email?: SortOrder
    departmentId?: SortOrder
    occupation?: SortOrder
    position?: SortOrder
    hireDate?: SortOrder
    employmentType?: SortOrder
    commutingType?: SortOrder
    status?: SortOrder
    retirementDate?: SortOrder
    healthInsuranceNo?: SortOrder
    employmentInsuranceNo?: SortOrder
    photoPath?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeNo?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    lastNameKana?: SortOrder
    firstNameKana?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    email?: SortOrder
    departmentId?: SortOrder
    occupation?: SortOrder
    position?: SortOrder
    hireDate?: SortOrder
    employmentType?: SortOrder
    commutingType?: SortOrder
    status?: SortOrder
    retirementDate?: SortOrder
    healthInsuranceNo?: SortOrder
    employmentInsuranceNo?: SortOrder
    photoPath?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    employeeNo?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    lastNameKana?: SortOrder
    firstNameKana?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    phoneNumber?: SortOrder
    address?: SortOrder
    email?: SortOrder
    departmentId?: SortOrder
    occupation?: SortOrder
    position?: SortOrder
    hireDate?: SortOrder
    employmentType?: SortOrder
    commutingType?: SortOrder
    status?: SortOrder
    retirementDate?: SortOrder
    healthInsuranceNo?: SortOrder
    employmentInsuranceNo?: SortOrder
    photoPath?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumEmploymentTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentType | EnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmploymentTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.EmploymentType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEmploymentTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumEmploymentTypeNullableFilter<$PrismaModel>
  }

  export type EnumEmployeeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeStatusFilter<$PrismaModel>
    _max?: NestedEnumEmployeeStatusFilter<$PrismaModel>
  }

  export type EmployeeScalarRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type EmployeeMyNumberCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    encryptedNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMyNumberMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    encryptedNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMyNumberMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    encryptedNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EmployeeSalaryCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    baseSalary?: SortOrder
    allowance?: SortOrder
    bonus?: SortOrder
    effectiveFrom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeSalaryAvgOrderByAggregateInput = {
    baseSalary?: SortOrder
    allowance?: SortOrder
    bonus?: SortOrder
  }

  export type EmployeeSalaryMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    baseSalary?: SortOrder
    allowance?: SortOrder
    bonus?: SortOrder
    effectiveFrom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeSalaryMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    baseSalary?: SortOrder
    allowance?: SortOrder
    bonus?: SortOrder
    effectiveFrom?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeSalarySumOrderByAggregateInput = {
    baseSalary?: SortOrder
    allowance?: SortOrder
    bonus?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LeaveBalanceCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    grantedDays?: SortOrder
    usedDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveBalanceAvgOrderByAggregateInput = {
    grantedDays?: SortOrder
    usedDays?: SortOrder
  }

  export type LeaveBalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    grantedDays?: SortOrder
    usedDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveBalanceMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    grantedDays?: SortOrder
    usedDays?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveBalanceSumOrderByAggregateInput = {
    grantedDays?: SortOrder
    usedDays?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumRequestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestType | EnumRequestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestTypeFilter<$PrismaModel> | $Enums.RequestType
  }

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type EmployeeNullableScalarRelationFilter = {
    is?: EmployeeWhereInput | null
    isNot?: EmployeeWhereInput | null
  }

  export type RequestHistoryListRelationFilter = {
    every?: RequestHistoryWhereInput
    some?: RequestHistoryWhereInput
    none?: RequestHistoryWhereInput
  }

  export type RequestAttachmentListRelationFilter = {
    every?: RequestAttachmentWhereInput
    some?: RequestAttachmentWhereInput
    none?: RequestAttachmentWhereInput
  }

  export type RequestHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RequestAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    comment?: SortOrder
    type?: SortOrder
    status?: SortOrder
    approvalComment?: SortOrder
    rejectionReason?: SortOrder
    userId?: SortOrder
    employeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    comment?: SortOrder
    type?: SortOrder
    status?: SortOrder
    approvalComment?: SortOrder
    rejectionReason?: SortOrder
    userId?: SortOrder
    employeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployeeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    comment?: SortOrder
    type?: SortOrder
    status?: SortOrder
    approvalComment?: SortOrder
    rejectionReason?: SortOrder
    userId?: SortOrder
    employeeId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumRequestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestType | EnumRequestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestTypeWithAggregatesFilter<$PrismaModel> | $Enums.RequestType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestTypeFilter<$PrismaModel>
    _max?: NestedEnumRequestTypeFilter<$PrismaModel>
  }

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EmployeeRequestScalarRelationFilter = {
    is?: EmployeeRequestWhereInput
    isNot?: EmployeeRequestWhereInput
  }

  export type RequestAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestAttachmentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type RequestAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestAttachmentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumRequestHistoryActionFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestHistoryAction | EnumRequestHistoryActionFieldRefInput<$PrismaModel>
    in?: $Enums.RequestHistoryAction[] | ListEnumRequestHistoryActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestHistoryAction[] | ListEnumRequestHistoryActionFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestHistoryActionFilter<$PrismaModel> | $Enums.RequestHistoryAction
  }

  export type RequestHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    comment?: SortOrder
    actor?: SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    comment?: SortOrder
    actor?: SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    comment?: SortOrder
    actor?: SortOrder
    requestId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumRequestHistoryActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestHistoryAction | EnumRequestHistoryActionFieldRefInput<$PrismaModel>
    in?: $Enums.RequestHistoryAction[] | ListEnumRequestHistoryActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestHistoryAction[] | ListEnumRequestHistoryActionFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestHistoryActionWithAggregatesFilter<$PrismaModel> | $Enums.RequestHistoryAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestHistoryActionFilter<$PrismaModel>
    _max?: NestedEnumRequestHistoryActionFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    description?: SortOrder
    beforeData?: SortOrder
    afterData?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    action?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EmployeeRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<EmployeeRequestCreateWithoutUserInput, EmployeeRequestUncheckedCreateWithoutUserInput> | EmployeeRequestCreateWithoutUserInput[] | EmployeeRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutUserInput | EmployeeRequestCreateOrConnectWithoutUserInput[]
    createMany?: EmployeeRequestCreateManyUserInputEnvelope
    connect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
  }

  export type EmployeeRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmployeeRequestCreateWithoutUserInput, EmployeeRequestUncheckedCreateWithoutUserInput> | EmployeeRequestCreateWithoutUserInput[] | EmployeeRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutUserInput | EmployeeRequestCreateOrConnectWithoutUserInput[]
    createMany?: EmployeeRequestCreateManyUserInputEnvelope
    connect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmployeeRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmployeeRequestCreateWithoutUserInput, EmployeeRequestUncheckedCreateWithoutUserInput> | EmployeeRequestCreateWithoutUserInput[] | EmployeeRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutUserInput | EmployeeRequestCreateOrConnectWithoutUserInput[]
    upsert?: EmployeeRequestUpsertWithWhereUniqueWithoutUserInput | EmployeeRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmployeeRequestCreateManyUserInputEnvelope
    set?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    disconnect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    delete?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    connect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    update?: EmployeeRequestUpdateWithWhereUniqueWithoutUserInput | EmployeeRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmployeeRequestUpdateManyWithWhereWithoutUserInput | EmployeeRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmployeeRequestScalarWhereInput | EmployeeRequestScalarWhereInput[]
  }

  export type EmployeeRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmployeeRequestCreateWithoutUserInput, EmployeeRequestUncheckedCreateWithoutUserInput> | EmployeeRequestCreateWithoutUserInput[] | EmployeeRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutUserInput | EmployeeRequestCreateOrConnectWithoutUserInput[]
    upsert?: EmployeeRequestUpsertWithWhereUniqueWithoutUserInput | EmployeeRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmployeeRequestCreateManyUserInputEnvelope
    set?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    disconnect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    delete?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    connect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    update?: EmployeeRequestUpdateWithWhereUniqueWithoutUserInput | EmployeeRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmployeeRequestUpdateManyWithWhereWithoutUserInput | EmployeeRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmployeeRequestScalarWhereInput | EmployeeRequestScalarWhereInput[]
  }

  export type EmployeeCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<EmployeeCreateWithoutDepartmentInput, EmployeeUncheckedCreateWithoutDepartmentInput> | EmployeeCreateWithoutDepartmentInput[] | EmployeeUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutDepartmentInput | EmployeeCreateOrConnectWithoutDepartmentInput[]
    createMany?: EmployeeCreateManyDepartmentInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<EmployeeCreateWithoutDepartmentInput, EmployeeUncheckedCreateWithoutDepartmentInput> | EmployeeCreateWithoutDepartmentInput[] | EmployeeUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutDepartmentInput | EmployeeCreateOrConnectWithoutDepartmentInput[]
    createMany?: EmployeeCreateManyDepartmentInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type EmployeeUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<EmployeeCreateWithoutDepartmentInput, EmployeeUncheckedCreateWithoutDepartmentInput> | EmployeeCreateWithoutDepartmentInput[] | EmployeeUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutDepartmentInput | EmployeeCreateOrConnectWithoutDepartmentInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutDepartmentInput | EmployeeUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: EmployeeCreateManyDepartmentInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutDepartmentInput | EmployeeUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutDepartmentInput | EmployeeUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<EmployeeCreateWithoutDepartmentInput, EmployeeUncheckedCreateWithoutDepartmentInput> | EmployeeCreateWithoutDepartmentInput[] | EmployeeUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutDepartmentInput | EmployeeCreateOrConnectWithoutDepartmentInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutDepartmentInput | EmployeeUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: EmployeeCreateManyDepartmentInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutDepartmentInput | EmployeeUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutDepartmentInput | EmployeeUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type DepartmentCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<DepartmentCreateWithoutEmployeesInput, DepartmentUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutEmployeesInput
    connect?: DepartmentWhereUniqueInput
  }

  export type EmployeeRequestCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeRequestCreateWithoutEmployeeInput, EmployeeRequestUncheckedCreateWithoutEmployeeInput> | EmployeeRequestCreateWithoutEmployeeInput[] | EmployeeRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutEmployeeInput | EmployeeRequestCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeRequestCreateManyEmployeeInputEnvelope
    connect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
  }

  export type EmployeeMyNumberCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmployeeMyNumberCreateWithoutEmployeeInput, EmployeeMyNumberUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeMyNumberCreateOrConnectWithoutEmployeeInput
    connect?: EmployeeMyNumberWhereUniqueInput
  }

  export type EmployeeSalaryCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmployeeSalaryCreateWithoutEmployeeInput, EmployeeSalaryUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeSalaryCreateOrConnectWithoutEmployeeInput
    connect?: EmployeeSalaryWhereUniqueInput
  }

  export type LeaveBalanceCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<LeaveBalanceCreateWithoutEmployeeInput, LeaveBalanceUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutEmployeeInput
    connect?: LeaveBalanceWhereUniqueInput
  }

  export type EmployeeRequestUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<EmployeeRequestCreateWithoutEmployeeInput, EmployeeRequestUncheckedCreateWithoutEmployeeInput> | EmployeeRequestCreateWithoutEmployeeInput[] | EmployeeRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutEmployeeInput | EmployeeRequestCreateOrConnectWithoutEmployeeInput[]
    createMany?: EmployeeRequestCreateManyEmployeeInputEnvelope
    connect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
  }

  export type EmployeeMyNumberUncheckedCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmployeeMyNumberCreateWithoutEmployeeInput, EmployeeMyNumberUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeMyNumberCreateOrConnectWithoutEmployeeInput
    connect?: EmployeeMyNumberWhereUniqueInput
  }

  export type EmployeeSalaryUncheckedCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<EmployeeSalaryCreateWithoutEmployeeInput, EmployeeSalaryUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeSalaryCreateOrConnectWithoutEmployeeInput
    connect?: EmployeeSalaryWhereUniqueInput
  }

  export type LeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<LeaveBalanceCreateWithoutEmployeeInput, LeaveBalanceUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutEmployeeInput
    connect?: LeaveBalanceWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumEmploymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.EmploymentType | null
  }

  export type EnumEmployeeStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmployeeStatus
  }

  export type DepartmentUpdateOneWithoutEmployeesNestedInput = {
    create?: XOR<DepartmentCreateWithoutEmployeesInput, DepartmentUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutEmployeesInput
    upsert?: DepartmentUpsertWithoutEmployeesInput
    disconnect?: DepartmentWhereInput | boolean
    delete?: DepartmentWhereInput | boolean
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutEmployeesInput, DepartmentUpdateWithoutEmployeesInput>, DepartmentUncheckedUpdateWithoutEmployeesInput>
  }

  export type EmployeeRequestUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeRequestCreateWithoutEmployeeInput, EmployeeRequestUncheckedCreateWithoutEmployeeInput> | EmployeeRequestCreateWithoutEmployeeInput[] | EmployeeRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutEmployeeInput | EmployeeRequestCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeRequestUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeRequestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeRequestCreateManyEmployeeInputEnvelope
    set?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    disconnect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    delete?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    connect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    update?: EmployeeRequestUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeRequestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeRequestUpdateManyWithWhereWithoutEmployeeInput | EmployeeRequestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeRequestScalarWhereInput | EmployeeRequestScalarWhereInput[]
  }

  export type EmployeeMyNumberUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeMyNumberCreateWithoutEmployeeInput, EmployeeMyNumberUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeMyNumberCreateOrConnectWithoutEmployeeInput
    upsert?: EmployeeMyNumberUpsertWithoutEmployeeInput
    disconnect?: EmployeeMyNumberWhereInput | boolean
    delete?: EmployeeMyNumberWhereInput | boolean
    connect?: EmployeeMyNumberWhereUniqueInput
    update?: XOR<XOR<EmployeeMyNumberUpdateToOneWithWhereWithoutEmployeeInput, EmployeeMyNumberUpdateWithoutEmployeeInput>, EmployeeMyNumberUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeSalaryUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeSalaryCreateWithoutEmployeeInput, EmployeeSalaryUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeSalaryCreateOrConnectWithoutEmployeeInput
    upsert?: EmployeeSalaryUpsertWithoutEmployeeInput
    disconnect?: EmployeeSalaryWhereInput | boolean
    delete?: EmployeeSalaryWhereInput | boolean
    connect?: EmployeeSalaryWhereUniqueInput
    update?: XOR<XOR<EmployeeSalaryUpdateToOneWithWhereWithoutEmployeeInput, EmployeeSalaryUpdateWithoutEmployeeInput>, EmployeeSalaryUncheckedUpdateWithoutEmployeeInput>
  }

  export type LeaveBalanceUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<LeaveBalanceCreateWithoutEmployeeInput, LeaveBalanceUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutEmployeeInput
    upsert?: LeaveBalanceUpsertWithoutEmployeeInput
    disconnect?: LeaveBalanceWhereInput | boolean
    delete?: LeaveBalanceWhereInput | boolean
    connect?: LeaveBalanceWhereUniqueInput
    update?: XOR<XOR<LeaveBalanceUpdateToOneWithWhereWithoutEmployeeInput, LeaveBalanceUpdateWithoutEmployeeInput>, LeaveBalanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeRequestUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeRequestCreateWithoutEmployeeInput, EmployeeRequestUncheckedCreateWithoutEmployeeInput> | EmployeeRequestCreateWithoutEmployeeInput[] | EmployeeRequestUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutEmployeeInput | EmployeeRequestCreateOrConnectWithoutEmployeeInput[]
    upsert?: EmployeeRequestUpsertWithWhereUniqueWithoutEmployeeInput | EmployeeRequestUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: EmployeeRequestCreateManyEmployeeInputEnvelope
    set?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    disconnect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    delete?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    connect?: EmployeeRequestWhereUniqueInput | EmployeeRequestWhereUniqueInput[]
    update?: EmployeeRequestUpdateWithWhereUniqueWithoutEmployeeInput | EmployeeRequestUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: EmployeeRequestUpdateManyWithWhereWithoutEmployeeInput | EmployeeRequestUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: EmployeeRequestScalarWhereInput | EmployeeRequestScalarWhereInput[]
  }

  export type EmployeeMyNumberUncheckedUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeMyNumberCreateWithoutEmployeeInput, EmployeeMyNumberUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeMyNumberCreateOrConnectWithoutEmployeeInput
    upsert?: EmployeeMyNumberUpsertWithoutEmployeeInput
    disconnect?: EmployeeMyNumberWhereInput | boolean
    delete?: EmployeeMyNumberWhereInput | boolean
    connect?: EmployeeMyNumberWhereUniqueInput
    update?: XOR<XOR<EmployeeMyNumberUpdateToOneWithWhereWithoutEmployeeInput, EmployeeMyNumberUpdateWithoutEmployeeInput>, EmployeeMyNumberUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeSalaryUncheckedUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<EmployeeSalaryCreateWithoutEmployeeInput, EmployeeSalaryUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: EmployeeSalaryCreateOrConnectWithoutEmployeeInput
    upsert?: EmployeeSalaryUpsertWithoutEmployeeInput
    disconnect?: EmployeeSalaryWhereInput | boolean
    delete?: EmployeeSalaryWhereInput | boolean
    connect?: EmployeeSalaryWhereUniqueInput
    update?: XOR<XOR<EmployeeSalaryUpdateToOneWithWhereWithoutEmployeeInput, EmployeeSalaryUpdateWithoutEmployeeInput>, EmployeeSalaryUncheckedUpdateWithoutEmployeeInput>
  }

  export type LeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<LeaveBalanceCreateWithoutEmployeeInput, LeaveBalanceUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutEmployeeInput
    upsert?: LeaveBalanceUpsertWithoutEmployeeInput
    disconnect?: LeaveBalanceWhereInput | boolean
    delete?: LeaveBalanceWhereInput | boolean
    connect?: LeaveBalanceWhereUniqueInput
    update?: XOR<XOR<LeaveBalanceUpdateToOneWithWhereWithoutEmployeeInput, LeaveBalanceUpdateWithoutEmployeeInput>, LeaveBalanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeCreateNestedOneWithoutEmployeeMyNumberInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeMyNumberInput, EmployeeUncheckedCreateWithoutEmployeeMyNumberInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeMyNumberInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutEmployeeMyNumberNestedInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeMyNumberInput, EmployeeUncheckedCreateWithoutEmployeeMyNumberInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeMyNumberInput
    upsert?: EmployeeUpsertWithoutEmployeeMyNumberInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutEmployeeMyNumberInput, EmployeeUpdateWithoutEmployeeMyNumberInput>, EmployeeUncheckedUpdateWithoutEmployeeMyNumberInput>
  }

  export type EmployeeCreateNestedOneWithoutEmployeeSalaryInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeSalaryInput, EmployeeUncheckedCreateWithoutEmployeeSalaryInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeSalaryInput
    connect?: EmployeeWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUpdateOneRequiredWithoutEmployeeSalaryNestedInput = {
    create?: XOR<EmployeeCreateWithoutEmployeeSalaryInput, EmployeeUncheckedCreateWithoutEmployeeSalaryInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutEmployeeSalaryInput
    upsert?: EmployeeUpsertWithoutEmployeeSalaryInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutEmployeeSalaryInput, EmployeeUpdateWithoutEmployeeSalaryInput>, EmployeeUncheckedUpdateWithoutEmployeeSalaryInput>
  }

  export type EmployeeCreateNestedOneWithoutLeaveBalanceInput = {
    create?: XOR<EmployeeCreateWithoutLeaveBalanceInput, EmployeeUncheckedCreateWithoutLeaveBalanceInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeaveBalanceInput
    connect?: EmployeeWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUpdateOneRequiredWithoutLeaveBalanceNestedInput = {
    create?: XOR<EmployeeCreateWithoutLeaveBalanceInput, EmployeeUncheckedCreateWithoutLeaveBalanceInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutLeaveBalanceInput
    upsert?: EmployeeUpsertWithoutLeaveBalanceInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutLeaveBalanceInput, EmployeeUpdateWithoutLeaveBalanceInput>, EmployeeUncheckedUpdateWithoutLeaveBalanceInput>
  }

  export type UserCreateNestedOneWithoutRequestsInput = {
    create?: XOR<UserCreateWithoutRequestsInput, UserUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutRequestsInput = {
    create?: XOR<EmployeeCreateWithoutRequestsInput, EmployeeUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRequestsInput
    connect?: EmployeeWhereUniqueInput
  }

  export type RequestHistoryCreateNestedManyWithoutRequestInput = {
    create?: XOR<RequestHistoryCreateWithoutRequestInput, RequestHistoryUncheckedCreateWithoutRequestInput> | RequestHistoryCreateWithoutRequestInput[] | RequestHistoryUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestHistoryCreateOrConnectWithoutRequestInput | RequestHistoryCreateOrConnectWithoutRequestInput[]
    createMany?: RequestHistoryCreateManyRequestInputEnvelope
    connect?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
  }

  export type RequestAttachmentCreateNestedManyWithoutRequestInput = {
    create?: XOR<RequestAttachmentCreateWithoutRequestInput, RequestAttachmentUncheckedCreateWithoutRequestInput> | RequestAttachmentCreateWithoutRequestInput[] | RequestAttachmentUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestAttachmentCreateOrConnectWithoutRequestInput | RequestAttachmentCreateOrConnectWithoutRequestInput[]
    createMany?: RequestAttachmentCreateManyRequestInputEnvelope
    connect?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
  }

  export type RequestHistoryUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<RequestHistoryCreateWithoutRequestInput, RequestHistoryUncheckedCreateWithoutRequestInput> | RequestHistoryCreateWithoutRequestInput[] | RequestHistoryUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestHistoryCreateOrConnectWithoutRequestInput | RequestHistoryCreateOrConnectWithoutRequestInput[]
    createMany?: RequestHistoryCreateManyRequestInputEnvelope
    connect?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
  }

  export type RequestAttachmentUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<RequestAttachmentCreateWithoutRequestInput, RequestAttachmentUncheckedCreateWithoutRequestInput> | RequestAttachmentCreateWithoutRequestInput[] | RequestAttachmentUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestAttachmentCreateOrConnectWithoutRequestInput | RequestAttachmentCreateOrConnectWithoutRequestInput[]
    createMany?: RequestAttachmentCreateManyRequestInputEnvelope
    connect?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
  }

  export type EnumRequestTypeFieldUpdateOperationsInput = {
    set?: $Enums.RequestType
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type UserUpdateOneWithoutRequestsNestedInput = {
    create?: XOR<UserCreateWithoutRequestsInput, UserUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRequestsInput
    upsert?: UserUpsertWithoutRequestsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRequestsInput, UserUpdateWithoutRequestsInput>, UserUncheckedUpdateWithoutRequestsInput>
  }

  export type EmployeeUpdateOneWithoutRequestsNestedInput = {
    create?: XOR<EmployeeCreateWithoutRequestsInput, EmployeeUncheckedCreateWithoutRequestsInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRequestsInput
    upsert?: EmployeeUpsertWithoutRequestsInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutRequestsInput, EmployeeUpdateWithoutRequestsInput>, EmployeeUncheckedUpdateWithoutRequestsInput>
  }

  export type RequestHistoryUpdateManyWithoutRequestNestedInput = {
    create?: XOR<RequestHistoryCreateWithoutRequestInput, RequestHistoryUncheckedCreateWithoutRequestInput> | RequestHistoryCreateWithoutRequestInput[] | RequestHistoryUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestHistoryCreateOrConnectWithoutRequestInput | RequestHistoryCreateOrConnectWithoutRequestInput[]
    upsert?: RequestHistoryUpsertWithWhereUniqueWithoutRequestInput | RequestHistoryUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: RequestHistoryCreateManyRequestInputEnvelope
    set?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
    disconnect?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
    delete?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
    connect?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
    update?: RequestHistoryUpdateWithWhereUniqueWithoutRequestInput | RequestHistoryUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: RequestHistoryUpdateManyWithWhereWithoutRequestInput | RequestHistoryUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: RequestHistoryScalarWhereInput | RequestHistoryScalarWhereInput[]
  }

  export type RequestAttachmentUpdateManyWithoutRequestNestedInput = {
    create?: XOR<RequestAttachmentCreateWithoutRequestInput, RequestAttachmentUncheckedCreateWithoutRequestInput> | RequestAttachmentCreateWithoutRequestInput[] | RequestAttachmentUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestAttachmentCreateOrConnectWithoutRequestInput | RequestAttachmentCreateOrConnectWithoutRequestInput[]
    upsert?: RequestAttachmentUpsertWithWhereUniqueWithoutRequestInput | RequestAttachmentUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: RequestAttachmentCreateManyRequestInputEnvelope
    set?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
    disconnect?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
    delete?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
    connect?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
    update?: RequestAttachmentUpdateWithWhereUniqueWithoutRequestInput | RequestAttachmentUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: RequestAttachmentUpdateManyWithWhereWithoutRequestInput | RequestAttachmentUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: RequestAttachmentScalarWhereInput | RequestAttachmentScalarWhereInput[]
  }

  export type RequestHistoryUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<RequestHistoryCreateWithoutRequestInput, RequestHistoryUncheckedCreateWithoutRequestInput> | RequestHistoryCreateWithoutRequestInput[] | RequestHistoryUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestHistoryCreateOrConnectWithoutRequestInput | RequestHistoryCreateOrConnectWithoutRequestInput[]
    upsert?: RequestHistoryUpsertWithWhereUniqueWithoutRequestInput | RequestHistoryUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: RequestHistoryCreateManyRequestInputEnvelope
    set?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
    disconnect?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
    delete?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
    connect?: RequestHistoryWhereUniqueInput | RequestHistoryWhereUniqueInput[]
    update?: RequestHistoryUpdateWithWhereUniqueWithoutRequestInput | RequestHistoryUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: RequestHistoryUpdateManyWithWhereWithoutRequestInput | RequestHistoryUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: RequestHistoryScalarWhereInput | RequestHistoryScalarWhereInput[]
  }

  export type RequestAttachmentUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<RequestAttachmentCreateWithoutRequestInput, RequestAttachmentUncheckedCreateWithoutRequestInput> | RequestAttachmentCreateWithoutRequestInput[] | RequestAttachmentUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestAttachmentCreateOrConnectWithoutRequestInput | RequestAttachmentCreateOrConnectWithoutRequestInput[]
    upsert?: RequestAttachmentUpsertWithWhereUniqueWithoutRequestInput | RequestAttachmentUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: RequestAttachmentCreateManyRequestInputEnvelope
    set?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
    disconnect?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
    delete?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
    connect?: RequestAttachmentWhereUniqueInput | RequestAttachmentWhereUniqueInput[]
    update?: RequestAttachmentUpdateWithWhereUniqueWithoutRequestInput | RequestAttachmentUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: RequestAttachmentUpdateManyWithWhereWithoutRequestInput | RequestAttachmentUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: RequestAttachmentScalarWhereInput | RequestAttachmentScalarWhereInput[]
  }

  export type EmployeeRequestCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<EmployeeRequestCreateWithoutAttachmentsInput, EmployeeRequestUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutAttachmentsInput
    connect?: EmployeeRequestWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeRequestUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<EmployeeRequestCreateWithoutAttachmentsInput, EmployeeRequestUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutAttachmentsInput
    upsert?: EmployeeRequestUpsertWithoutAttachmentsInput
    connect?: EmployeeRequestWhereUniqueInput
    update?: XOR<XOR<EmployeeRequestUpdateToOneWithWhereWithoutAttachmentsInput, EmployeeRequestUpdateWithoutAttachmentsInput>, EmployeeRequestUncheckedUpdateWithoutAttachmentsInput>
  }

  export type EmployeeRequestCreateNestedOneWithoutHistoriesInput = {
    create?: XOR<EmployeeRequestCreateWithoutHistoriesInput, EmployeeRequestUncheckedCreateWithoutHistoriesInput>
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutHistoriesInput
    connect?: EmployeeRequestWhereUniqueInput
  }

  export type EnumRequestHistoryActionFieldUpdateOperationsInput = {
    set?: $Enums.RequestHistoryAction
  }

  export type EmployeeRequestUpdateOneRequiredWithoutHistoriesNestedInput = {
    create?: XOR<EmployeeRequestCreateWithoutHistoriesInput, EmployeeRequestUncheckedCreateWithoutHistoriesInput>
    connectOrCreate?: EmployeeRequestCreateOrConnectWithoutHistoriesInput
    upsert?: EmployeeRequestUpsertWithoutHistoriesInput
    connect?: EmployeeRequestWhereUniqueInput
    update?: XOR<XOR<EmployeeRequestUpdateToOneWithWhereWithoutHistoriesInput, EmployeeRequestUpdateWithoutHistoriesInput>, EmployeeRequestUncheckedUpdateWithoutHistoriesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumGenderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableFilter<$PrismaModel> | $Enums.Gender | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumEmploymentTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentType | EnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmploymentTypeNullableFilter<$PrismaModel> | $Enums.EmploymentType | null
  }

  export type NestedEnumEmployeeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusFilter<$PrismaModel> | $Enums.EmployeeStatus
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel> | null
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderNullableWithAggregatesFilter<$PrismaModel> | $Enums.Gender | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumEmploymentTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentType | EnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmploymentType[] | ListEnumEmploymentTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmploymentTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.EmploymentType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEmploymentTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumEmploymentTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeStatus | EnumEmployeeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeStatus[] | ListEnumEmployeeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeStatusFilter<$PrismaModel>
    _max?: NestedEnumEmployeeStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumRequestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestType | EnumRequestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestTypeFilter<$PrismaModel> | $Enums.RequestType
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type NestedEnumRequestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestType | EnumRequestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestType[] | ListEnumRequestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestTypeWithAggregatesFilter<$PrismaModel> | $Enums.RequestType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestTypeFilter<$PrismaModel>
    _max?: NestedEnumRequestTypeFilter<$PrismaModel>
  }

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRequestHistoryActionFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestHistoryAction | EnumRequestHistoryActionFieldRefInput<$PrismaModel>
    in?: $Enums.RequestHistoryAction[] | ListEnumRequestHistoryActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestHistoryAction[] | ListEnumRequestHistoryActionFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestHistoryActionFilter<$PrismaModel> | $Enums.RequestHistoryAction
  }

  export type NestedEnumRequestHistoryActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestHistoryAction | EnumRequestHistoryActionFieldRefInput<$PrismaModel>
    in?: $Enums.RequestHistoryAction[] | ListEnumRequestHistoryActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestHistoryAction[] | ListEnumRequestHistoryActionFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestHistoryActionWithAggregatesFilter<$PrismaModel> | $Enums.RequestHistoryAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestHistoryActionFilter<$PrismaModel>
    _max?: NestedEnumRequestHistoryActionFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EmployeeRequestCreateWithoutUserInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    employee?: EmployeeCreateNestedOneWithoutRequestsInput
    histories?: RequestHistoryCreateNestedManyWithoutRequestInput
    attachments?: RequestAttachmentCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    employeeId?: string | null
    createdAt?: Date | string
    histories?: RequestHistoryUncheckedCreateNestedManyWithoutRequestInput
    attachments?: RequestAttachmentUncheckedCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestCreateOrConnectWithoutUserInput = {
    where: EmployeeRequestWhereUniqueInput
    create: XOR<EmployeeRequestCreateWithoutUserInput, EmployeeRequestUncheckedCreateWithoutUserInput>
  }

  export type EmployeeRequestCreateManyUserInputEnvelope = {
    data: EmployeeRequestCreateManyUserInput | EmployeeRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: EmployeeRequestWhereUniqueInput
    update: XOR<EmployeeRequestUpdateWithoutUserInput, EmployeeRequestUncheckedUpdateWithoutUserInput>
    create: XOR<EmployeeRequestCreateWithoutUserInput, EmployeeRequestUncheckedCreateWithoutUserInput>
  }

  export type EmployeeRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: EmployeeRequestWhereUniqueInput
    data: XOR<EmployeeRequestUpdateWithoutUserInput, EmployeeRequestUncheckedUpdateWithoutUserInput>
  }

  export type EmployeeRequestUpdateManyWithWhereWithoutUserInput = {
    where: EmployeeRequestScalarWhereInput
    data: XOR<EmployeeRequestUpdateManyMutationInput, EmployeeRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type EmployeeRequestScalarWhereInput = {
    AND?: EmployeeRequestScalarWhereInput | EmployeeRequestScalarWhereInput[]
    OR?: EmployeeRequestScalarWhereInput[]
    NOT?: EmployeeRequestScalarWhereInput | EmployeeRequestScalarWhereInput[]
    id?: StringFilter<"EmployeeRequest"> | string
    title?: StringFilter<"EmployeeRequest"> | string
    comment?: StringNullableFilter<"EmployeeRequest"> | string | null
    type?: EnumRequestTypeFilter<"EmployeeRequest"> | $Enums.RequestType
    status?: EnumRequestStatusFilter<"EmployeeRequest"> | $Enums.RequestStatus
    approvalComment?: StringNullableFilter<"EmployeeRequest"> | string | null
    rejectionReason?: StringNullableFilter<"EmployeeRequest"> | string | null
    userId?: StringNullableFilter<"EmployeeRequest"> | string | null
    employeeId?: StringNullableFilter<"EmployeeRequest"> | string | null
    createdAt?: DateTimeFilter<"EmployeeRequest"> | Date | string
  }

  export type EmployeeCreateWithoutDepartmentInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    requests?: EmployeeRequestCreateNestedManyWithoutEmployeeInput
    employeeMyNumber?: EmployeeMyNumberCreateNestedOneWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutDepartmentInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    requests?: EmployeeRequestUncheckedCreateNestedManyWithoutEmployeeInput
    employeeMyNumber?: EmployeeMyNumberUncheckedCreateNestedOneWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryUncheckedCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutDepartmentInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutDepartmentInput, EmployeeUncheckedCreateWithoutDepartmentInput>
  }

  export type EmployeeCreateManyDepartmentInputEnvelope = {
    data: EmployeeCreateManyDepartmentInput | EmployeeCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutDepartmentInput, EmployeeUncheckedUpdateWithoutDepartmentInput>
    create: XOR<EmployeeCreateWithoutDepartmentInput, EmployeeUncheckedCreateWithoutDepartmentInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutDepartmentInput, EmployeeUncheckedUpdateWithoutDepartmentInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutDepartmentInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    OR?: EmployeeScalarWhereInput[]
    NOT?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    id?: StringFilter<"Employee"> | string
    employeeNo?: StringFilter<"Employee"> | string
    lastName?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastNameKana?: StringNullableFilter<"Employee"> | string | null
    firstNameKana?: StringNullableFilter<"Employee"> | string | null
    gender?: EnumGenderNullableFilter<"Employee"> | $Enums.Gender | null
    birthDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    phoneNumber?: StringNullableFilter<"Employee"> | string | null
    address?: StringNullableFilter<"Employee"> | string | null
    email?: StringFilter<"Employee"> | string
    departmentId?: StringNullableFilter<"Employee"> | string | null
    occupation?: StringNullableFilter<"Employee"> | string | null
    position?: StringNullableFilter<"Employee"> | string | null
    hireDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    employmentType?: EnumEmploymentTypeNullableFilter<"Employee"> | $Enums.EmploymentType | null
    commutingType?: StringNullableFilter<"Employee"> | string | null
    status?: EnumEmployeeStatusFilter<"Employee"> | $Enums.EmployeeStatus
    retirementDate?: DateTimeNullableFilter<"Employee"> | Date | string | null
    healthInsuranceNo?: StringNullableFilter<"Employee"> | string | null
    employmentInsuranceNo?: StringNullableFilter<"Employee"> | string | null
    photoPath?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
  }

  export type DepartmentCreateWithoutEmployeesInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type DepartmentUncheckedCreateWithoutEmployeesInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type DepartmentCreateOrConnectWithoutEmployeesInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutEmployeesInput, DepartmentUncheckedCreateWithoutEmployeesInput>
  }

  export type EmployeeRequestCreateWithoutEmployeeInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutRequestsInput
    histories?: RequestHistoryCreateNestedManyWithoutRequestInput
    attachments?: RequestAttachmentCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestUncheckedCreateWithoutEmployeeInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    userId?: string | null
    createdAt?: Date | string
    histories?: RequestHistoryUncheckedCreateNestedManyWithoutRequestInput
    attachments?: RequestAttachmentUncheckedCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeRequestWhereUniqueInput
    create: XOR<EmployeeRequestCreateWithoutEmployeeInput, EmployeeRequestUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeRequestCreateManyEmployeeInputEnvelope = {
    data: EmployeeRequestCreateManyEmployeeInput | EmployeeRequestCreateManyEmployeeInput[]
    skipDuplicates?: boolean
  }

  export type EmployeeMyNumberCreateWithoutEmployeeInput = {
    id?: string
    encryptedNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeMyNumberUncheckedCreateWithoutEmployeeInput = {
    id?: string
    encryptedNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeMyNumberCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeMyNumberWhereUniqueInput
    create: XOR<EmployeeMyNumberCreateWithoutEmployeeInput, EmployeeMyNumberUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeSalaryCreateWithoutEmployeeInput = {
    id?: string
    baseSalary: number
    allowance?: number
    bonus?: number
    effectiveFrom: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeSalaryUncheckedCreateWithoutEmployeeInput = {
    id?: string
    baseSalary: number
    allowance?: number
    bonus?: number
    effectiveFrom: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeSalaryCreateOrConnectWithoutEmployeeInput = {
    where: EmployeeSalaryWhereUniqueInput
    create: XOR<EmployeeSalaryCreateWithoutEmployeeInput, EmployeeSalaryUncheckedCreateWithoutEmployeeInput>
  }

  export type LeaveBalanceCreateWithoutEmployeeInput = {
    id?: string
    grantedDays?: number
    usedDays?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveBalanceUncheckedCreateWithoutEmployeeInput = {
    id?: string
    grantedDays?: number
    usedDays?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveBalanceCreateOrConnectWithoutEmployeeInput = {
    where: LeaveBalanceWhereUniqueInput
    create: XOR<LeaveBalanceCreateWithoutEmployeeInput, LeaveBalanceUncheckedCreateWithoutEmployeeInput>
  }

  export type DepartmentUpsertWithoutEmployeesInput = {
    update: XOR<DepartmentUpdateWithoutEmployeesInput, DepartmentUncheckedUpdateWithoutEmployeesInput>
    create: XOR<DepartmentCreateWithoutEmployeesInput, DepartmentUncheckedCreateWithoutEmployeesInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutEmployeesInput, DepartmentUncheckedUpdateWithoutEmployeesInput>
  }

  export type DepartmentUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeRequestUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeRequestWhereUniqueInput
    update: XOR<EmployeeRequestUpdateWithoutEmployeeInput, EmployeeRequestUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeRequestCreateWithoutEmployeeInput, EmployeeRequestUncheckedCreateWithoutEmployeeInput>
  }

  export type EmployeeRequestUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: EmployeeRequestWhereUniqueInput
    data: XOR<EmployeeRequestUpdateWithoutEmployeeInput, EmployeeRequestUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeRequestUpdateManyWithWhereWithoutEmployeeInput = {
    where: EmployeeRequestScalarWhereInput
    data: XOR<EmployeeRequestUpdateManyMutationInput, EmployeeRequestUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type EmployeeMyNumberUpsertWithoutEmployeeInput = {
    update: XOR<EmployeeMyNumberUpdateWithoutEmployeeInput, EmployeeMyNumberUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeMyNumberCreateWithoutEmployeeInput, EmployeeMyNumberUncheckedCreateWithoutEmployeeInput>
    where?: EmployeeMyNumberWhereInput
  }

  export type EmployeeMyNumberUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: EmployeeMyNumberWhereInput
    data: XOR<EmployeeMyNumberUpdateWithoutEmployeeInput, EmployeeMyNumberUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeMyNumberUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    encryptedNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeMyNumberUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    encryptedNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeSalaryUpsertWithoutEmployeeInput = {
    update: XOR<EmployeeSalaryUpdateWithoutEmployeeInput, EmployeeSalaryUncheckedUpdateWithoutEmployeeInput>
    create: XOR<EmployeeSalaryCreateWithoutEmployeeInput, EmployeeSalaryUncheckedCreateWithoutEmployeeInput>
    where?: EmployeeSalaryWhereInput
  }

  export type EmployeeSalaryUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: EmployeeSalaryWhereInput
    data: XOR<EmployeeSalaryUpdateWithoutEmployeeInput, EmployeeSalaryUncheckedUpdateWithoutEmployeeInput>
  }

  export type EmployeeSalaryUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseSalary?: IntFieldUpdateOperationsInput | number
    allowance?: IntFieldUpdateOperationsInput | number
    bonus?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeSalaryUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    baseSalary?: IntFieldUpdateOperationsInput | number
    allowance?: IntFieldUpdateOperationsInput | number
    bonus?: IntFieldUpdateOperationsInput | number
    effectiveFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUpsertWithoutEmployeeInput = {
    update: XOR<LeaveBalanceUpdateWithoutEmployeeInput, LeaveBalanceUncheckedUpdateWithoutEmployeeInput>
    create: XOR<LeaveBalanceCreateWithoutEmployeeInput, LeaveBalanceUncheckedCreateWithoutEmployeeInput>
    where?: LeaveBalanceWhereInput
  }

  export type LeaveBalanceUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: LeaveBalanceWhereInput
    data: XOR<LeaveBalanceUpdateWithoutEmployeeInput, LeaveBalanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type LeaveBalanceUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    grantedDays?: FloatFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    grantedDays?: FloatFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateWithoutEmployeeMyNumberInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutEmployeesInput
    requests?: EmployeeRequestCreateNestedManyWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmployeeMyNumberInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    departmentId?: string | null
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    requests?: EmployeeRequestUncheckedCreateNestedManyWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryUncheckedCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmployeeMyNumberInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployeeMyNumberInput, EmployeeUncheckedCreateWithoutEmployeeMyNumberInput>
  }

  export type EmployeeUpsertWithoutEmployeeMyNumberInput = {
    update: XOR<EmployeeUpdateWithoutEmployeeMyNumberInput, EmployeeUncheckedUpdateWithoutEmployeeMyNumberInput>
    create: XOR<EmployeeCreateWithoutEmployeeMyNumberInput, EmployeeUncheckedCreateWithoutEmployeeMyNumberInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutEmployeeMyNumberInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutEmployeeMyNumberInput, EmployeeUncheckedUpdateWithoutEmployeeMyNumberInput>
  }

  export type EmployeeUpdateWithoutEmployeeMyNumberInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutEmployeesNestedInput
    requests?: EmployeeRequestUpdateManyWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployeeMyNumberInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: EmployeeRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUncheckedUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutEmployeeSalaryInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutEmployeesInput
    requests?: EmployeeRequestCreateNestedManyWithoutEmployeeInput
    employeeMyNumber?: EmployeeMyNumberCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutEmployeeSalaryInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    departmentId?: string | null
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    requests?: EmployeeRequestUncheckedCreateNestedManyWithoutEmployeeInput
    employeeMyNumber?: EmployeeMyNumberUncheckedCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutEmployeeSalaryInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutEmployeeSalaryInput, EmployeeUncheckedCreateWithoutEmployeeSalaryInput>
  }

  export type EmployeeUpsertWithoutEmployeeSalaryInput = {
    update: XOR<EmployeeUpdateWithoutEmployeeSalaryInput, EmployeeUncheckedUpdateWithoutEmployeeSalaryInput>
    create: XOR<EmployeeCreateWithoutEmployeeSalaryInput, EmployeeUncheckedCreateWithoutEmployeeSalaryInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutEmployeeSalaryInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutEmployeeSalaryInput, EmployeeUncheckedUpdateWithoutEmployeeSalaryInput>
  }

  export type EmployeeUpdateWithoutEmployeeSalaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutEmployeesNestedInput
    requests?: EmployeeRequestUpdateManyWithoutEmployeeNestedInput
    employeeMyNumber?: EmployeeMyNumberUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutEmployeeSalaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: EmployeeRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    employeeMyNumber?: EmployeeMyNumberUncheckedUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutLeaveBalanceInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutEmployeesInput
    requests?: EmployeeRequestCreateNestedManyWithoutEmployeeInput
    employeeMyNumber?: EmployeeMyNumberCreateNestedOneWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutLeaveBalanceInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    departmentId?: string | null
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    requests?: EmployeeRequestUncheckedCreateNestedManyWithoutEmployeeInput
    employeeMyNumber?: EmployeeMyNumberUncheckedCreateNestedOneWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutLeaveBalanceInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutLeaveBalanceInput, EmployeeUncheckedCreateWithoutLeaveBalanceInput>
  }

  export type EmployeeUpsertWithoutLeaveBalanceInput = {
    update: XOR<EmployeeUpdateWithoutLeaveBalanceInput, EmployeeUncheckedUpdateWithoutLeaveBalanceInput>
    create: XOR<EmployeeCreateWithoutLeaveBalanceInput, EmployeeUncheckedCreateWithoutLeaveBalanceInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutLeaveBalanceInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutLeaveBalanceInput, EmployeeUncheckedUpdateWithoutLeaveBalanceInput>
  }

  export type EmployeeUpdateWithoutLeaveBalanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutEmployeesNestedInput
    requests?: EmployeeRequestUpdateManyWithoutEmployeeNestedInput
    employeeMyNumber?: EmployeeMyNumberUpdateOneWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutLeaveBalanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: EmployeeRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    employeeMyNumber?: EmployeeMyNumberUncheckedUpdateOneWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type UserCreateWithoutRequestsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutRequestsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRequestsInput, UserUncheckedCreateWithoutRequestsInput>
  }

  export type EmployeeCreateWithoutRequestsInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutEmployeesInput
    employeeMyNumber?: EmployeeMyNumberCreateNestedOneWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutRequestsInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    departmentId?: string | null
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
    employeeMyNumber?: EmployeeMyNumberUncheckedCreateNestedOneWithoutEmployeeInput
    employeeSalary?: EmployeeSalaryUncheckedCreateNestedOneWithoutEmployeeInput
    leaveBalance?: LeaveBalanceUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutRequestsInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutRequestsInput, EmployeeUncheckedCreateWithoutRequestsInput>
  }

  export type RequestHistoryCreateWithoutRequestInput = {
    id?: string
    action: $Enums.RequestHistoryAction
    comment?: string | null
    actor?: string | null
    createdAt?: Date | string
  }

  export type RequestHistoryUncheckedCreateWithoutRequestInput = {
    id?: string
    action: $Enums.RequestHistoryAction
    comment?: string | null
    actor?: string | null
    createdAt?: Date | string
  }

  export type RequestHistoryCreateOrConnectWithoutRequestInput = {
    where: RequestHistoryWhereUniqueInput
    create: XOR<RequestHistoryCreateWithoutRequestInput, RequestHistoryUncheckedCreateWithoutRequestInput>
  }

  export type RequestHistoryCreateManyRequestInputEnvelope = {
    data: RequestHistoryCreateManyRequestInput | RequestHistoryCreateManyRequestInput[]
    skipDuplicates?: boolean
  }

  export type RequestAttachmentCreateWithoutRequestInput = {
    id?: string
    fileName: string
    filePath: string
    fileSize?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type RequestAttachmentUncheckedCreateWithoutRequestInput = {
    id?: string
    fileName: string
    filePath: string
    fileSize?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type RequestAttachmentCreateOrConnectWithoutRequestInput = {
    where: RequestAttachmentWhereUniqueInput
    create: XOR<RequestAttachmentCreateWithoutRequestInput, RequestAttachmentUncheckedCreateWithoutRequestInput>
  }

  export type RequestAttachmentCreateManyRequestInputEnvelope = {
    data: RequestAttachmentCreateManyRequestInput | RequestAttachmentCreateManyRequestInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRequestsInput = {
    update: XOR<UserUpdateWithoutRequestsInput, UserUncheckedUpdateWithoutRequestsInput>
    create: XOR<UserCreateWithoutRequestsInput, UserUncheckedCreateWithoutRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRequestsInput, UserUncheckedUpdateWithoutRequestsInput>
  }

  export type UserUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUpsertWithoutRequestsInput = {
    update: XOR<EmployeeUpdateWithoutRequestsInput, EmployeeUncheckedUpdateWithoutRequestsInput>
    create: XOR<EmployeeCreateWithoutRequestsInput, EmployeeUncheckedCreateWithoutRequestsInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutRequestsInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutRequestsInput, EmployeeUncheckedUpdateWithoutRequestsInput>
  }

  export type EmployeeUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutEmployeesNestedInput
    employeeMyNumber?: EmployeeMyNumberUpdateOneWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeMyNumber?: EmployeeMyNumberUncheckedUpdateOneWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUncheckedUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type RequestHistoryUpsertWithWhereUniqueWithoutRequestInput = {
    where: RequestHistoryWhereUniqueInput
    update: XOR<RequestHistoryUpdateWithoutRequestInput, RequestHistoryUncheckedUpdateWithoutRequestInput>
    create: XOR<RequestHistoryCreateWithoutRequestInput, RequestHistoryUncheckedCreateWithoutRequestInput>
  }

  export type RequestHistoryUpdateWithWhereUniqueWithoutRequestInput = {
    where: RequestHistoryWhereUniqueInput
    data: XOR<RequestHistoryUpdateWithoutRequestInput, RequestHistoryUncheckedUpdateWithoutRequestInput>
  }

  export type RequestHistoryUpdateManyWithWhereWithoutRequestInput = {
    where: RequestHistoryScalarWhereInput
    data: XOR<RequestHistoryUpdateManyMutationInput, RequestHistoryUncheckedUpdateManyWithoutRequestInput>
  }

  export type RequestHistoryScalarWhereInput = {
    AND?: RequestHistoryScalarWhereInput | RequestHistoryScalarWhereInput[]
    OR?: RequestHistoryScalarWhereInput[]
    NOT?: RequestHistoryScalarWhereInput | RequestHistoryScalarWhereInput[]
    id?: StringFilter<"RequestHistory"> | string
    action?: EnumRequestHistoryActionFilter<"RequestHistory"> | $Enums.RequestHistoryAction
    comment?: StringNullableFilter<"RequestHistory"> | string | null
    actor?: StringNullableFilter<"RequestHistory"> | string | null
    requestId?: StringFilter<"RequestHistory"> | string
    createdAt?: DateTimeFilter<"RequestHistory"> | Date | string
  }

  export type RequestAttachmentUpsertWithWhereUniqueWithoutRequestInput = {
    where: RequestAttachmentWhereUniqueInput
    update: XOR<RequestAttachmentUpdateWithoutRequestInput, RequestAttachmentUncheckedUpdateWithoutRequestInput>
    create: XOR<RequestAttachmentCreateWithoutRequestInput, RequestAttachmentUncheckedCreateWithoutRequestInput>
  }

  export type RequestAttachmentUpdateWithWhereUniqueWithoutRequestInput = {
    where: RequestAttachmentWhereUniqueInput
    data: XOR<RequestAttachmentUpdateWithoutRequestInput, RequestAttachmentUncheckedUpdateWithoutRequestInput>
  }

  export type RequestAttachmentUpdateManyWithWhereWithoutRequestInput = {
    where: RequestAttachmentScalarWhereInput
    data: XOR<RequestAttachmentUpdateManyMutationInput, RequestAttachmentUncheckedUpdateManyWithoutRequestInput>
  }

  export type RequestAttachmentScalarWhereInput = {
    AND?: RequestAttachmentScalarWhereInput | RequestAttachmentScalarWhereInput[]
    OR?: RequestAttachmentScalarWhereInput[]
    NOT?: RequestAttachmentScalarWhereInput | RequestAttachmentScalarWhereInput[]
    id?: StringFilter<"RequestAttachment"> | string
    fileName?: StringFilter<"RequestAttachment"> | string
    filePath?: StringFilter<"RequestAttachment"> | string
    fileSize?: IntNullableFilter<"RequestAttachment"> | number | null
    mimeType?: StringNullableFilter<"RequestAttachment"> | string | null
    requestId?: StringFilter<"RequestAttachment"> | string
    createdAt?: DateTimeFilter<"RequestAttachment"> | Date | string
  }

  export type EmployeeRequestCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutRequestsInput
    employee?: EmployeeCreateNestedOneWithoutRequestsInput
    histories?: RequestHistoryCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    userId?: string | null
    employeeId?: string | null
    createdAt?: Date | string
    histories?: RequestHistoryUncheckedCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestCreateOrConnectWithoutAttachmentsInput = {
    where: EmployeeRequestWhereUniqueInput
    create: XOR<EmployeeRequestCreateWithoutAttachmentsInput, EmployeeRequestUncheckedCreateWithoutAttachmentsInput>
  }

  export type EmployeeRequestUpsertWithoutAttachmentsInput = {
    update: XOR<EmployeeRequestUpdateWithoutAttachmentsInput, EmployeeRequestUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<EmployeeRequestCreateWithoutAttachmentsInput, EmployeeRequestUncheckedCreateWithoutAttachmentsInput>
    where?: EmployeeRequestWhereInput
  }

  export type EmployeeRequestUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: EmployeeRequestWhereInput
    data: XOR<EmployeeRequestUpdateWithoutAttachmentsInput, EmployeeRequestUncheckedUpdateWithoutAttachmentsInput>
  }

  export type EmployeeRequestUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRequestsNestedInput
    employee?: EmployeeUpdateOneWithoutRequestsNestedInput
    histories?: RequestHistoryUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: RequestHistoryUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestCreateWithoutHistoriesInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutRequestsInput
    employee?: EmployeeCreateNestedOneWithoutRequestsInput
    attachments?: RequestAttachmentCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestUncheckedCreateWithoutHistoriesInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    userId?: string | null
    employeeId?: string | null
    createdAt?: Date | string
    attachments?: RequestAttachmentUncheckedCreateNestedManyWithoutRequestInput
  }

  export type EmployeeRequestCreateOrConnectWithoutHistoriesInput = {
    where: EmployeeRequestWhereUniqueInput
    create: XOR<EmployeeRequestCreateWithoutHistoriesInput, EmployeeRequestUncheckedCreateWithoutHistoriesInput>
  }

  export type EmployeeRequestUpsertWithoutHistoriesInput = {
    update: XOR<EmployeeRequestUpdateWithoutHistoriesInput, EmployeeRequestUncheckedUpdateWithoutHistoriesInput>
    create: XOR<EmployeeRequestCreateWithoutHistoriesInput, EmployeeRequestUncheckedCreateWithoutHistoriesInput>
    where?: EmployeeRequestWhereInput
  }

  export type EmployeeRequestUpdateToOneWithWhereWithoutHistoriesInput = {
    where?: EmployeeRequestWhereInput
    data: XOR<EmployeeRequestUpdateWithoutHistoriesInput, EmployeeRequestUncheckedUpdateWithoutHistoriesInput>
  }

  export type EmployeeRequestUpdateWithoutHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRequestsNestedInput
    employee?: EmployeeUpdateOneWithoutRequestsNestedInput
    attachments?: RequestAttachmentUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestUncheckedUpdateWithoutHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: RequestAttachmentUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestCreateManyUserInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    employeeId?: string | null
    createdAt?: Date | string
  }

  export type EmployeeRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneWithoutRequestsNestedInput
    histories?: RequestHistoryUpdateManyWithoutRequestNestedInput
    attachments?: RequestAttachmentUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: RequestHistoryUncheckedUpdateManyWithoutRequestNestedInput
    attachments?: RequestAttachmentUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateManyDepartmentInput = {
    id?: string
    employeeNo: string
    lastName: string
    firstName: string
    lastNameKana?: string | null
    firstNameKana?: string | null
    gender?: $Enums.Gender | null
    birthDate?: Date | string | null
    phoneNumber?: string | null
    address?: string | null
    email: string
    occupation?: string | null
    position?: string | null
    hireDate?: Date | string | null
    employmentType?: $Enums.EmploymentType | null
    commutingType?: string | null
    status?: $Enums.EmployeeStatus
    retirementDate?: Date | string | null
    healthInsuranceNo?: string | null
    employmentInsuranceNo?: string | null
    photoPath?: string | null
    createdAt?: Date | string
  }

  export type EmployeeUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: EmployeeRequestUpdateManyWithoutEmployeeNestedInput
    employeeMyNumber?: EmployeeMyNumberUpdateOneWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requests?: EmployeeRequestUncheckedUpdateManyWithoutEmployeeNestedInput
    employeeMyNumber?: EmployeeMyNumberUncheckedUpdateOneWithoutEmployeeNestedInput
    employeeSalary?: EmployeeSalaryUncheckedUpdateOneWithoutEmployeeNestedInput
    leaveBalance?: LeaveBalanceUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeNo?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    firstNameKana?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableEnumGenderFieldUpdateOperationsInput | $Enums.Gender | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    hireDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentType?: NullableEnumEmploymentTypeFieldUpdateOperationsInput | $Enums.EmploymentType | null
    commutingType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEmployeeStatusFieldUpdateOperationsInput | $Enums.EmployeeStatus
    retirementDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    healthInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    employmentInsuranceNo?: NullableStringFieldUpdateOperationsInput | string | null
    photoPath?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeRequestCreateManyEmployeeInput = {
    id?: string
    title: string
    comment?: string | null
    type: $Enums.RequestType
    status?: $Enums.RequestStatus
    approvalComment?: string | null
    rejectionReason?: string | null
    userId?: string | null
    createdAt?: Date | string
  }

  export type EmployeeRequestUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRequestsNestedInput
    histories?: RequestHistoryUpdateManyWithoutRequestNestedInput
    attachments?: RequestAttachmentUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    histories?: RequestHistoryUncheckedUpdateManyWithoutRequestNestedInput
    attachments?: RequestAttachmentUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type EmployeeRequestUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRequestTypeFieldUpdateOperationsInput | $Enums.RequestType
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryCreateManyRequestInput = {
    id?: string
    action: $Enums.RequestHistoryAction
    comment?: string | null
    actor?: string | null
    createdAt?: Date | string
  }

  export type RequestAttachmentCreateManyRequestInput = {
    id?: string
    fileName: string
    filePath: string
    fileSize?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type RequestHistoryUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumRequestHistoryActionFieldUpdateOperationsInput | $Enums.RequestHistoryAction
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryUncheckedUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumRequestHistoryActionFieldUpdateOperationsInput | $Enums.RequestHistoryAction
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestHistoryUncheckedUpdateManyWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumRequestHistoryActionFieldUpdateOperationsInput | $Enums.RequestHistoryAction
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    actor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestAttachmentUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestAttachmentUncheckedUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestAttachmentUncheckedUpdateManyWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    filePath?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}