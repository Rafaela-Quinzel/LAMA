import { Shows, ShowOutputDTO, WeekDay } from "../business/entities/Shows"
import { CustomError } from "../business/error/CustomError"
import { NotFoundError } from "../business/error/NotFoundError"
import { BaseDatabase } from "../data/BaseDatabase"

export class ShowsDatabase extends BaseDatabase {


    public async insertShow(show: Shows): Promise<void> {

        try {

            await this.getConnection()
                .insert({
                    id: show.getId(),
                    week_day: show.getWeekDay(),
                    start_time: show.getStartTime(),
                    end_time: show.getEndTime(),
                    band_id: show.getBandId()
                })
                .into(this.TABLES_NAMES.shows)

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "An unexpected error ocurred")

        }
    }


    public async selectShowByTimes(
        week_day: WeekDay,
        start_time: number,
        end_time: number
    ): Promise<ShowOutputDTO[]> {

        try {

            const shows = await this.getConnection()
                .select("*")
                .where("end_time", ">", `${start_time}`)
                .andWhere("start_time", "<", `${end_time}`)
                .from(this.TABLES_NAMES.shows)


            return shows.map((show: any) => {
                return {
                    id: show.id,
                    week_day: show.week_day,
                    start_time: show.start_time,
                    end_time: show.end_time,
                    band_id: show.band_id,

                }
            })

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "An unexpected error ocurred")

        }
    }


    public async selectShowsByWeekDayOrFail(day: WeekDay) {

        const shows = await this.getConnection()
            .from(`${this.TABLES_NAMES.shows} as show`)
            .join(`${this.TABLES_NAMES.bands} as band`, "show.band_id", "band.id")
            .select("band.name", "band.music_genre", "show.week_day", "show.start_time", "show.end_time")
            .where({ week_day: day })
            .orderBy("start_time")

        if (!shows.length) {
            throw new CustomError(404, `Unbale to found shows at ${day} `)
        }

        return shows

       

    }

    // Teste que não deu certo
    //     const shows = await this.getConnection().raw(`

    //         SELECT  show.id as id,
    //                 band.name as 
    //                 band.id as bandId,
    //                 show.start_time as startTime,
    //                 show.end_time as endTime,
    //                 show.week_day as weekDay,
    //                 band.music_genre as musicGenre
    //         FROM ${this.TABLES_NAMES.shows} show
    //         LEFT JOIN ${this.TABLES_NAMES.shows} band ON band.id = show.band_id
    //         WHERE show.week_day = "${week_day}"
    //         ORDER BY start_time ASC
    //     `)

    //     // validação para verificar se recebemos algum show ou não
    //     if (!shows.length) {
    //         throw new NotFoundError(`Unbale to found shows at ${week_day}`)
    //     }

    //     return shows[0].map((data: any) => ({

    //         id: data.id,
    //         week_day: data.week_day,
    //         start_time: data.start_time,
    //         end_time: data.end_time,
    //         band_id: data.band_id

    //     }))
    // }

}
