export class Bands {
    constructor(
        private id: string,
        private name: string,
        private music_genre: string,
        private responsible: string
    ) { }


    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    public getMainGenre(): string {
        return this.music_genre
    }

    public getResponsible(): string {
        return this.responsible
    }

    public setName(name: string) {
        this.name = name
    }

    public setMainGenre(music_genre: string) {
        this.music_genre = music_genre
    }

    public setResponsible(responsible: string) {
        this.responsible = responsible
    }

    public static toBand(data?: any): Bands | undefined {
        return (
            data &&
            new Bands(
                data.id,
                data.name,
                data.music_genre || data.main_genre || data.mainGenre || data.musicGenre,
                data.responsible
            )
        )
    }

}

export interface BandsInputDTO {
    name: string,
    music_genre: string,
    responsible: string
}
