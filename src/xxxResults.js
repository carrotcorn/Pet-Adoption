// import { useEffect, useState } from 'react';
// import Pagination from './Pagination';
import Pet from './Pet'



const Results = ({pets, pageProp}) => {
// const [animal] = useState("");
// const [pageNum, setPageNum] = useState(0);


   // useEffect(() => {
   //    async function paginateRequest(){
   //       const res = await fetch(
   //          `http://pets-v2.dev-apis.com/pets?animal=${animal}&page=${pageNum}`
   //       );
   //       const json = await res.json();
   //       setPageNum(json.pageNum)
   //       }
      
   // }, [])
   
   return(
      <div className="search">
         {!pets.length ? (
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
         }
         {/* {!pets.length ? (
            <h2>No Pets Found</h2>
          ) : (
             pets.map((pet) => {
               console.log(pet.id, pet.name, pet.animal)

               let page = pageNum;
               //page state = 0, 
               // need to iterate page button via the 0 state

               console.log(page);

               const btn = document.createElement("button")

               console.log("type of:", typeof page,", page number:", page,)
               
               if(pet.id <=0 && pet.id >= 10){
                  while(page === 0){
                     return page++;
                  }
                  return btn;                 
               }
            })
          )
         }  */}
      </div>
   )
}

export default Results