import React, { useState } from 'react'
import axios from 'axios'



import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://ndmepqcoazrhdeaiimjh.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbWVwcWNvYXpyaGRlYWlpbWpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1NTU0OTksImV4cCI6MTk5MzEzMTQ5OX0.uULbqkCaqecExdYEY_b_jCgMxvyyJrGQQ5mGFzcFVOk'

export const supabase = createClient(supabaseUrl, supabaseKey)


// A React component that queries and displays data from Supabase
function Library() {
  // The useState hook lets us store data in a component across renders
  // setMyBooks is a setter function that updates the state of myBooks
  const [myBooks, setMyBooks] = useState([]);
  // This should look familar from Codepen
  async function getBooks() {
    let { data: books} = await supabase
      .from('books')
      .select('*')
    // Update the state
    setMyBooks(books);
  }
  // Execute the function
  getBooks();
  // Below is what displays when you use <Library />
  return (
    <table>
    {
      myBooks.map(b => (
        <tr>
          <td>{b.cities}</td>
          <td>{b.states}</td>
        </tr>
      ))
    }
    </table>
  )
}








function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=7b49f72273661821c5cda020e8faae54`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

        <Library />
        

      </div>
    </div>

    



  );
}

export default App;