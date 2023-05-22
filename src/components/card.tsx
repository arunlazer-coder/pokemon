
export const Card = ({
  dispatch,
  data,
}: {
  dispatch: (data:any)=>void;
  data: {name:string,id:number,type:string[]};
}) => {
  return (
    <div
      className={`max-w-sm rounded  shadow-lg py-3 w-64 h-72 cursor-pointer ${data.type[0]||""}`}
      onClick={() => dispatch([{ isModalOpen: true }, {selectedPoke:data}])}
    >
      <div className="w-1 min-h-6p">
        <span className="rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          #{data.id}
        </span>
      </div>
      <div className="h-3/5 w-2/4 ml-20pr">
      <img
        src={`https://img.pokemondb.net/artwork/vector/large/${data.name}.png`}
        alt={data.name}
      />
      </div>
      <div className="px-6 ">
        <div className="font-bold text-xl mb-2">{data.name}</div>
      </div>
      <div className="px-6 pb-2">
        {data.type.map((typeName: string) => {
         return <span key={typeName}
            className={`inline-block ${typeName}- text-border tracking-wide bg-gray-200 border-4 border-indigo-500 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2`}
          >
            {typeName}
          </span>;
        })}
      </div>
    </div>
  );
};
