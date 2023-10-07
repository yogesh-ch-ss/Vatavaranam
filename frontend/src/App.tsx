import Search from './components/Search'
import Forecast from './components/Forecast'
import useForecast from './hooks/useForecast'
import LoadingSpinner from './components/LoadingSpinner'

const App = (): JSX.Element => {
  const {
    isLoading,
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  } = useForecast()

  return (
    // <main className="flex justify-center items-center bg-gradient-to-b from-orange-300 to-rose-300 h-[100vh] w-full">
    <main className="flex justify-center items-center bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500 h-[100vh] w-full">
      {isLoading && <LoadingSpinner />}
      {!isLoading && !forecast && (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
      {!isLoading && forecast && <Forecast data={forecast} />}
    </main>
  )
}

export default App
