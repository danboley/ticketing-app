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
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 border-2 border-white w-1/3">
        <form
          className="mt-4 p-4 bg-white rounded-lg shadow-md"
          onSubmit={handleTicketEdit}
        >
          <h2 className="text-xl font-semibold mb-4">Update Ticket</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                type="text"
                id="name"
                value={ticket.name}
                onChange={handleTicketChange}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                type="email"
                id="email"
                value={ticket.email}
                onChange={handleTicketChange}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700">
              Status:
              <select
                id="status"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
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
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description:
              <textarea
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                id="description"
                value={ticket.description}
                onChange={handleTicketChange}
                rows="4"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="comments" className="block text-gray-700">
              Comments:
              <textarea
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                id="comments"
                value={ticket.comments || ""}
                onChange={handleTicketChange}
                rows="4"
                required
              />
            </label>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Update Ticket
          </button>
        </form>
        {errors.length > 0 && <div className="mb-4 text-red-600">{errors}</div>}
      </div>
    </div>
  );
}

export default TicketDetails;
