import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TicketForm({ addTicket }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // CREATE TICKET
  const handleTicketSubmit = (e) => {
    e.preventDefault();
    fetch(`/tickets`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        description: description,
        status: "new",
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to submit ticket");
        }
      })
      .then((data) => {
        addTicket(data);
        console.log("Form submitted:", { name, email, description });
        alert(
          `Ticket successfully submitted: An expert will reach out to you shortly.`
        );
        navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting ticket:", error);
        setErrors(["Failed to submit ticket. Please try again."]);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 border-2 border-white w-1/3">
        <form
          className="mt-4 p-4 bg-white rounded-lg shadow-md"
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
