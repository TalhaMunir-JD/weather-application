// import useFetch from "../Hooks/UseFetchHook"
import { useState, useEffect } from "react"
import Search from "./Search"

const Display = () => {

    const[query, setQuery] = useState('Islamabad')

    const[data, setData] = useState(null)
    const[error, setError] = useState(null)
    const[pending, setPending] = useState(false)

    const fetchData = async(params) =>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=f4c6f150a96e958b08c718428fbd4d33`
        setPending(true)
        try{
            const response = await fetch(url)
            const json = await response.json()
            console.log(json)
            setData(json)
            setPending(false)
            setError('')
        }catch(e){
            setPending(false)
            setData(null)
            console.log(e.message)
            setError(e.message)
        }
    }

    useEffect(()=>{
        fetchData('Islamabad')
    }, [])

    const handleSearch = () => {
        fetchData(query)
    }

    const getDate = () => {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    if(pending) return <h1>Loading pls wait...</h1>

    if(error) return <h1>error occured {error}</h1>

    return(
        <div className="wrapper">
            <div className="main-container">
                <div><Search query={query} setQuery={setQuery} handleSearch={()=>handleSearch(query)}/></div>
                <div>
                    <div className="dateDisplay">
                        { data ? <h2>{data.name}</h2> : null}
                        <span>{getDate()}</span>
                    </div>
                    <div className="temperature">
                        <h1>{data?.main?.temp}</h1>
                    </div>
                    <div className="Description">
                        {data && data.weather && data.weather[0] ? <p>{data.weather[0].description}</p> : ""}
                    </div>
                    <div className="weatherinfo">
                        <div>
                            <div>
                                <p className="wind">{data?.wind?.speed}</p>
                                <p className="text">Wind Speed</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="humidity">{data?.main?.humidity}</p>
                                <p className="text">Humidity</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Display;