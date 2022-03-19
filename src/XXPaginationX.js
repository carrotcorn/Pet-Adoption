import { useState } from "react";

function Pagination({data, RenderComponent, title, pageLimit, dataLimit}){
const [pages] = useState(Math.round(data.length / dataLimit));
const [currentPage, setCurrentPage] = useState(1);

function goToNextPage(){
  setCurrentPage((page) => page + 1);
};
function goToPreviousPage(){
  setCurrentPage((page) => page - 1);
};

function changePage(e){
  const pageNumber = Number(e.target.textContent);
  setCurrentPage(pageNumber);
};

const getPaginatedData = () => {
  const startIndex = currentPage * dataLimit - dataLimit;
  const endIndex = startIndex + dataLimit;

  return data.slice(startIndex, endIndex);
}
const getPaginationGroup = () => {
  let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
  return new Array(pageLimit).fill().map((_, index) => start + index + 1);
}
  


return(
  <div>
    <h1>{title}</h1>
    <div className="dataComponent">
      {getPaginatedData().map((d, index) => (
        <RenderComponent key={index} data={d} />
      ))}
    </div>
    {/* entire pagination component */}
    <div className="pagination">
      {/* previous button */}
      <button 
        onClick={goToPreviousPage()}
        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
        prev
      </button>
      {/* show pagination group */}
      {getPaginationGroup().map((item, index) =>(
        <button
          key={index}
          onClick={changePage}
          className={`paginationItem ${currentPage === item ? 'active' : null}`}
        >
          <span>{item}</span>
        </button>
      ))}
      {/* next button */}
      <button
        onClick={goToNextPage()}
        className={`prev ${currentPage === pages ? 'disabled' : ''}`}
        >
        next
      </button>
    </div>
  </div>
)
}
export default Pagination;
