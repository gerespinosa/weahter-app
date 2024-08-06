import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getForecast } from '../services/forecastService'

import { dateAdapter } from '../../../adapters/dateAdapter'

import { ScaleContext } from '../../../context/ScaleContext'

export const Forecast = () => {

    const [forecast, setForecast] = useState([])

    const {scale} = useContext(ScaleContext)

    const { place } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if(place){
            getForecast(place)
            .then(forecastObtained => {
                setForecast(forecastObtained.forecast.forecastday) 
                console.log(forecast)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },[])

    function handleNavigate(date, index) {
        navigate(`/${place}/${date}/${index}`)
    }

  return (
    <div className='flex flex-col'>
    {forecast.slice(1).map((forecastDay, index) => {
        if(index <= 6){
            return (
                <>
                    <div key={index} className='grid grid-cols-3 text-white min-h-20'
                        onClick={() => handleNavigate(forecastDay.date, index)}
                        >
                        <h1 className='my-auto'>{dateAdapter(forecastDay.date)}</h1>
                        <div className='flex justify-start text-center align-middle my-auto columns-2'>
                            <img src={forecastDay.day.condition.icon} className='w-8 h-8' />
                            <h1>{forecastDay.day.condition.text}</h1>
                        </div>
                        <h1 className='text-4xl text-right my-auto'>{scale === 'Celsius' ? `${Math.round(forecastDay.day.avgtemp_c)}°C` : `${Math.round(forecastDay.day.avgtemp_f)}°F`}</h1>
                    </div>
                <hr className={index < 6 ? 'opacity-20' : 'opacity-0' } />
                </>
            )
        }
    })}
    </div>
  )
}
