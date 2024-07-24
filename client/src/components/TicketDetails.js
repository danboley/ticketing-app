import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById, updateTicket } from "../services/ticketService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const getTicket = async () => {
      try {
        const data = await getTicketById(id);
        setTicket(data);
      } catch (error) {
        toast.error("Error fetching ticket:", error);
      }
    };
    getTicket();
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
      const updatedTicket = await updateTicket(id, ticket);
      editTicket(updatedTicket);
      console.log("Ticket updated successfully...", updatedTicket);
      toast.success(
        `Ticket updated successfully... ${
          (updatedTicket.name, updatedTicket.email, updatedTicket.comments)
        }`
      );
      navigate("/admin-panel");
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Failed to update ticket. Please try again.");
      setErrors("Failed to update ticket. Please try again.");
    }
  };

  // Navigate back to the admin panel
  const handleBackClick = () => {
    navigate("/admin-panel");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6">
      <div className="p-4 border-2 border-white w-full max-w-md mx-auto rounded-lg">
        <button
          className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={handleBackClick}
        >
          {`< `} Back to Admin Panel
        </button>
        <form
          className="space-y-4 p-4 bg-white rounded-lg shadow-md"
          onSubmit={handleTicketEdit}
        >
          <h2 className="text-xl font-semibold mb-4">Update Ticket</h2>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                type="text"
                name="name"
                value={ticket.name}
                onChange={handleTicketChange}
                required
                disabled
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                type="email"
                name="email"
                value={ticket.email}
                onChange={handleTicketChange}
                required
                disabled
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="status" className="block text-gray-700">
              Status:
              <select
                name="status"
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
          <div className="flex flex-col mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description:
              <textarea
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                name="description"
                value={ticket.description}
                onChange={handleTicketChange}
                rows="4"
                required
                disabled
              />
            </label>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="comments" className="block text-gray-700">
              Comments:
              <textarea
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                name="comments"
                value={ticket.comments || ""}
                onChange={handleTicketChange}
                rows="4"
              />
            </label>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            type="submit"
          >
            Update Ticket
          </button>
        </form>
        {errors.length > 0 && <div className="mt-4 text-red-600">{errors}</div>}
      </div>
    </div>
  );
}

export default TicketDetails;
