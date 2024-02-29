import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Button from "./Button"
import styles from "./Form.module.css"
import { useNavigate } from "react-router-dom"
import { useUrlPosition } from "../hoooks/useURLposition"
import Message from "../components/Message"
import Spinner from "../components/Spinner"
import { useCities } from "../contexts/CitiesContext"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URl = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const [cityName, setCityName] = useState("")
  const [country, setCountry] = useState("")
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("")
  const { createCity, isLoading } = useCities()

  const navigate = useNavigate()
  const [lat, lng] = useUrlPosition()

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [geoCodingErr, setGeoCodingErr] = useState("")
  const [emoji, setEmoji] = useState("")

  useEffect(
    function () {
      if (!lat && !lng) return

      async function fetchCityData() {
        try {
          setGeoCodingErr("")
          setIsLoadingGeocoding(true)
          const res = await fetch(
            `${BASE_URl}?latitude=${lat}&longitude=${lng}`
          )
          const data = await res.json()

          if (!data.countryCode)
            throw new Error(
              "That doesent seem to be a city click somewhere else"
            )

          setCityName(data.cityName || data.locality)
          setCountry(data.countryName)
          setEmoji(convertToEmoji(data.countryCode))
        } catch (err) {
          setGeoCodingErr(err.message)
        } finally {
          setIsLoadingGeocoding(false)
        }
      }
      fetchCityData()
    },
    [lat, lng]
  )

  async function handelSubmit(e) {
    e.preventDefault()

    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    }
    await createCity(newCity)
    navigate("/app")
  }

  if (isLoadingGeocoding) return <Spinner />
  if (!lat && !lng)
    return (
      <Message message="Start by clicking somwhere on the map" emoji="😏" />
    )
  if (geoCodingErr) return <Message message={geoCodingErr} emoji="😉" />

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handelSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(e) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
        >
          &larr; Back
        </Button>
        <Button type="primary">Add</Button>
      </div>
    </form>
  )
}

export default Form
