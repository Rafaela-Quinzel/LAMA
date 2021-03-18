import { BandsBusiness } from "../src/business/BandsBusiness"
import { Bands, BandsInputDTO } from "../src/business/entities/Bands"
import { UserRole } from "../src/business/entities/User"
import { NotFoundError } from "../src/business/error/NotFoundError"


const bandsDatabase = {

    insertBands: jest.fn(async (band: Bands) => { }),
    selectBandByIdOrName: jest.fn(async (input: string) => {
        if (input === "idValido" || input === "nomeValido") {
            return {
                id: "idBanda",
                name: "Labanda",
                music_genre: "BACK N' ROLL",
                responsible: "Amandinha"
            }

        } else {
            throw new NotFoundError(`Unable to found band with input ${input}`)
        }
    })
}


const authenticator = {
    // generateToken: jest.fn((payload: AuthenticationData) => "token" ) ou
    generateToken: jest.fn((payload: { id: string, role: UserRole }) => "token"),
    //validando a permissão de ADIMIN e Usuário
    getData: jest.fn((token: string) => {
        switch (token) {
            case "userToken":
                return { id: "id_do_token", role: "NORMAL" }
            case "adminToken":
                return { id: "id_do_token", role: "ADMIN" }
            default:
                return undefined
        }
    })
}


const idGenerator = {
    generate: jest.fn(() => "idBanda")
}

const bandsBusiness = new BandsBusiness(
    bandsDatabase as any,
    idGenerator as any,
    authenticator as any
)


describe.skip("RegisterBand Test Flow", () => {

    test("Should return error when no name", async () => {

        expect.assertions(2)

        const token = "adminToken"

        const band = {
            music_genre: "BACK N' ROLL",
            responsible: "Severo"
        } as BandsInputDTO

        try {

            await bandsBusiness.registerBand(band, token)

        } catch (error) {

            expect(error.message).toBe("Invalid input to registerBand")
            expect(error.code).toBe(417)

        }
    })


    test("Should return error when no responsible", async () => {

        expect.assertions(2)

        const token = "adminToken"

        const band = {
            name: "Banda da Night",
            music_genre: "Darvas Band"
        } as BandsInputDTO

        try {

            await bandsBusiness.registerBand(band, token)

        } catch (error) {

            expect(error.message).toBe("Invalid input to registerBand")
            expect(error.code).toBe(417)

        }
    })


    test("Should return error when no music genre", async () => {

        expect.assertions(2)

        const token = "adminToken"

        const band = {
            name: "Banda da Night",
            responsible: "Darvas"
        } as BandsInputDTO

        try {

            await bandsBusiness.registerBand(band, token)

        } catch (error) {

            expect(error.message).toBe("Invalid input to registerBand")
            expect(error.code).toBe(417)

        }
    })


    test("Should return error when user is not an ADMIN", async () => {

        expect.assertions(2)

        const token = "userToken"

        const band = {
            name: "Banda da Night",
            responsible: "Darvas",
            music_genre: "SAMBA"

        } as BandsInputDTO

        try {

            await bandsBusiness.registerBand(band, token)

        } catch (error) {

            expect(error.message).toBe("Only admins can access this feature")
            expect(error.code).toBe(403)

        }
    })


    test("Should register a band", async () => {

        expect.assertions(1)

        const token = "adminToken"

        const band = {
            name: "Banda da Night",
            responsible: "Darvas",
            music_genre: "SAMBA"
        } as BandsInputDTO

        await bandsBusiness.registerBand(band, token)

        expect(bandsDatabase.insertBands).toHaveBeenCalledWith({

            "id": "idBanda",
            "name": "Banda da Night",
            "music_genre": "SAMBA",
            "responsible": "Darvas"

        })
    })
})


describe("GetBandDetails Test Flow", () => {

    test("Should return error when no input", async () => {

        expect.assertions(2)

        const input = ""

        try {

            await bandsBusiness.getBandDetailsByIdOrName(input)

        } catch (error) {
            expect(error.message).toBe("Invalid input to getBandDetails")
            expect(error.code).toBe(417)

        }
    })


    test("Should return error when no input", async () => {

        expect.assertions(2)

        const input = "qualquerCoisaInvalida"

        try {

            await bandsBusiness.getBandDetailsByIdOrName(input)

        } catch (error) {
            expect(error.message).toBe(`Unable to found band with input ${input}`)
            expect(error.code).toBe(404)

        }
    })


    test("Should return band when valid id", async () => {

        expect.assertions(1)

        const input = "idValido"

        const result = await bandsBusiness.getBandDetailsByIdOrName(input)

        expect(result).toBe({
            id: "idBanda",
            name: "Labanda",
            music_genre: "BACK N' ROLL",
            responsible: "Amandinha"
        })
    })
})