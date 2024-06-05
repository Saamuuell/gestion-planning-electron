import {
  format,
  eachDayOfInterval,
  parseISO,
  startOfDay,
  addHours,
} from "date-fns";

interface TimeRange {
  start: string;
  end: string;
}

interface Employee {
  id: string;
  hours: number;
  fixedOff: string[];
  role: string;
  fixedTimes?: { [key: string]: TimeRange };
}

interface Event {
  resourceId: string;
  start: string;
  end: string;
  title: string;
}

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
    role: "vendeuse",
    fixedTimes: { Saturday: { start: "13:30", end: "19:30" } },
  },
  Camille: {
    id: "5",
    hours: 6,
    fixedOff: [],
    role: "vendeuse",
    fixedTimes: { Sunday: { start: "07:30", end: "13:30" } },
  },
  Lola: {
    id: "6",
    hours: 35,
    fixedOff: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    role: "vendeuse",
  },
};

// Helper function to convert time strings to full ISO strings
function getTimeISO(date: Date, time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  return format(
    addHours(startOfDay(date), hours + minutes / 60),
    "yyyy-MM-dd'T'HH:mm:ss"
  );
}

export function generateEvents(startDate: string, endDate: string): Event[] {
  const dates = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });
  const events: Event[] = [];

  dates.forEach((date) => {
    const dayName = format(date, "EEEE");
    const morningShifts: Event[] = [];
    const afternoonShifts: Event[] = [];

    Object.values(employees).forEach((employee) => {
      if (employee.fixedOff.includes(dayName)) {
        return; // Skip days off
      }

      const startMorning = getTimeISO(date, "06:30");
      const endMorning = getTimeISO(date, "13:30");
      const startAfternoon = getTimeISO(date, "13:30");
      const endAfternoon = getTimeISO(date, "20:30");

      // Check if the employee works this day and has custom times, or use defaults
      const timeRange = employee.fixedTimes?.[dayName] || {
        start: "06:30",
        end: "20:30",
      };

      if (employee.role === "vendeuse") {
        morningShifts.push({
          resourceId: employee.id,
          start: startMorning,
          end: endMorning,
          title: "Morning Shift",
        });
        afternoonShifts.push({
          resourceId: employee.id,
          start: startAfternoon,
          end: endAfternoon,
          title: "Afternoon Shift",
        });
      }
    });

    // Ensure there are at least two vendeuses in the morning
    if (morningShifts.length >= 2) {
      events.push(...morningShifts);
    }

    // Ensure there is at least one vendeuse in the afternoon
    if (afternoonShifts.length >= 1) {
      events.push(afternoonShifts[0]); // Add only the first to meet the minimum requirement
    }
  });

  return events;
}

// Example of usage
// const events = generateEvents('2023-10-01', '2023-10-07');
// console.log(events);
