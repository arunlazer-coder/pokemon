export interface PokemonList{
    count: string,
    next: null|string,
    previous: null|string,
    results: {
                name: string,
                url: string
            }[]
}


export interface Stat{
    base_stat:number,
    stat:StringPair[]
}

export interface StringPair {[key:string]:string}