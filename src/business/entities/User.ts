export class User {
   constructor(
      private id: string,
      private name: string,
      private email: string,
      private password: string,
      private role: UserRole
   ) { }


   public getId(): string {
      return this.id
   }

   public getName(): string {
      return this.name
   }

   public getEmail(): string {
      return this.email
   }

   public getPassword(): string {
      return this.password
   }

   public getRole(): UserRole {
      return this.role
   }

   public setId(id: string) {
      this.id = id
   }

   public setName(name: string) {
      this.name = name
   }

   public setEmail(email: string) {
      this.email = email
   }

   public setPassword(password: string) {
      this.password = password
   }

   public setRole(role: UserRole) {
      this.role = role
   }

   

   static stringToUserRole(input: string): UserRole {
      switch (input) {
         case "NORMAL":
            return UserRole.NORMAL
         case "ADMIN":
            return UserRole.ADMIN
         default:
            console.log("input", input)
            throw new Error("Invalid user role")
      }
   }

   static toUserModel(user: any): User {
      return new User(
         user.id,
         user.name,
         user.email,
         user.password,
         User.stringToUserRole(user.role)
      )
   }
}

export interface UserInputDTO {
   email: string
   password: string
   name: string
   role: string
}

export interface LoginInputDTO {
   email: string
   password: string
}

export enum UserRole {
   NORMAL = "NORMAL",
   ADMIN = "ADMIN"
}

export interface AuthenticationData {
   id: string
   role?: string
}