import { CustomError } from "../error/CustomError"
import { InvalidInputError } from "../error/InvalidInputError"

export class Shows {

    constructor(
        private id: string,
        private week_day: WeekDay,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getWeekDay(): WeekDay {
        return this.week_day
    }

    public getBandId(): string {
        return this.band_id
    }

    public getStartTime(): number {
        return this.start_time
    }

    public getEndTime(): number {
        return this.end_time
    }

    public setId(id: string) {
        this.id = id
    }

    public setWeekDay(week_day: WeekDay) {
        this.week_day = week_day
    }

    public setStartTime(start_time: number) {
        this.start_time = start_time
    }

    public setEndTime(end_time: number) {
        this.end_time = end_time
    }


    public static toWeekDayEnum(data?: any): WeekDay {

        switch (data) {
            case "FRIDAY":
                return WeekDay.FRIDAY
            case "SATURDAY":
                return WeekDay.SATURDAY
            case "SUNDAY":
                return WeekDay.SUNDAY
            default:
                throw new InvalidInputError("Invalid weekDay")
        }
    }


    public static toShow(data?: any) {

        return (
            data &&
            new Shows(
                data.id,
                Shows.toWeekDayEnum(data.week_day || data.weekDay),
                data.start_time || data.startTime,
                data.end_time || data.endTime,
                data.band_id || data.bandId
            )
        )
    }
}


export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}


export interface ShowInputDTO {
    week_day: WeekDay
    start_time: number
    end_time: number
    band_id: string
}

export interface ShowOutputDTO {
    id: string
    week_day: WeekDay
    start_time: number
    end_time: number
    band_id: string
    mainGenre?: string
    bandName?: string
}

