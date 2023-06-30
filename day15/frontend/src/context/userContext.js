import { createContext, useReducer , useContext } from "react";

export const UserContext = createContext()

export function UserContextProvider({ children }){

    function reducer(state , action) {
        switch(action.type){
            case 'Login':
                return{ user:action.payload }
            case 'Logout':
                return{ user:null }
            default:
                return state
        }
    }

    const [ state , dispatch ] = useReducer( reducer , { user:null } )

    return(
        <UserContext.Provider value={ { ...state , dispatch} }>{ children }</UserContext.Provider>
    )
}

export function useUserContext(){
    return useContext(UserContext);
}