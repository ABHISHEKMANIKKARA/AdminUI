
const users=(state={},action)=>{
 
    switch(action.type){
        case "setusers":return { users:[...action.payload.users],forFilter:action.payload.forFilter}
        default:return state

    }
}

export default users;