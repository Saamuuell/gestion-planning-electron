import { Employee } from "../interfaces/Employee";

export const employees: { [key: string]: Employee } = {
  Elodie: { id: "1", hours: 35, fixedOff: [], role: "vendeuse" },
  Virginie: { id: "2", hours: 35, fixedOff: [], role: "vendeuse" },
  Isabelle: {
    id: "3",
    hours: 30,
    fixedOff: ["Wednesday", "Saturday"],
    role: "vendeuse",
  },
  Lucie: {
    id: "4",
    hours: 6,
    fixedOff: [],
    role: "etudiante",
    fixedTimes: { Saturday: { start: "13:30", end: "19:30" } },
  },
  Camille: {
    id: "5",
    hours: 6,
    fixedOff: [],
    role: "etudiante",
    fixedTimes: { Sunday: { start: "07:30", end: "13:30" } },
  },
  Lola: {
    id: "6",
    hours: 35,
    fixedOff: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    role: "apprentie",
  },
};
