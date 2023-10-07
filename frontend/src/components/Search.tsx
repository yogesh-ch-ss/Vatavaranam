import { ChangeEvent } from 'react'

import { optionType } from '../types'

type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <main className="flex justify-center items-center h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10-lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-lg text-zinc-700">
        <h1 className="text-4xl font-semibold font-mono px-4 py-4 bg-gradient-to-r from-slate-600 via-purple-800 to-slate-600 bg-clip-text text-transparent">
          vatavaranam
        </h1>
        <h2 className="text-2xl font-light">
          Weather <span className="font-black">Forecast</span>
        </h2>
        <p className="mt-2">
          <span className="font-semibold">Search</span> and{' '}
          <span className="font-semibold">select</span> the city or area from the
          dropdown.
        </p>
        <p className="text-xs mt-2 font-medium text-">Use <span className="font-mono">"_"</span> for space. Ex: San_Francisco</p>

        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white"
            onChange={onInputChange}
          />

          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-600 hover:text-zinc-600

            
            text-zinc-100 px-2 py cursor-pointer"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </section>
    </main>
  )
}

export default Search
