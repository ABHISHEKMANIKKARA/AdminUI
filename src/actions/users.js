const setUser=(users,forFilter)=>{return {type:"setusers",payload:{users,forFilter:[...forFilter]}}};

export default setUser;