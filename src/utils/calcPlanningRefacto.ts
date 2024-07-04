/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  format,
  eachDayOfInterval,
  parseISO,
  startOfDay,
  addHours,
} from "date-fns";
import { employees } from "./Employees";

interface Event {
  resourceId: string;
  start: string;
  end: string;
  title: string;
}

function getTimeISO(date: Date, time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  return format(
    addHours(startOfDay(date), hours + minutes / 60),
    "yyyy-MM-dd'T'HH:mm:ss",
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
    if (["Monday", "Tuesday", "Thursday", "Friday"].includes(dayName)) {
      events.push(...handleStandardDay(date, dayName));
    } else if (dayName === "Saturday" || dayName === "Sunday") {
      events.push(...handleWeekendDay(date, dayName));
    }
  });

  return events;
}

function handleStandardDay(date: Date, _dayName: string): Event[] {
  const morningShifts: Event[] = [];
  const afternoonShifts: Event[] = [];

  employees.forEach((employee) => {
    if (employee.job !== "vendeuse" && employee.job !== "apprentie") {
      return;
    }

    const startMorning = getTimeISO(date, employee.schedule.start);
    const endMorning = getTimeISO(date, "13:30");
    const startAfternoon = getTimeISO(date, "13:30");
    const endAfternoon = getTimeISO(date, employee.schedule.end);

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
  });

  const selectedEvents = [];
  // Ensure there are at least two vendeuses or an apprentie in the morning
  if (morningShifts.length >= 2) {
    selectedEvents.push(...morningShifts.slice(0, 2));
  } else if (morningShifts.length === 1) {
    selectedEvents.push(morningShifts[0]);
    const apprentieShift = morningShifts.find(
      (shift) => employees.find((e) => e.id === shift.resourceId)?.job === "apprentie",
    );
    if (apprentieShift) {
      selectedEvents.push(apprentieShift);
    }
  }

  // Ensure there is at least one vendeuse or an apprentie in the afternoon
  if (afternoonShifts.length >= 1) {
    selectedEvents.push(afternoonShifts[0]);
  } else {
    const apprentieShift = afternoonShifts.find(
      (shift) => employees.find((e) => e.id === shift.resourceId)?.job === "apprentie",
    );
    if (apprentieShift) {
      selectedEvents.push(apprentieShift);
    }
  }

  return selectedEvents;
}

function handleWeekendDay(date: Date, dayName: string): Event[] {
  const shifts: Event[] = [];

  employees.forEach((employee) => {
    if (employee.job === "etudiante" || employee.job === "apprentie") {
      const startTime = getTimeISO(date, employee.schedule.start);
      const endTime = getTimeISO(date, employee.schedule.end);

      shifts.push({
        resourceId: employee.id,
        start: startTime,
        end: endTime,
        title: `${dayName} Shift`,
      });
    }
  });

  return shifts;
}