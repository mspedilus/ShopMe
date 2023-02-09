import { useState, useEffect, useCallback } from "react"
import { useLocation } from 'react-router-dom'
import axios from "axios"

//Retrieves data from api
const useFetch = (url, properties) => {
    const [fetchedData, setFetchedData] = useState({facets: []})
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
                const res = await axios.get(url, { withCredentials: true }, 
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