
import Pet from './Pet'

function Results({pets}){
   
   return(
      <div className="search">
         {/* {!pets.length ? (
            <h2>No Pets Found</h2>
          ) : (
             pets.map((pet) => (
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
         } */}
        {(pet)=>{
            <Pet 
               animal={pet.animal}
               key={pet.id}
               name={pet.name}
               breed={pet.breed}
               images={pet.images}
               location={`${pet.city}, ${pet.state}`}
               id={pet.id}
            />
         }}
      </div>
   )
}

export default Results


//   const [offset, setOffset] = useState(0);
//   const [data, setData] = useState([]);
//   const [perPage] = useState(10);
//   const [pageCount, setPageCount] = useState(0);

//   useEffect(() => {
//     getData()
//   }, [offset])

//     const getData = async() => {
//       const res = await axios.get(`http://pets-v2.dev-apis.com/pets?animal=${animal}&page=${pageCount}`)
//       const data = res.data;
//         const pets = data.slice(offset, offset + perPage);
//       setData(pets)
//       setPageCount(Math.ceil(data.length / perPage))
//     }

//   const handlePageClick = (e) => {
//     const selectedPage  = e.selected;
//     setOffset(selectedPage + 1)
//   }
   // const [petData, setPetData] = useState([]);
   // const [pageNumber, setPageNumber] = useState(0);
   // // const [pageCount] = useState(Math.ceil(data.meta.total_count / data.meta.limit))
   // // const [animal] = useState("")

   // const petsPerPage = 10;
   // const pagesVisited = pageNumber * petsPerPage;

   // const displayPets = petData
   // .slice(pagesVisited, pagesVisited + petsPerPage).map()

   // useEffect(() => {
   //    paginatePets();
   //  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
   // async function paginatePets() {
   // const res = await fetch(
   //    `http://pets-v2.dev-apis.com/pets?animal=${animal}&page=${pageNumber}`
   // );
   // const json = await res.json();

   // console.log(json);

   // setPetData(json.pets);
   // }