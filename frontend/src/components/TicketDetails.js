import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TicketDetails({ editTicket }) {
  const [ticket, setTicket] = useState({
    id: "",
    name: "",
    status: "",
    email: "",
    description: "",
    comments: "",
  });
  const [errors, setErrors] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // GET TICKET BY ID
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/tickets/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ticket");
        }
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };
    fetchTicket();
  }, [id]);

  // Handle form input changes
  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  // Handle ticket update submission
  const handleTicketEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
      });
      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }
      const updatedTicket = await response.json();
      editTicket(updatedTicket);
      console.log("Ticket updated successfully:", updatedTicket);
      alert(
        `Would normally send email here with body: Ticket updated: ${
          (updatedTicket.name, updatedTicket.email, updatedTicket.comments)
        }`
      );
      navigate("/admin-panel");
    } catch (error) {
      console.error("Error updating ticket:", error);
      setErrors("Failed to update ticket. Please try again.");
    }
  };

  return (
    <div>
      <h2>Edit Ticket</h2>
      <form onSubmit={handleTicketEdit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={ticket.name}
              onChange={handleTicketChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={ticket.email}
              onChange={handleTicketChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <select
              name="status"
              value={ticket.status}
              onChange={handleTicketChange}
              required
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={ticket.description}
              onChange={handleTicketChange}
              rows="4"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Comments:
            <textarea
              name="comments"
              value={ticket.comments || ""}
              onChange={handleTicketChange}
              rows="4"
              required
            />
          </label>
        </div>
        <button type="submit">Update Ticket</button>
      </form>
      {errors && <div>{errors}</div>}
    </div>
  );
}

export default TicketDetails;
