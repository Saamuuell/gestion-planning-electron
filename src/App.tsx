import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import GPButton from "./components/GPButton";
import GPModalCreateEmploye from "./components/GPModalCreateEmploye";
import SwitchButton from "./components/SwitchButton";
import { generateEvents } from "./utils/calcPlanningRefacto";
import { employees } from "./utils/Employees";
import { Employee } from "./interfaces/Employee";

const resources: Array<{ id: string; title: string }> = [];

for (const [key, value] of Object.entries(employees)) {
  resources.push({ id: value.id, title: key });
}

function App() {
  const [isModalCreateEmployeOpen, setIsModalCreateEmployeOpen] =
    useState(false);
  const [isModalCreateRuleOpen, setIsModalCreateRuleOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  // console.log(generateEvents("2024-06-01", "2024-06-30"));

  const handleButtonCreateEmploye = () => {
    setIsModalCreateEmployeOpen(true);
  };

  const handleButtonAddRule = () => {
    setIsModalCreateRuleOpen(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const usersData = await response.json();
      const usersWithTitles = usersData.map((user: Employee) => ({
        ...user,
        title: `${user.first_name} ${user.last_name}`,
      }));
      setEmployees(usersWithTitles);
      console.log(employees);
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
  const closeModalCreateEmploye = () => {
    setIsModalCreateEmployeOpen(false);
  };

  const closeModalCreateRule = () => {
    setIsModalCreateRuleOpen(false);
  };

  const handleOk = () => {
    alert(1);
  };

  return (
    <div className="flex flex-col justify-center items-center px-8 bg-tertiary text-primary w-full">
      <div className="flex justify-between items-center w-full sticky top-0 bg-tertiary z-30">
        <h1 className="text-5xl font-extrabold mb-6">O'Pain Délices</h1>
        <div className="flex flex-col gap-2 py-2">
          <GPButton
            className="py-2 px-4 bg-secondary text-white rounded-lg shadow-lg hover:bg-secondary-dark transition-all"
            onClick={handleButtonCreateEmploye}
          >
            + Ajouter un employé
          </GPButton>
          <GPButton
            className="py-2 px-4 bg-secondary text-white rounded-lg shadow-lg hover:bg-secondary-dark transition-all"
            onClick={handleButtonAddRule}
          >
            + Ajouter une règle
          </GPButton>
        </div>
      </div>
      {isModalCreateEmployeOpen && (
        <GPModalCreateEmploye
          handleOk={handleOk}
          handleCancel={closeModalCreateEmploye}
        />
      )}
      {/* <div className="flex flex-row justify-center gap-4 items-center my-3">
        <SwitchButton label="Affichage mode semaine" />
      </div> */}
      <div className="mt-20 w-full max-w-9xl">
        {isModalCreateRuleOpen && (
          <GPModalCreateEmploye
            handleOk={handleOk}
            handleCancel={closeModalCreateRule}
          />
        )}
        <Calendar
          resources={employees}
          events={generateEvents("2024-06-01", "2024-06-30")}
        />
      </div>
    </div>
  );
}

export default App;
