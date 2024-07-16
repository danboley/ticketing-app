import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";

function TicketAdminPanel({ tickets }) {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRowData(tickets);
  }, [tickets]);

  function dateFormatter(params) {
    if (params.value) {
      return new Date(params.value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    } else {
      return "";
    }
  }

  function statusFormatter(params) {
    if (params.value === "new") {
      return "New";
    } else if (params.value === "in_progress") {
      return "In Progress";
    } else if (params.value === "resolved") {
      return "Resolved";
    } else {
      return params.value; // Return original value if not matched
    }
  }

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Status", field: "status", valueFormatter: statusFormatter },
    { headerName: "Email", field: "email" },
    { headerName: "Description", field: "description" },
    { headerName: "Comments", field: "comments" },
    { headerName: "Date", field: "created_at", valueFormatter: dateFormatter },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => {
        const ticketId = params?.data?.id;
        return (
          <div>
            <a
              className="underline hover:text-gray-600"
              href={`/tickets/${ticketId}`}
            >
              View Details
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 border-2 border-white w-11/12">
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
          />
        </div>
      </div>
    </div>
  );
}

export default TicketAdminPanel;
