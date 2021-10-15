const API = `https://nodenoteshm.herokuapp.com/api/`


export const getAllUsers = async()=>{
    const response = await fetch(`${API}getUsers`)
    const users = await response.json();
    return users;
}