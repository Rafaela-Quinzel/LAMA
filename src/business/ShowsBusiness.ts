import { ShowsDatabase } from "../data/ShowsDataBase"
import { ShowInputDTO, Shows, WeekDay } from "../business/entities/Shows"
import { UserRole } from "./entities/User"
import { CustomError } from "./error/CustomError"
import { Authenticator } from "./services/Authenticator"
import { IdGenerator } from "./services/IdGenerator"
import { BandsDatabase } from "../data/BandsDataBase"
import { InvalidInputError } from "./error/InvalidInputError"

export class ShowsBusiness {

    constructor(
        private showDatabase: ShowsDatabase,
        private bandDatabase: BandsDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createShow(input: ShowInputDTO, token: string) {

        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN) {
            throw new CustomError(401, "Only admins can access this feature")
        }

        if (!input.week_day || !input.start_time || !input.end_time || !input.band_id) {
            throw new CustomError(401, "Invalid input to createShow")
        }

        if (input.start_time < 8 || input.end_time > 23 || input.start_time >= input.end_time) {
            throw new CustomError(401, "Invalid times to createShow");
        }

        if (!Number.isInteger(input.start_time) || !Number.isInteger(input.end_time)) {
            throw new CustomError(401, "Times should be integer to createShow")
        }

        const band = await this.bandDatabase.selectBandByIdOrName(input.band_id)

        if(!band) {
            throw new CustomError(404, "Band not found")
        }

        const registeredShows = await this.showDatabase.selectShowByTimes(input.week_day, input.start_time, input.end_time)
        
        if(registeredShows.length) {
            throw new CustomError(401, "No more shows can be created at this times")
        }

        await this.showDatabase.insertShow(
            Shows.toShow({
                ...input, 
                id: this.idGenerator.generate()
            }))
    }


    async getShowsByWeekDay(week_day: WeekDay) {

        if(!week_day) {
            throw new InvalidInputError("Invalid input to getShowsByWeekDay")
        }

        const shows = await this.showDatabase.selectShowsByWeekDayOrFail(week_day)

        return{ result: shows }
    }

}