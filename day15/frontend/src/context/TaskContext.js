import { createContext, useReducer , useContext } from "react";

export const TaskContext = createContext()

export function TaskContextProvider({ children }){

    function reducer(state , action) {
        switch(action.type){
            case 'Fetch':
                return{ tasks:action.payload }
            case 'Post':
                return{ tasks:[...state.tasks , action.payload] }
            case "Del":
                return{ tasks: state.tasks.filter((task) => task._id !== action.payload._id) }
            default:
                return state
        }
    }

    const [ state , dispatch ] = useReducer( reducer , {tasks:null} )

    return(
        <TaskContext.Provider value={ { ...state , dispatch} }>{ children }</TaskContext.Provider>
    )
}

export function useTaskContext(){
    return useContext(TaskContext);
}