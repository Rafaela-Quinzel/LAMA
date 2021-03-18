import { Request, Response } from "express"
import { BandsBusiness } from "../business/BandsBusiness"
import { BandsInputDTO } from "../business/entities/Bands"
import { Authenticator } from "../business/services/Authenticator"
import { IdGenerator } from "../business/services/IdGenerator"
import { BandsDatabase } from "../data/BandsDataBase"


export class BandsController {

   async createBand(req: Request, res: Response) {

      try {

         const input: BandsInputDTO = {
            name: req.body.name,
            music_genre: req.body.music_genre,
            responsible: req.body.responsible
         }

         const bandsBusiness = new BandsBusiness(
            new BandsDatabase,
            new IdGenerator,
            new Authenticator
         )

         await bandsBusiness.registerBand(input, req.headers.authorization as string)

         const token = req.headers.authorization

         res.status(200).send({ token })

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message })

      } finally {
         await BandsDatabase.destroyConnection()
      }
   }


   public async getBandDetails(req: Request, res: Response) {

      try {

         const input = (req.query.id ?? req.query.name) as string

         const bandsBusiness = new BandsBusiness(
            new BandsDatabase,
            new IdGenerator,
            new Authenticator
         )
         
         const band = await bandsBusiness.getBandDetailsByIdOrName(input)

         res.status(200).send(band)

      } catch (error) {
         res.status(error.statusCode || 400).send(error.message)

      } finally {
         await BandsDatabase.destroyConnection()
      }
   }
}
