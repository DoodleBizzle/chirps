import { useState, createContext, useEffect } from "react";
import {getAllChirps} from "../api/chirpsAPI"

export const chirpsContext = createContext();

const ChirpsProvider = ({ children }) => {
  const [chirps, setChirps] = useState([])

  useEffect(() => {
    (async ()=> {
      const result = await getAllChirps()
      setChirps(result)
    })()
  }, [])

  const contextValue = {
    chirps,
    setChirps
  }

  return <>
    <chirpsContext.Provider value={contextValue}>
      {children}
    </chirpsContext.Provider>
  </>

}

export default ChirpsProvider;