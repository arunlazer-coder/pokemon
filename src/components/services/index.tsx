import { PokemonList, StringPair } from "./interface"

export const getAllPokemonName = async (dispatch:(data:({ names: string[] } | { total: string })[])=>void, limit=2000) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
           .then(res => res.json())
           .then((result:PokemonList) => {
                const data = result.results.map(x => x.name)
                dispatch([{names:data}, {total:result.count}])
            })
            .catch(error => console.log(error))
}

export const getAllPokemonData = async (listData:any,limit=10, offset=10, dispatch:(data:any)=>void) => {
    const url = offset ? `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`: `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
    await fetch(url)
           .then(res => res.json())
           .then((result:PokemonList) => {
                result.results.map(async (x) => {
                    await getPokemonData(listData,x.name, (data:any)=>dispatch({listData:data}))
                })
            })
            .catch(error => console.log(error))
}

export const getPokemonData = async (data:StringPair[], id:string, dispatch:(data:any)=>void, isSingleData=false) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
           .then(res => res.json())
           .then( result => {
                    const stat = result?.stats || []
                    const formatteData = {
                        name:result.name,
                        id:result.id,
                        type:result.types.map((x:{type:{name:string}}) => x.type.name),
                        height:(result.height*10)+"cm",
                        weight:result.weight+"m",
                        hp: stat[0]?.base_stat || "N/A",
                        attack: stat[1]?.base_stat|| "N/A",
                        defense: stat[2]?.base_stat|| "N/A",
                        specialAttack: stat[3]?.base_stat|| "N/A",
                        specialDefense: stat[3]?.base_stat|| "N/A",
                        speed: stat[4]?.base_stat|| "N/A",
                        moveCount: result.moves?.length
                    }     

                    if(!isSingleData) {
                        data.push(formatteData)
                        dispatch(data)
                    }else{
                        dispatch(formatteData)
                    }
            })
            .catch(error => console.log(error))
}


export const getAllPokemonType = async (setData:(data:{ types: string[] })=>void) => {
    await fetch(`https://pokeapi.co/api/v2/type`)
           .then(res => res.json())
           .then( result => {
                const data = result.results.map((x:{name:string}) => x.name)
                setData({types:data})
            })
            .catch(error => console.log(error))
}

export const getAllPokemonTypeData = async (data: string[], type:string) => {
    await fetch(`https://pokeapi.co/api/v2/type/${type}`)
           .then(res => res.json())
           .then( result => {
                const pokemon = result.pokemon.map((x:{pokemon:{name:string}}) => x.pokemon.name)
                data.push(pokemon)
            })
            .catch(error => console.log(error))
}

