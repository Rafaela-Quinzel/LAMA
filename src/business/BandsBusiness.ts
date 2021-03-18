import { IdGenerator } from "./services/IdGenerator"
import { Authenticator } from "./services/Authenticator"
import { BandsDatabase } from "../data/BandsDataBase"
import { Bands, BandsInputDTO } from "./entities/Bands"
import { UserRole } from "./entities/User"
import { UnauthorizedError } from "./error/UnauthorizedError"
import { InvalidInputError } from "./error/InvalidInputError"

export class BandsBusiness {

    constructor(
        private bandsDatabase: BandsDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator,

    ) { }

    async registerBand(input: BandsInputDTO, token: string) {

        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN) {
            throw new UnauthorizedError("Only admins can access this feature")
        }

        if (!input.name || !input.music_genre || !input.responsible) {
            throw new InvalidInputError("Invalid input to registerBand")
        }


        await this.bandsDatabase.insertBands(
            Bands.toBand({
                ...input,
                id: this.idGenerator.generate() // const id = this.idGenerator.generate()
            })! // ! está reforçando que não é undefined
        )

        return tokenData

    }

    public async getBandDetailsByIdOrName(input: string): Promise<Bands> {

        if (!input) {
            throw new InvalidInputError("Invalid input to getBandDetails")
        }

        return this.bandsDatabase.selectBandByIdOrName(input)

     

    }
}