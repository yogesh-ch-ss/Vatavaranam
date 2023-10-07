import { useState, useEffect, ChangeEvent } from 'react'
import { optionType, forecastType } from '../types'

const useForecast = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
  const getForecast = async (city: optionType) => {
    setIsLoading((prevLoadingState) => {
      return true // Update isLoading to true
    })

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      const forecastData = {
        ...data.city,
        list: data.list.slice(0, 16),
      }

      setForecast(forecastData)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // useEffect(() => {
  //   console.log(isLoading)
  // }, [isLoading])

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
    isLoading,
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  }
}

export default useForecast
