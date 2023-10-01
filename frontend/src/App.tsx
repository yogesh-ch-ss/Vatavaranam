import { ChangeEvent, useState } from 'react'

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>('')

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value)
  }

  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

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

        <div className="flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white "
            onChange={onInputChange}
          />
          <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py cursor-pointer">
            Search
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
