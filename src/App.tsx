import "./App.css";
import GPButton from "./components/GPButton";
import { useEffect, useState } from "react";
import GPModal from "./components/GPModal";
import SwitchButton from "./components/SwitchButton";
import Calendar from "./components/Calendar";
// import { generateEvents, employees } from "./utils/calcPlanning";
import { generateEvents, employees } from "./utils/calcPlanningRefacto";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

const resources: Array<{ id: string; title: string }> = [];

for (const [key, value] of Object.entries(employees)) {
  resources.push({ id: value.id, title: key });
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(generateEvents("2024-06-01", "2024-06-30"));

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
        {users.map((user: User) => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
      {isModalOpen && <GPModal handleOk={handleOk} handleCancel={closeModal} />}
      <div className="flex flex-row justify-center gap-4 items-center my-3">
        <p className="text-xl text-center">
          Welcome to the planning management system.
        </p>
        <SwitchButton label="Affichage mode semaine" />
      </div>
      <div className="mt-8 w-full max-w-9xl">
        <Calendar
          resources={resources}
          events={generateEvents("2024-06-01", "2024-06-30")}
        />
      </div>
    </div>
  );
}

export default App;
