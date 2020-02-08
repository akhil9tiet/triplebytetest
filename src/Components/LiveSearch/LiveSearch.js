import React, {useState, useEffect} from 'react'

const LiveSearch = () =>{

  const [data, setData] = useState(
    {
      query:'', 
      results:{}, 
      loading:false,
      message:''
    });

  return(
    <div className="container">
      <h2>Live Search:</h2>
      <label className="search-label" htmlFor = "search-input">
        <input type="text" value="" id="search-input" placeholder="Search" />
      </label>
    </div>
  )

}

export default LiveSearch;