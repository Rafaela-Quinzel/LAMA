import { LoginInputDTO, User, UserInputDTO, UserRole } from "../src/business/entities/User"
import { NotFoundError } from "../src/business/error/NotFoundError"
import { UserBusiness } from "../src/business/UserBusiness"

const userDatabase = {

    createUser: jest.fn(async (user: User) => { }),
    getUserByEmail: jest.fn(async (email: string) => {
        if (email === "teste@email.com") {
            return User.toUserModel({
                id: "id_usuario",
                name: "nome_usuario",
                email,
                password: "123456",
                role: "ADMIN"
            })
        } else {
            throw new NotFoundError(`Unable to found user witch email: ${email}`)

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
    generate: jest.fn(() => "backend")
}

const hashManager = {
    hash: jest.fn((password: string) => "SECRET_PASS_HASH"),
    compare: jest.fn((text: string, hash: string) => text === "123123" ? true : false)
}

const userBusiness = new UserBusiness(
    userDatabase as any,
    idGenerator as any,
    hashManager as any,
    authenticator as any
)


describe.skip("Signup Test Flow", () => {

    test("Should return error when wrong email format", async () => {

        expect.assertions(2)

        const user = {
            email: "emailteste.com",
            name: "fulano",
            password: "123123",
            role: "NORMAL"
        } as UserInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid email format")
            expect(error.code).toBe(417)
        }
    })

    test("Should return error when wrong role format", async () => {

        expect.assertions(1)

        const user = {
            email: "teste@email.com",
            name: "fulano",
            password: "123123",
            role: "BLABLA"
        } as UserInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid user role")
        }
    })


    test("Should return error when wrong password format", async () => {

        expect.assertions(2)

        const user = {
            email: "email@teste.com",
            name: "fulano",
            password: "123",
            role: "NORMAL"
        } as UserInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("The password must contain more than 6 digits")
            expect(error.code).toBe(417)
        }
    })

    test("Should return error when no role", async () => {

        expect.assertions(2)

        const user = {
            email: "teste@email.com",
            name: "fulano",
            password: "123123",
            role: ""
        } as UserInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid input to signup")
            expect(error.code).toBe(417)
        }
    })



    test("Should return error when no name", async () => {

        expect.assertions(2)

        const user = {
            email: "teste@email.com",
            name: "",
            password: "123123",
            role: "NORMAL"
        } as UserInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid input to signup")
            expect(error.code).toBe(417)
        }
    })


    test("Should return error when no email", async () => {

        expect.assertions(2)

        const user = {
            name: "fulano",
            password: "123123",
            role: "NORMAL"
        } as UserInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid input to signup")
            expect(error.code).toBe(417)
        }
    })


    test("Should return error when no password", async () => {

        expect.assertions(2)

        const user = {
            name: "fulano",
            email: "teste@email.com",
            role: "NORMAL"
        } as UserInputDTO

        try {
            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Invalid input to signup")
            expect(error.code).toBe(417)
        }
    })

    test("Should return token", async () => {

        expect.assertions(1)

        const user = {
            name: "fulano",
            email: "teste@email.com",
            password: "123123",
            role: "NORMAL"
        } as UserInputDTO

        const result = await userBusiness.createUser(user)

        expect(result).toBe("token")
    

    })
})


describe.skip("SignIn Test Flow", () => {

    test("Should return error when no user Linked to email", async() => {
        
        expect.assertions(2)

        const login = {
            email: "email@email.com",
            password: "123123"
        } as LoginInputDTO

        try { 
            await userBusiness.authUserByEmail(login)

        } catch(error) {
            expect(error.message).toBe(`Unable to found user witch email: ${login.email}`)
            expect(error.code).toBe(404)
        }
    })


    test("Should return error when no password", async() => {
        
        expect.assertions(2)

        const login = {
            email: "teste@email.com"
        } as LoginInputDTO

        try { 
            await userBusiness.authUserByEmail(login)

        } catch(error) {
            expect(error.message).toBe("Invalid input to login")
            expect(error.code).toBe(417)
        }
    })

    test("Should return error when no email", async() => {
        
        expect.assertions(2)

        const login = {
            password: "123123"
        } as LoginInputDTO

        try { 
            await userBusiness.authUserByEmail(login)

        } catch(error) {
            expect(error.message).toBe("Invalid input to login")
            expect(error.code).toBe(417)
        }
    })


    test("Should return error when password wrong", async() => {
        
        expect.assertions(2)

        const login = {
            email: "teste@email.com",
            password: "123456"
        } as LoginInputDTO

        try { 
            await userBusiness.authUserByEmail(login)

        } catch(error) {
            expect(error.message).toBe("Invalid password")
            expect(error.code).toBe(417)
        }
    })


    test("Should return an accesss token", async() => {

        expect.assertions(1)

        const userLogin = {
            email: "teste@email.com",
            password: "123123"
        } as LoginInputDTO


        const result = await userBusiness.authUserByEmail(userLogin)

        expect(result).toBe("token")
    })
})