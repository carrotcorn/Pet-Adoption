import { useState, useEffect } from "react";
import Results from "./xxxResults"
import ReactPaginate from "react-paginate";


function Pagination({pets}){
   const [petData, setPetData] = useState([]);
   const [pageNumber, setPageNumber] = useState(0);
   const [pageCount] = useState()
   const [animal] = useState("")

   useEffect(()=>{
      requestPetsPagination();
   }, []); // eslint-disable-line react-hooks/exhaustive-deps
 
   async function requestPetsPagination() {
     const res = await fetch(
       `http://pets-v2.dev-apis.com/pets?animal=${animal}&page=${pageNumber}`
     );
     const json = await res.json();
 
     console.log(json);
 
     setPetData(json.pets);
   }

return (
   <div>
      <Results pets={petData} />
      <ReactPaginate
         previousLabel={'previous'}
         nextLabel={'next'}
         breakLabel={'...'}
         breakClassName={'break-me'}
         pageCount={10}
         marginPagesDisplayed={2}
         pageRangeDisplayed={5}
         onPageChange={this.handlePageClick}
         containerClassName={'pagination'}
         activeClassName={'active'}
      />
   </div>
   
   )

}