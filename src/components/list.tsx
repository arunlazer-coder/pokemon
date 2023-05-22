import { useEffect, useState } from "react";
import { Card } from "./card";
import { Filter } from "./filter";
import { Modal } from "./modal";
import { Pagination } from "./pagination";
import {
  getAllPokemonData,
  getAllPokemonName,
  getAllPokemonType,
} from "./services";
import { useCustomReducer } from "./customHook";
import { INIT_STATE, pokemonReducer } from "./reducer";

export const List = () => {
  const { state, dispatch } = useCustomReducer(pokemonReducer, INIT_STATE);
  const { listData, pagination, isTypeSearched } = state;
  const [limit, setLimit] = useState(200);
  const { isModalOpen } = state;

  useEffect(() => {
    getAllPokemonName(dispatch, limit);
    getAllPokemonType(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);
  
  useEffect(() => {
    const offset = ((pagination.current-1)*pagination.pageSize)
     if(!isTypeSearched) getAllPokemonData([], pagination.pageSize, offset, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageSize, pagination.current, isTypeSearched]);

  useEffect(() => {
    dispatch({
      pagination: {
        ...pagination,
        pages: Math.ceil(pagination.total / pagination.pageSize)
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageSize]);
  

  return (
    <>
      <Filter
        {...{ state, dispatch }}
        setLimit={(addOn = 2000) => setLimit(addOn || limit + 200)}
      />
      <div className="grid gap-4 lg:grid-cols-3 mt-5 max-h-512 overflow-auto">
        {listData.map((data: {name:string,id:number,type:string[]}) => {
          return <Card key={data.name} {...{ dispatch, data }} />;
        })}
      </div>
      {
        !isTypeSearched ? <Pagination {...{state, dispatch}} /> : <></>
      }
      
      <Modal
        onClose={() => dispatch([{ isModalOpen: false }, {selectedPoke:{}}])}
        {...{ state, dispatch}}
        isShow={isModalOpen}
      />
    </>
  );
};
