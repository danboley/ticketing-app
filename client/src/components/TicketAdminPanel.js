import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {
  dateFormatter,
  statusFormatter,
  textTruncater,
} from "../utils/formatters";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function TicketAdminPanel({ tickets }) {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRowData(tickets);
  }, [tickets]);

  const columnDefs = [
    { headerName: "ID", field: "id", minWidth: 50, flex: 1 },
    { headerName: "Name", field: "name", minWidth: 100, flex: 2 },
    {
      headerName: "Status",
      field: "status",
      minWidth: 100,
      flex: 1,
      valueFormatter: statusFormatter,
    },
    { headerName: "Email", field: "email", minWidth: 150, flex: 2 },
    {
      headerName: "Description",
      field: "description",
      minWidth: 200,
      flex: 3,
      cellRenderer: textTruncater,
    },
    {
      headerName: "Comments",
      field: "comments",
      minWidth: 200,
      flex: 3,
      cellRenderer: textTruncater,
    },
    {
      headerName: "Date",
      field: "created_at",
      minWidth: 150,
      flex: 2,
      valueFormatter: dateFormatter,
    },
  ];

  function handleRowClicked(e) {
    const ticketId = e.data.id;
    navigate(`/tickets/${ticketId}`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="p-4 border-2 border-white w-full max-w-6xl">
        <h2 className="text-white px-3 pb-3 rounded-md text-sm font-medium">
          Manage Your Help Desk Tickets
        </h2>
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            onRowClicked={handleRowClicked}
          />
        </div>
      </div>
    </div>
  );
}

export default TicketAdminPanel;
