// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react"
import Button from "./Button"
import styles from "./Form.module.css"
import { useNavigate } from "react-router-dom"
import { useUrlPosition } from "../hoooks/useURLposition"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URl = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

function Form() {
  const [cityName, setCityName] = useState("")
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("")

  const navigate = useNavigate()
  const [lat, lng] = useUrlPosition()

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)

  const [emoji, setEmoji] = useState('')

  useEffect(function () {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true) 
        const res = await fetch(`${BASE_URl}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        setCityName(data.cityName || data.locality)
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      }
      catch (err){
        
      }
      finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  // }, [])
  }, [lat, lng])

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
        {/* <button>Add</button> */}
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  )
}

export default Form
