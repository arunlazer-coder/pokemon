import { isArray } from "../helper";
import { PokemonReducerInt } from "./reducer";
import { StatTable } from "./statTable";
export const Modal = ({
  onClose,
  isShow,
  state
}: {
  onClose: () => void;
  isShow: boolean;
  state:PokemonReducerInt
}) => {
  const {selectedPoke} = state
  const handleClose = (e: {target:{id:string}}) => {
    if (e.target.id === "modalParent") onClose();
  };

  if (!isShow) {
    return <></>;
  }
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div
        className="fixed flex min-h-full justify-center items-center inset-0 z-10 overflow-y-auto"
        onClick={(e) => handleClose(e)}
        id="modalParent"
      >
        <div className="bg-white lg:flex h-2/1 lg:h-4/5 w-4/5">
            <div className="w-full lg:w-2/4 lg:order-last border-l-2 flex-col justify-center">
                <div className="h-20 ml-5 mt-5 w-2/4 lg:w-94pr flex justify-between">
                    <img className="hidden lg:block align-middle" src="/pokeIcon.png" height={'50px'} width={'60px'} />
                    <h1 className="font-bold mt-2">
                      {selectedPoke.name} 
                    </h1>
                    <span className="mt-7 mlc-40 mr-0 lg:ml-0 lg:mrc-9 cursor-pointer" onClick={onClose}>X</span>
                </div>
                <div className="w-4/5 h-4/5 ml-14">
                  <img className="h-90pr" src={`https://img.pokemondb.net/artwork/large/${selectedPoke.name}.jpg`} />
                </div>
            </div>
            <div className={`w-full lg:w-2/4   drop-shadow-lg ${isArray(selectedPoke?.type) ? selectedPoke?.type[0]:""}`}>
              <StatTable {...{state}}/>
            </div>
        </div>
      </div>
    </div>
  );
};
