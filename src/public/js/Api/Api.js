const API = `https://nodenoteshm.herokuapp.com/api/`
// const API = `http://localhost:3000/api/`


export const getAllUsers = async()=>{
    const response = await fetch(`${API}getUsers`)
    const users = await response.json();
    return users;
}