export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}
export const getToken=(token)=>(
    localStorage.getItem('TOKEN',token)
)
export const removeToken=()=>(
    localStorage.removeItem('TOKEN')
)