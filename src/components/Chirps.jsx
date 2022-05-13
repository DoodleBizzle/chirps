import { useState, useEffect, useContext} from "react";
import { getAllChirps } from "../api/chirpsAPI";

const Chirps = () => {
  const [chirps, setChirps] = useState([])

  useEffect(() => {
    (async ()=> {
      const result = await getAllChirps()
      setChirps(result)
    })()
  }, [])

  console.log(chirps)

  return (
    <div>
    {
      chirps.map((chirp)=> (
        <div className="container" key={chirp.id}>
          <text>{chirp.chirp}</text>
          <h6>Author: {chirp.username}</h6>
        </div>
      ))
    }
    </div>
  )
}

export default Chirps;