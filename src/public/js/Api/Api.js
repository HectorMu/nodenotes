// const API = `https://nodenoteshm.herokuapp.com/api/`
 const API = `http://localhost:3000/api/`

export const verifyEmail = async(email)=>{
    const response = await fetch(`${API}verifyEmail/${email}`)
    const users = await response.json();
    return users;
}

export const getUserNotes = async  ()=>{
    const response = await fetch(`${API}getUserNotes`)
    const notes = await response.json();
    return notes;
}