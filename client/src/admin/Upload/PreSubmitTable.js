import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

const PreSubmitTable = props => {
  const objects = props.csv;
  let theColumns = [
    {
      Header: "Title",
      accessor: props.value2
    },
    {
      Header: "Day",
      accessor: props.value3
    },
    {
      Header: "Location",
      accessor: props.value4
    },
    {
      Header: "Start Time",
      accessor: props.value5
    },
    {
      Header: "End Time",
      accessor: props.value6
    }
  ];
  return (
    <React.Fragment>
      <ReactTable
        data={objects}
        columns={theColumns}
        defaultPageSize={15}
        className="-striped -highlight"
      />
    </React.Fragment>
  );
};

export default PreSubmitTable;
