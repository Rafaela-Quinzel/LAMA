export class CustomError extends Error {
   constructor(
      public readonly statusCode: number,
      message: string
   ) {
      super(message);
   }
}


// Outra forma de fazer:
// export abstract class baseError extends Error {

//    constructor(
//       message: string,
//       public code: number
//    ) {
//       super(message);
//    }
// }
