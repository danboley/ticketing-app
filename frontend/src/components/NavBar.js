import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <a href="/">Help Desk</a>
      <NavLink to="/ticket-form">Submit a Ticket</NavLink>
      <NavLink to="/admin-panel">Admin Access</NavLink>
    </div>
  );
}

export default NavBar;
