import React from 'react'
import './indexx.css'
import { useState } from 'react'


function Wiki() {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const handleSearch = async e =>{
        e.preventDefault();
        if (search === '') return;

        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`

        const response = await fetch(endpoint);
        console.log(response);

        if(!response.ok){
            throw Error(response.statusText);
        }
         const json = await response.json();

         console.log(json);
         
         setResult(json.query.search);
    }

  return (
    <div>
      <header>
      <h1>Wiki Seeker</h1>
      <form className='search-form' onSubmit={handleSearch}>
        <input 
        type="search" placeholder='What do you want to seek!'
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
      </form>

    {/* {(searchInfo.totalhits) ? <p>Search Results: {searchInfo.totalhits}</p> : ''} */}
      
      </header>

    <div className="results">

        {result.map((result, id) =>{
            const url = `https://en.wikipedia.org/wiki/?curid=${result.pageid}`
            return(
                <div className=
        "result" key={id}>

            <h1>{result.title}</h1>

            <p dangerouslySetInnerHTML={{__html:result.snippet}}></p>

            <a href={url} target='blank' rel='nofollow'>Read More</a>
        </div>
            )
        })}

        
    </div>

    </div>
  )
}

export default Wiki
