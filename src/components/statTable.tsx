import { capitalize } from "../helper";
import { PokemonReducerInt } from "./reducer";

export const StatTable = ({state}:{state:PokemonReducerInt}) => {
  const {selectedPoke} = state
  const data = [
    {title:"Type", value: selectedPoke?.type?.map((x:string) => capitalize(x)).join(",")},
    {title:"Height", value: selectedPoke.height},
    {title:"Hp", value: selectedPoke.hp},
    {title:"Attack", value: selectedPoke.attack},
    {title:"Defense", value: selectedPoke.defense},
    {title:"Special Attack", value: selectedPoke.specialAttack},
    {title:"Special Defense", value: selectedPoke.specialDefense},
    {title:"Move Count", value: selectedPoke.moveCount},
  ]
  return (
    <>
     <h1 className="hidden lg:block">Stats & Detail</h1>
      <hr/>
      <div className="flex flex-col justify-center items-center">
        {
          data.map((y:{title:string,value:string|number|[]}) => {
            return  <div className="text-2xl mt-3 text-white">
            {y.title} : {y.value}
          </div>
          })
        }
      </div>
    </>
  );
};
