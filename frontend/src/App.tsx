import { ChangeEvent, useState, useEffect } from 'react'

import { optionType } from './types'

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>('') // term is whatever is entered on the input field
  const [options, setOptions] = useState<[]>([]) // options is the data received from the geolocation api - options of cities visible on search options
  const [city, setCity] = useState<optionType | null>(null) // city is set after selecting a city from the search options

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
  }

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

  // Gets the forecast data of the entered city
  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => console.log({ data }))
  }

  // Acts after the Submit button is clicked
  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10-lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700">
        <h1 className="text-4xl font-semibold font-mono px-4 py-4">
          vatavaranam
        </h1>
        <h2 className="text-2xl font-light">
          Weather <span className="font-black">Forecast</span>
        </h2>
        <p className="text-sm mt-2">
          Search and select the city from the dropdown
        </p>

        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white "
            onChange={onInputChange}
          />

          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>

          <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py cursor-pointer" onClick={onSubmit}>
            Search
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
