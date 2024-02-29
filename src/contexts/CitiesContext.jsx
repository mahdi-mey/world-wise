import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react"

const CitiesContext = createContext()

const BASE_URL = "http://localhost:8000"

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  errorMessage: "",
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true }
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload }
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload }
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      }
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      }
    case "rejected":
      return { ...state, isLoading: false, errorMessage: action.payload }
    default:
      throw new Error("Invalid action type")
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(function () {
    async function FetchCities() {
      dispatch({ type: "loading" })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: "cities/loaded", payload: data })
        console.log(data)
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was some error fetching cities",
        })
      }
    }
    FetchCities()
  }, [])

  async function getCity(id) {
    if (Number(id) === currentCity.id) return

    dispatch({ type: "loading" })

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      dispatch({ type: "city/loaded", payload: data })
      console.log(data)
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was some error loading city",
      })
    }
  }
  async function createCity(newCity) {
    dispatch({ type: "loading" })

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      console.log(data)
      dispatch({ type: "city/created", payload: data })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was some error cerating the city",
      })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" })

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      })
      dispatch({ type: "city/deleted", payload: id })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was some error deleting the city",
      })
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
        deleteCity,
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
