import { format, eachDayOfInterval, parseISO } from "date-fns";

interface TimeRange {
  start: string;
  end: string;
}

interface Employee {
  hours: number;
  fixedOff: string[];
  role: string;
  fixedTimes?: { [key: string]: TimeRange };
}

interface Schedule {
  [key: string]: { [key: string]: TimeRange | null };
}

const weeklySchedule: { [key: string]: TimeRange | null } = {
  Monday: { start: "06:30", end: "20:30" },
  Tuesday: { start: "06:30", end: "20:30" },
  Wednesday: null, // Fermeture
  Thursday: { start: "06:30", end: "20:30" },
  Friday: { start: "06:30", end: "20:30" },
  Saturday: { start: "06:30", end: "13:30" },
  Sunday: { start: "07:00", end: "13:30" },
};

const employees: { [key: string]: Employee } = {
  Elodie: { hours: 35, fixedOff: [], role: "vendeuse" },
  Virginie: { hours: 35, fixedOff: [], role: "vendeuse" },
  Isabelle: {
    hours: 30,
    fixedOff: ["Wednesday", "Saturday"],
    role: "vendeuse",
  },
  Lucie: {
    hours: 6,
    fixedOff: [],
    role: "etudiante",
    fixedTimes: { Saturday: { start: "13:30", end: "19:30" } },
  },
  Camille: {
    hours: 6,
    fixedOff: [],
    role: "etudiante",
    fixedTimes: { Sunday: { start: "07:30", end: "13:30" } },
  },
  Lola: {
    hours: 35,
    fixedOff: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    role: "apprentie",
  },
};

export function generateSchedule(startDate: string, endDate: string): Schedule {
  const dates = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });
  const schedule: Schedule = {};

  dates.forEach((date) => {
    const dayName = format(date, "EEEE");
    schedule[dayName] = {};
    const hours = weeklySchedule[dayName];
    if (hours === null) {
      schedule[dayName] = {};
    } else {
      for (const employeeName in employees) {
        const employee = employees[employeeName];
        if (employee.fixedOff.includes(dayName)) {
          continue;
        }
        const employeeSchedule = employee.fixedTimes?.[dayName] || hours;
        schedule[dayName][employeeName] = employeeSchedule;
      }
    }
  });

  return schedule;
}

// Exemple d'utilisation
