import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import MyTickets from "./pages/MyTickets";
import ManageEvents from "./pages/ManageEvents";
import AllBookings from "./pages/AllBookings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/student" element={<StudentDashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/create-event" element={<CreateEvent />} />

        <Route path="/my-tickets" element={<MyTickets />} />

        <Route path="/manage-events" element={<ManageEvents />} />

        <Route path="/all-bookings" element={<AllBookings />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;