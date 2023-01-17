import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (url, properties) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url, {params: properties});
                setData(res.data)
            } catch (err) {
                setError(err)  
            }
            setLoading(false)
        }
        fetchData()
    }, [url, properties])


    const reFetchData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url);
            setData(res.data)
        } catch (err) {
            setError(err)       
        }
        setLoading(false)
    }
    return {data, loading, error, reFetchData}
}

export default useFetch