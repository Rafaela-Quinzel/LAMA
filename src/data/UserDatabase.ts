import { BaseDatabase } from "./BaseDatabase"
import { User } from "../business/entities/User"
import { CustomError } from "../business/error/CustomError"

export class UserDatabase extends BaseDatabase {

   public async createUser(user: User): Promise<void> {

      try {
         await this.getConnection()
            .insert({
               id: user.getId(),
               email: user.getEmail(),
               name: user.getName(),
               password: user.getPassword(),
               role: user.getRole()
            })
            .into(this.TABLES_NAMES.users)

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred")
      }
   }


   public async getUserByEmail(email: string): Promise<User> {

      try {

         const result = await this.getConnection()
            .select("*")
            .from(this.TABLES_NAMES.users)
            .where({ email })

         return User.toUserModel(result[0])

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred")
      }
   }
}