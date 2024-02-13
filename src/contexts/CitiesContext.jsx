import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function FetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch {
        alert("there was some error fetching cities");
      } finally {
        setIsLoading(false);
      }
    }
    FetchCities();
  }, []);

    return (        
        <CitiesContext.Provider value={
            {
                cities,
                isLoading
            }
        }>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) alert('citiesContext is used outside of citiesProvider')
    return context
}

export {CitiesProvider, useCities}