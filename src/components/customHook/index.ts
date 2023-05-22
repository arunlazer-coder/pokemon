import { useReducer } from "react"
import { isArray } from "../../helper"

export const useCustomReducer = (reducer:(state:any, actions:any)=> any, INIT_STATE:any)=>{
    const [state, dispatch] = useReducer(reducer, INIT_STATE)
    const customDispatch = (type:any)=>{
        if(isArray(type)){
            type.forEach((element:any) => {
                for (const key in element) {
                    const value = element[key]
                    dispatch({type: key, payload: value})
                }
            });
        } else {
            for (const key in type) {
                const value = type[key]
                dispatch({type: key, payload: value})
            }
        }
    }
    return {state, dispatch: customDispatch}
}