import { Flex } from '@chakra-ui/react';
import React from 'react';
import ReactPaginate from 'react-paginate';

export const Pagination = ({ data, onPageChange }) => {
  const handlePageChange = (selectedItem) => {
    onPageChange(selectedItem.selected + 1);  
  };

  return (
    <>
      <Flex justifyContent="center" mt={4}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageChange}
          pageRangeDisplayed={5}
          pageCount={data ? Math.ceil(data.count / 10) : 0}
          previousLabel="<"
          containerClassName="pagination"
          activeClassName="active"
          previousClassName="previous"
          nextClassName="next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="previous-link"
          nextLinkClassName="next-link"
          breakLinkClassName="break-link"
        />
      </Flex>

      <style jsx>{`
        .pagination {
          display: flex;
          list-style: none;
          padding: 0;
        }
        .page-item {
          margin: 0 5px;
        }
        .page-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: 1px solid #ccc;
          border-radius: 50%;
          text-decoration: none;
          color: #333;
        }
        .active .page-link {
          background-color: #3b8f4f;
          color: white;
        }
        .page-link:hover {
          background-color: #3b8f4f;
          opacity: 0.8;
        }
        .previous-link,
        .next-link {
          margin: 0 10px;
        }
      `}</style>
    </>
  );
};
