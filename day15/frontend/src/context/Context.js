import { createContext, useReducer , useContext } from "react";

export const TaskContext = createContext()

export function TaskContextProvider({ child }){

    function reducer(state , action) {
        switch(action.type){
            case 'Fetch':
                return{ tasks:action.payload }
            case 'Post':
                return{ tasks:[action.payload , ...state.tasks] }
            default:
                return state
        }
    }

    const [ state , dispatch ] = useReducer( reducer , {tasks:null} )

    return(
        <TaskContext.Provider value={ { state , dispatch} }>{ child }</TaskContext.Provider>
    )
}

export function useTaskContext(){
    return useContext(TaskContext);
}