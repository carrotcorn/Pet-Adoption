import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import ReactPaginate from 'react-paginate';
// import {Link} from "react-router-dom";

import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Pet from "./Pet"
import Results from "./Results";

const ANIMALS = ["cat", "dog", "reptile", "bird", "rabbit"];

const SearchParams = (pet) => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [petsData, setPets] = useState([]);
  const [breedList] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  const [pagesVisited, setPagesVisited] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);


  useEffect(() => {
    requestPets();
  }, [pagesVisited]); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
      const res = await fetch(
        `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
      );
      const json = await res.json();

      console.log(json);

      setPets(json.pets);

      const resX = await axios.get(`http://pets-v2.dev-apis.com/pets?animal=${animal}&page=${pageCount}`)
      const data = resX.data.pets;
      console.log(data)

        const grabbedPets = data.slice(pagesVisited, pagesVisited + perPage);
        const postData =  
          !grabbedPets.length ? (
            <h2>No Pets Found</h2>
          ) : (
            grabbedPets.map((pet) => (
            // <Results 
            //   key={pet.id} 
            //   pets={pet.petsData} 
            // />
            
                <Pet 
                  animal={pet.animal}
                  key={pet.id}
                  name={pet.name}
                  breed={pet.breed}
                  images={pet.images}
                  location={`${pet.city}, ${pet.state}`}
                  id={pet.id}
                  />
                )) 
             ) 

      setData(postData)
      setPageCount(Math.ceil(data.length / perPage))

    }

  // useEffect(() => {
  //   getData()
  // }, [pagesVisited]); // eslint-disable-line react-hooks/exhaustive-deps
  
    // const getData = async() => {
      // const res = await axios.get(`http://pets-v2.dev-apis.com/pets?animal=${animal}&page=${pageCount}`)
      // const data = res.data.pets;
      // console.log(data)

      //   const grabbedPets = data.slice(pagesVisited, pagesVisited + perPage);
      //   const postData =  
      //     !grabbedPets.length ? (
      //       <h2>No Pets Found</h2>
      //     ) : (
      //       grabbedPets.map((pet) => (
      //           <Pet 
      //           animal={pet.animal}
      //           key={pet.id}
      //           name={pet.name}
      //           breed={pet.breed}
      //           images={pet.images}
      //           location={`${pet.city}, ${pet.state}`}
      //           id={pet.id}
      //           />
      //       ))
      //     )
       
      //     // <Results pets={petsData} />

      // setData(postData)
      // setPageCount(Math.ceil(data.length / perPage))
    // }

  
  const handlePageClick = (e) => {
    const selectedPage  = e.selected
    setPagesVisited(selectedPage + 1)
  }
  

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option value=""></option>
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breeds
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option value=""></option>
            {breedList.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          ThemeContext
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      {/* <Results pets={petsData} /> */}
      {data}
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}/>
    </div>
  );
};

export default SearchParams;
