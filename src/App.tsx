import FullCalendar from "@fullcalendar/react";
import "./App.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import GPButton from "./components/GPButton";
import { useState } from "react";
import GPModal from "./components/GPModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButton = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    alert(1);
  };

  return (
    <div className="flex flex-col justify-center items-center px-8 bg-bakery-white min-h-screen text-bakery-yellow">
      <h1 className="text-5xl font-extrabold underline mb-6">O'Pain Délices</h1>
      <GPButton
        className="py-2 px-4 bg-bakery-yellow text-white rounded-lg shadow-lg hover:bg-bakery-darkyellow transition duration-300"
        onClick={handleButton}
      >
        Click Me
      </GPButton>

      {isModalOpen && <GPModal handleOk={handleOk} handleCancel={closeModal} />}

      <p className="mt-6 text-xl text-center">
        Welcome to the planning management system.
      </p>
      <div className="mt-8 w-full max-w-4xl">
        <FullCalendar plugins={[dayGridPlugin]} />
      </div>
    </div>
  );
}

export default App;
