import { UserInputDTO, LoginInputDTO, User } from "./entities/User"
import { UserDatabase } from "../data/UserDatabase"
import { IdGenerator } from "./services/IdGenerator"
import { HashManager } from "./services/HashManager"
import { Authenticator } from "./services/Authenticator"
import { InvalidInputError } from "./error/InvalidInputError"

export class UserBusiness {

   constructor(
      private userDatabase: UserDatabase,
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private authenticator: Authenticator

   ) { }

   async createUser(user: UserInputDTO) {

      if (!user.name || !user.email || !user.password || !user.role) {
         throw new InvalidInputError("Invalid input to signup")
      }

      if (user.email.indexOf("@") === -1) {
         throw new InvalidInputError("Invalid email format")
      }


      if (user.password && user.password.length < 6) {
         throw new InvalidInputError("The password must contain more than 6 digits")
      }

      const id = this.idGenerator.generate()

      const hashPassword = await this.hashManager.hash(user.password)

      // await this.userDatabase.createUser(
      //    id,
      //    user.email,
      //    user.name,
      //    hashPassword,
      //    user.role
      // ) Isso é o mesmo que o de baixo, só que destruturando o User

      await this.userDatabase.createUser(
         User.toUserModel({
            ...user,
            id: id,
            password: hashPassword
         })
      )

      const accessToken = this.authenticator.generateToken({
         id,
         role: user.role
      })

      return accessToken
   }

   async authUserByEmail(user: LoginInputDTO) {

      if (!user.email || !user.password) {
         throw new InvalidInputError("Invalid input to login")
      }

      if (user.password && user.email.indexOf("@") === -1) {
         throw new InvalidInputError("Invalid email format")
      }

      const userFromDB = await this.userDatabase.getUserByEmail(user.email)

      const hashCompare = await this.hashManager.compare(
         user.password,
         userFromDB.getPassword()
      )

      if (!hashCompare) {
         throw new InvalidInputError("Invalid password")
      }

      const accessToken = this.authenticator.generateToken({
         id: userFromDB.getId(),
         role: userFromDB.getRole()
      })

      return accessToken
   }
}