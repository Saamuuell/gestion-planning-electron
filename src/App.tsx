import FullCalendar from "@fullcalendar/react";
import "./App.css";
import GPButton from "./components/GPButton";
import { useEffect, useState } from "react";
import GPModal from "./components/GPModal";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; //https://fullcalendar.io/docs/timeline-view

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleButton = () => {
    setIsModalOpen(true);
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    alert(1);
  };

  return (
    <div className="flex flex-col justify-center items-center px-8 bg-tertiary min-h-screen text-primary">
      <h1 className="text-5xl font-extrabold underline mb-6">O'Pain Délices</h1>
      <GPButton
        className="py-2 px-4 bg-secondary text-white rounded-lg shadow-lg hover:bg-secondary-dark transition-all"
        onClick={handleButton}
      >
        Click Me
      </GPButton>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
      {isModalOpen && <GPModal handleOk={handleOk} handleCancel={closeModal} />}

      <p className="mt-6 text-xl text-center">
        Welcome to the planning management system.
      </p>
      <div className="mt-8 w-full max-w-4xl">
        <FullCalendar plugins={[resourceTimelinePlugin]} />
      </div>
    </div>
  );
}

export default App;
