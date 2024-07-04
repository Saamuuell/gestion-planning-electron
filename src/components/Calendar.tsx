import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; //https://fullcalendar.io/docs/timeline-view
import frLocale from '@fullcalendar/core/locales/fr';

// export default function Calendar({ events, resources }) {
//   console.log(events);
//   console.log(resources);
//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin]}
//       initialView="resourceTimelineDay"
//       resources={resources}
//       // events={events}
//       resourceAreaWidth="20%"
//       resourceAreaColumns={[
//         {
//           field: "title",
//           headerContent: "Employee",
//         },
//       ]}
//     />
//   );
// }

interface CalendarProps {
  events: Array<any>;
  resources: Array<any>;
}

const Calendar: React.FC<CalendarProps> = ({ events, resources }) => {
  console.log(resources);
  return (
    <FullCalendar
      headerToolbar={{
        left: "today prev,next",
        center: "title",
        right: "resourceTimelineDay,resourceTimelineWeek",
      }}
      plugins={[dayGridPlugin, resourceTimelinePlugin]}
      initialView="resourceTimelineDay"
      resources={resources}
      events={events}
      slotMinTime={"06:00:00"}
      slotMaxTime={"22:00:00"}
      resourceAreaWidth="20%"
      resourceGroupField="job"
      locales={[frLocale]}
      locale={"fr"}
      stickyFooterScrollbar={true}
    />
  );
};

export default Calendar;
