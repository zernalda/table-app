import React , {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import paginatorFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter, selectFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

function DataList(){
   const [userList, setUserList] = useState([]);
   
   const selectOptions = {
    male: 'male',
    female: 'female',
  };

   const column = [
       {dataField: 'name.first', text: 'Name', sort: true, filter: textFilter()},
       {dataField: 'email', text: 'Email', sort: true},
       {dataField: 'gender', text: 'Gender', formatter: cell => selectOptions[cell],
       filter: selectFilter({
         options: selectOptions
       })},
       {dataField: 'phone', text: 'Phone'}
   ];

   const pagination = paginatorFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function(page, sizePerPage) {
            console.log('page', page);
            console.log("sizePerPage", sizePerPage)
        },
        onSizePerPageChange: function (page, sizePerPage) {
        console.log('page', page);
        console.log("sizePerPage", sizePerPage)
        }
    });

    const clear = () => {
        window.location.reload();
    }

   useEffect(() => {
    fetch('https://randomuser.me/api/?results=50')
    .then(response => response.json())
    .then(result => setUserList(result.results))
    .catch(error => console.log(error));
   }, [])

    return (
        <div>
            <button onClick={clear}>testttt</button>
            <BootstrapTable 
                bootstrap4 
                keyField='cell' 
                columns={column} 
                data={userList}
                pagination={pagination}
                filter={filterFactory()}
                />
        </div>
    );
}

export default DataList;