import { useEffect, useState } from "react";
import { INIT_STATE, PokemonReducerInt } from "./reducer";

export const Pagination = ({
  state,
  dispatch,
}: {
  state: PokemonReducerInt;
  dispatch: (data:Record<string, { current: number; pages: number; pageSize: number; }>)=>void;
}) => {
  const {  pagination} = state;
  const { current ,pages} = pagination
  const [pageList, setPageList] = useState([1,2,3])

  useEffect(() => {
    getPageList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pages])
  

  const getPageList = () => {
    const pageList = []
    const firstPage = current === 1 || current === pages ? current : current-1
    const lastPage = current > (pages-3) ? pages : current+2 
    for (let index = firstPage ; index <= lastPage; index++) {
      pageList.push(index)
    }
    setPageList(pageList)
  }

  return (
    <div className="lg:flex justify-center mt-5 mr-5 lg:mr-0">
      <nav aria-label="Page navigation example w-100">
        <ul className="list-style-none flex">
          <li>
            <button
              className={`${
                current === 1 ? "pointer-events-none" : "cursor-pointer"
              } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
              onClick={() => {
                if(current === 1) return false
                dispatch({pagination:{...pagination, current:(current-1)}})
              }}
            >
              Previous
            </button>
          </li>
            
            {
              pageList.map((page) => {
                return page === current ? 
                        <li aria-current="page">
                          <button
                            className="relative block rounded px-3 py-1.5 text-sm font-medium bg-gray"
                            >{page}
                            <span
                              className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                              >(current)</span>
                          </button>
                        </li>
                        :
                        <li>
                          <button
                            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                            onClick={()=>dispatch({pagination:{...pagination, current:page}})}
                          >{page}
                          </button>
                        </li>
              })
            }

          <li>
            <button
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {
                if(current === pages) return false
                dispatch({pagination:{...pagination, current:(current+1)}})
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      <select
        onChange={(e:{target:{value:number}}) =>
          dispatch({ pagination: { ...INIT_STATE.pagination,  pageSize: e.target.value } })
        }
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};
