import Search from './components/Search'
import Forecast from './components/Forecast'
import useForecast from './hooks/useForecast'

const App = (): JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast()

  return (
    // <main className="flex justify-center items-center bg-gradient-to-b from-orange-300 to-rose-300 h-[100vh] w-full">
    <main className="flex justify-center items-center bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-400 h-[100vh] w-full">
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  )
}

export default App
