import { createContext, useState, useEffect, useContext } from "react"

const CitiesContext = createContext()

const BASE_URL = "http://localhost:8000"

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(function () {
    async function FetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
        console.log(data)
      } catch {
        console.log("There was some error fetching cities")
      } finally {
        setIsLoading(false)
      }
    }
    FetchCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
      console.log(data)
    } catch {
      console.error("There was some error fetching cities")
    } finally {
      setIsLoading(false)
    }
  }
  async function createCity(newCity) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {"Content-Type": "application/json"}        
      })
      const data = await res.json()
      setCurrentCity(data)
      console.log(data)
      setCities(cities => [...cities, newCity])
    } catch {
      console.error("There was some error selecting the city")
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',       
      })
      setCities(cities => cities.filter(city => city.id !== id))
    } catch(err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined)
    console.error("citiesContext is used outside of citiesProvider")
  return context
}

export { CitiesProvider, useCities }
