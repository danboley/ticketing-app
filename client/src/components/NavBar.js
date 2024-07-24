import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center border-b-2 border-white">
      <div className="flex items-center">
        <a
          className="text-white px-3 py-2 rounded-md text-sm font-medium"
          href="/"
        >
          Help Desk
        </a>
      </div>
      <div className="flex flex-col md:flex-row md:items-center">
        <NavLink
          className="text-white px-3 py-2 rounded-md text-sm font-medium"
          to="/ticket-form"
        >
          Submit a Ticket
        </NavLink>
        <NavLink
          className="text-white px-3 py-2 rounded-md text-sm font-medium"
          to="/admin-panel"
        >
          Admin Panel
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
