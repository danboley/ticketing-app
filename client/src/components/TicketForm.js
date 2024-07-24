import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../services/ticketService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TicketForm({ addTicket }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // CREATE TICKET
  const handleTicketSubmit = async (e) => {
    try {
      const ticketData = {
        name: name,
        email: email,
        description: description,
        status: "new",
      };

      const data = await createTicket(ticketData);
      addTicket(data);
      console.log("Form submitted:", ticketData);
      toast.success(
        "Ticket successfully submitted. An expert will reach out to you shortly."
      );
      setName("");
      setEmail("");
      setDescription("");
      navigate("/");
    } catch (error) {
      toast.error("Error submitting ticket:", error);
      setErrors(["Failed to submit ticket. Please try again."]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6">
      <div className="p-4 border-2 border-white w-full max-w-md">
        <form
          className="space-y-4 p-4 bg-white rounded-lg shadow-md"
          onSubmit={handleTicketSubmit}
        >
          <h2 className="text-xl font-semibold mb-4">Submit a Ticket</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description:
              <textarea
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:border-2"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                required
              />
            </label>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            type="submit"
          >
            Submit Ticket
          </button>
        </form>
        {errors.length > 0 ? (
          <div className="mb-4 text-red-600">{errors}</div>
        ) : null}
      </div>
    </div>
  );
}

export default TicketForm;
