
const moment = require('moment');


function checkEventOverlap(allEvents, data) {
    for (const event of allEvents) {
        const dataStart = moment(data.start).format("YYYY-MM-DD HH:mm:ss");
        const dataEnd = moment(data.end).format("YYYY-MM-DD HH:mm:ss");
        const eStart = moment(event.start).format("YYYY-MM-DD HH:mm:ss");
        const eEnd = moment(event.end).format("YYYY-MM-DD HH:mm:ss");

        if (
            moment(dataStart).isBetween(eStart, eEnd) ||
            moment(dataEnd).isBetween(eStart, eEnd) ||
            moment(eStart).isBetween(dataStart, dataEnd) ||
            moment(eEnd).isBetween(dataStart, dataEnd)
        ) {
            return { error: "You can't create more than 2 events in one timeline" };
        }
    }

    return "You can add your event";
}
    const data = { //your new event
        start: "01.01.2024",
        end: "02.01.2024"
    }

    const dataTwo = { //your new event
        start: "01.01.2024",
        end: "07.01.2024"
    }
    const allEvents = [
        {
            start: "05.01.2024",
            end: "07.01.2024"
        },
        {
            start: "02.01.2024",
            end: "03.01.2024"
        },
        {
            start: "03.01.2024",
            end: "04.01.2024"
        }
    ]

    console.log(checkEventOverlap(allEvents, data))
// response is "You can add your event"

    console.log(checkEventOverlap(allEvents, dataTwo))
// response is "{ error: "You can't create more than 2 events in one timeline" }"