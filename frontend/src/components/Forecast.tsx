import { forecastType } from '../types'

type Props = {
  data: forecastType
}
const Forecast = ({ data }: Props): JSX.Element => {
  return (
    <div>
      <p>Forecast</p>
    </div>
  )
}

export default Forecast
