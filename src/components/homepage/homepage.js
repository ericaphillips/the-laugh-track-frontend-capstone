import React from "react"
import ReactPlayer from "react-player"
import "./homepage.css"

export const Homepage = (props) => {
  return (
    <div>
        <h1>Video of the Week:</h1>
      <ReactPlayer
        url="https://youtu.be/bq4sO_AtbAg"
      />
    </div>
  )
}
