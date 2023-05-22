import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllPokemonTypeData, getPokemonData } from "./services";
import { findCommonData } from "../helper";
import { PokemonReducerInt } from "./reducer";
import { StringPair } from "./services/interface";

export const Filter = ({
  state,
  dispatch,
  setLimit,
}: {
  state: PokemonReducerInt;
  dispatch: (data:Record<string, boolean|never>)=>void;
  setLimit: (data?:number)=>void;
}) => {
  const [formattedName, setFname] = useState<{ label: JSX.Element; value: string; }[]>([]);
  const [formattedType, setFtype] = useState<{ label: JSX.Element; value: string; }[]>([]);

  const getStyle = (isName: boolean, data: string) => {
    if (isName) {
      return (
        <div className="flex align-middle justify-center min-h-fit">
          <img
            src={`https://img.pokemondb.net/sprites/ruby-sapphire/shiny/${data}.png`}
            height={"10%"}
            width={"10%"}
            className="h-15"
          />
          <span className="mt-2">{data}</span>
        </div>
      );
    }
    return (
      <div>
        <span className={`font-bold ${data}- text-border tracking-wide`}>
          {data}
        </span>
      </div>
    );
  };

  useEffect(() => {
    const formattedName = state.names.map((x: string) => {
      return {
        label: getStyle(true, x),
        value: x,
      };
    });
    setFname(formattedName);
  }, [state.names]);

  useEffect(() => {
    const formattedType = state.types.map((x: string) => {
      return {
        label: getStyle(false, x),
        value: x,
      };
    });
    setFtype(formattedType);
  }, [state.types]);

  const handleScroll = () => {
    if (state.names.length < state.total) {
      setLimit();
    }
  };

  const loadOptions = (value: string) => {
    if (!state.names.some((x: string) => x.includes(value))) {
      setLimit(state.total);
    }
  };

  const selectPoke = (value: any) => {
    if(value?.value?.length !== 0){
      getPokemonData([], value.value, (data) => dispatch({ selectedPoke: data }), true);
      dispatch({isModalOpen:true})
    }
  };

  const selectType = async (value: any) => {
    if(value.length === 0){
      dispatch({isTypeSearched:false})
      return
    }
   const types = value.map((x:{value:string}) => x.value)
   const pokeType:string[] = []
    for (const item of types) {
      await getAllPokemonTypeData(pokeType,item)
    }
    const commonPokes:string[] = findCommonData(pokeType)
    const pokeFiltered:StringPair[] = []
    commonPokes.map(async(element) => {
      await getPokemonData(pokeFiltered, element,  (data)=>dispatch({listData:data}))
    });
    dispatch({isTypeSearched:true})
  };



  return (
    <div className="w-full lg:flex">
      <div className="w-100 lg:w-2/4 mr-3 sm:mt-2">
        <Select
          classNamePrefix="pokeName"
          isClearable={true}
          isSearchable={true}
          onInputChange={loadOptions}
          onChange={selectPoke}
          placeholder="Type the name of the pokemon"
          onMenuScrollToBottom={handleScroll}
          options={formattedName}
        />
      </div>
      <div className="w-100 lg:w-2/4 mt-2 ">
        <Select
          className="pokeFilter"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          onChange={selectType}
          isMulti={true}
          placeholder="Enter the type of the pokemon"
          options={formattedType}
        />
      </div>
    </div>
  );
};
