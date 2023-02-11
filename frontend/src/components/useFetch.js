import { useState, useEffect, useCallback } from "react"
import { useLocation } from 'react-router-dom'
import axios from "axios"
axios.defaults.withCredentials = true


//Makes api calls
const useFetch = (url, properties) => {
    const [fetchedData, setFetchedData] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const location = useLocation();

    const getState = useCallback(() => {
        return location.state
      }, [location.state])

    useEffect(() => {
        const fetchData = async () => {
            const state = getState()
            setLoading(true)
            try {
                const res = await axios.get(url, 
                                            {params: {...properties, "productName": state ? state.searchVal : "",
                                                                     "category": state ? state.category : "" }});
                setFetchedData(res.data)
            } catch (err) {
                setError(err)  
            }
            setLoading(false)
        }
        fetchData()

    }, [url, properties, getState])


    return {fetchedData, loading, error}
}

export default useFetch