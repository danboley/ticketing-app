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
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          addTicket(data);
        });
        console.log("Form submitted:", { name, email, description });
        alert(
          `Ticket successfully submitted: An expert will reach out to you shortly.`
        );
        navigate("/");
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
    <div>
      <h2>Submit a Ticket</h2>
      <form onSubmit={handleTicketSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </label>
        </div>
        <button type="submit">Submit Ticket</button>
      </form>
      {errors ? <div>{errors}</div> : null}
    </div>
  );
}

export default TicketForm;
