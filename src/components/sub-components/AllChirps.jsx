import { useContext } from "react"
import { chirpsContext } from "../ChirpsProvider"

const AllChirps = () => {
  const {chirps} = useContext(chirpsContext)

  let currentDate = new Date().toString();
  console.log(currentDate)

  return (
    <div className="container">
    <h3>Chirps</h3>
    { chirps.length ?
      chirps.map((chirp)=> (
        <div key={chirp.id}>
          <span>{chirp.chirp}</span>
          <h6>Author: {chirp.username}</h6>
        </div>
      ))
      :
      null
    }
    </div>
  )
}

export default AllChirps;