const API = `https://nodenoteshm.herokuapp.com/api/`
// const API = `http://localhost:3000/api/`


export const getAllUsers = async()=>{
    const response = await fetch(`${API}getUsers`,{
        headers:{
            "location":window.location.href
        }
    })
    const users = await response.json();
    return users;
}