import { useState, useEffect, ChangeEvent } from 'react'
import { optionType, forecastType } from '../types'

const useForecast = () => {
  // term is whatever is entered on the input field
  const [term, setTerm] = useState<string>('')

  // options is the data received from the geolocation api - options of cities visible on search options
  const [options, setOptions] = useState<[]>([])

  // city is set after selecting a city from the search options
  const [city, setCity] = useState<optionType | null>(null)

  const [forecast, setForecast] = useState<forecastType | null>(null)

  // To get the search options
  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log(e))
  }

  // Whenever there is a change in the input on the search
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(value)

    if (value === '') return

    getSearchOptions(value)
  }

  // Acts after selecting an "option" of cities from the list of "options"
  const onOptionSelect = (option: optionType) => {
    setCity(option)
  }

  // Gets the forecast data of the searched city
  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }

        setForecast(forecastData)
      })
      .catch((e) => console.log(e))
  }

  // Acts after the Submit button is clicked
  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  // To reset the search options after a city is picked
  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  }
}

export default useForecast
