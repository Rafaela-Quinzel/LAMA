import { Request, Response } from "express"
import { Shows, ShowInputDTO } from "../business/entities/Shows"
import { Authenticator } from "../business/services/Authenticator"
import { IdGenerator } from "../business/services/IdGenerator"
import { ShowsBusiness } from "../business/ShowsBusiness"
import { BandsDatabase } from "../data/BandsDataBase"
import { ShowsDatabase } from "../data/ShowsDataBase"


export class ShowsController {

    async createShow(req: Request, res: Response) {

        try {

            const week_day = Shows.toWeekDayEnum(req.body.week_day)

            const input: ShowInputDTO = {
                week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }

            const showsBusiness = new ShowsBusiness(
                new ShowsDatabase,
                new BandsDatabase,
                new IdGenerator, 
                new Authenticator
            )

            await showsBusiness.createShow(input, req.headers.authorization as string)

            res.status(200).send({ message: "Show created!" })

        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)

        } finally {
            await BandsDatabase.destroyConnection()
         }

    }

    async getShowsByWeekDay(req: Request, res: Response) {

        try{

            const weekDay = Shows.toWeekDayEnum(req.query.weekDay as string)

            const showsBusiness = new ShowsBusiness(
                new ShowsDatabase,
                new BandsDatabase,
                new IdGenerator, 
                new Authenticator
            )

            const shows =await showsBusiness.getShowsByWeekDay(weekDay)

            res.status(200).send({ shows })

        } catch (error) {
            res.status(error.statusCode || 400).send(error.message)

        } finally {
            await BandsDatabase.destroyConnection()
         }
    }
}