import axios from 'axios'

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const getPage = async (page) => {
    const url=`${baseUrl}?offset=${page*50}&limit=50`
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
const getPoke=async(id)=>{
const pokeUrl=`${baseUrl}/${id}`
    try {
        const response= await axios.get(pokeUrl)
        return response.data
    } catch (error) {
        return error
    }
}
export default {
    getPage,
    getPoke
}