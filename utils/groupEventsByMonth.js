import moment from "moment";

export const groupEventsByMonth = (events) => {
  const groupedEvents = {};

  events.forEach((event) => {
    const eventMonth = moment(event.event_date).format("MMMM YYYY");
    if (!groupedEvents[eventMonth]) {
      groupedEvents[eventMonth] = [];
    }
    groupedEvents[eventMonth].push(event);
  });

  return groupedEvents;
};
