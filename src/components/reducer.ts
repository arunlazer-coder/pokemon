export const INIT_STATE = {
    isModalOpen:false,
    listData:[],
    names:[],
    types:[],
    total:0,
    dropDownLoading:false,
    isLoading:false,
    selectedPoke:{},
    isTypeSearched:false,
    pagination:{
        current:1,
        pages:0,
        pageSize:10
    }
}

export interface PokemonReducerInt {
    isModalOpen:boolean,
    listData:[],
    names:[],
    types:[],
    total:number,
    dropDownLoading:boolean,
    isLoading:boolean,
    selectedPoke:Record<string, never|[]>,
    isTypeSearched:boolean,
    pagination:{
        current:number,
        pages:number,
        pageSize:number
    }
}

export const pokemonReducer = (state:PokemonReducerInt, {type, payload}:{type:string, payload: any}) => {
    return {...state, [type]:payload}
}