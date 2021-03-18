import { BaseDatabase } from "./BaseDatabase"
import { Bands } from "../business/entities/Bands"
import { CustomError } from "../business/error/CustomError"
import { NotFoundError } from "../business/error/NotFoundError"


export class BandsDatabase extends BaseDatabase {


    public async insertBands(band: Bands): Promise<void> {

        try {
            
            await this.getConnection()
                .insert({
                    id: band.getId(),
                    name: band.getName(),
                    music_genre: band.getMainGenre(),
                    responsible: band.getResponsible()
                })
                .into(this.TABLES_NAMES.bands)

        } catch (error) {
            console.log(error)
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async selectBandByIdOrName(input: string): Promise<Bands> {

        try {

            const band = await this.getConnection()
                .select("*")
                .from(this.TABLES_NAMES.bands)
                .where({ id: input })
                .orWhere({ name: input })

            if (!band[0]) {
                throw new NotFoundError(`Unable to found Band with input ${input}`)
            }

            return Bands.toBand(band[0])! // ! está reforçando que não é undefined

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }
   
}