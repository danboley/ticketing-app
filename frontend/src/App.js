import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import TicketForm from "./components/TicketForm";
import TicketAdminPanel from "./components/TicketAdminPanel";
import TicketDetails from "./components/TicketDetails";
import NavBar from "./components/NavBar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function App() {
  const [tickets, setTickets] = useState([]);

  // GET ALL TICKETS
  useEffect(() => {
    try {
      fetch("/tickets")
        .then((res) => res.json())
        .then((data) => setTickets(data));
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }, [tickets.id]);

  // Create Ticket Callback
  function addTicket(newTicket) {
    setTickets((prevTickets) => [...prevTickets, newTicket]);
  }

  // Edit Ticket Callback
  function editTicket(edit) {
    const updatedTickets = tickets?.map((ticket) =>
      ticket?.id === edit?.id ? edit : ticket
    );
    setTickets(updatedTickets);
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<TicketForm />} />
        <Route
          path="/ticket-form"
          element={<TicketForm addTicket={addTicket} />}
        />
        <Route
          path="/admin-panel"
          element={<TicketAdminPanel tickets={tickets} />}
        />
        <Route
          path="/tickets/:id"
          element={<TicketDetails editTicket={editTicket} />}
          // render={(props) => <TicketDetails ticketId={props.match.params.id} />}
        />
      </Routes>
    </div>
  );
}

export default App;
