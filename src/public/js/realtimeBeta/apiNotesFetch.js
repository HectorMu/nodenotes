
export const GetNotes = async()=>{
    const url = 'https://nodenotesapi.herokuapp.com/api/listall';
    const response = await fetch(url)
    const notes = await response.json();
    return notes
}
export const saveNote =  async(title, content, importance)=>{
    const url = 'https://nodenotesapi.herokuapp.com/api/save'
    const response = await fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            content,
            importance,
        })
        
    })
    const results = await response.json();
    return results;
    
}
export const deleteNote =  async(idnote)=>{
    const url = `https://nodenotesapi.herokuapp.com/api/delete/${idnote}`
    await fetch(url, {
        method:'DELETE',
    })
}
export const editNote =  async(idnote,title, content, importance )=>{
    const url = `https://nodenotesapi.herokuapp.com/api/update/${idnote}`
   const response = await fetch(url,{
        method: 'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            title,
            content,
            importance
        })
    })
    const results = response.json()
    return results
}

export const getOne = async(idnote) =>{
    const url = `https://nodenotesapi.herokuapp.com/api/listone/${idnote}`
    const response = await fetch(url)
    const note = await response.json();
    return note
}

export const getByTitle = async (title) =>{
    const url = `https://nodenotesapi.herokuapp.com/api/getbyname/${title}`
    const response = await fetch(url)
    const note = await response.json()
    return note
}


