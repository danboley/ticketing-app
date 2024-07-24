// GET ALL TICKETS
export const getAllTickets = async () => {
  const response = await fetch("/tickets");
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
};

// GET TICKET BY ID
export const getTicketById = async (id) => {
  const response = await fetch(`/tickets/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch ticket");
  }
  return response.json();
};

// UPDATE TICKET
export const updateTicket = async (id, ticket) => {
  const response = await fetch(`/tickets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  if (!response.ok) {
    throw new Error("Failed to update ticket");
  }
  return response.json();
};

// CREATE TICKET
export const createTicket = async (ticketData) => {
  try {
    const response = await fetch(`/tickets`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit ticket");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
