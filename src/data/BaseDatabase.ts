import knex from "knex"
import Knex from "knex"
import dotenv from "dotenv"

dotenv.config()

// Outra forma de fazer:
export abstract class BaseDatabase {

   private static connection: Knex | null = null
   
   // Nomes das tabelas que temos no banco
   protected TABLES_NAMES = {
      bands: "LAMA_BANDAS",
      shows: "LAMA_SHOWS",
      users: "LAMA_USUÁRIOS"
   }

   protected getConnection(): Knex {

      if (!BaseDatabase.connection) {

         BaseDatabase.connection = Knex({
            client: "mysql",
            connection: {
               host: process.env.DB_HOST,
               port: 3306,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: process.env.DB_NAME,
            },

         })
      }

      return BaseDatabase.connection
   }

   // Desconectar do banco
   public static async destroyConnection(): Promise<void> {

      if(BaseDatabase.connection) {
         await BaseDatabase.connection.destroy()
         BaseDatabase.connection = null
      }
   }
}



// Jeito que já faziamos:
// export class BaseDatabase {

//    protected static connection: Knex = knex({
//       client: "mysql",
//       connection: {
//          host: process.env.DB_HOST,
//          port: 3306,
//          user: process.env.DB_USER,
//          password: process.env.DB_PASSWORD,
//          database: process.env.DB_NAME,
//       },
//    });
//    static getShowById: any;
// }
