import { BaseError } from "./BaseError";


export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(message, 403)
    }
}



// Outra forma de fazer:
// export class UnauthorizedError extends Error {
//     constructor(
//         statusCode: number,
//         message: string
//     ) {
//         super(message)
//     }
// }