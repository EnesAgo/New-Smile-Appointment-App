import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";


const localizer = momentLocalizer(moment)


export default function MyCalendar({calEvents}:any) {
    return (
        <div className="bg-[rgba(255,255,255,0.8)] w-[80%] h-[550px] flex items-center justify-center p-4">
            <Calendar
                localizer={localizer}
                events={calEvents}
                startAccessor="start"
                endAccessor="end"
                views={{
                    month: true,
                    week: true,
                    agenda: true
                }}
                style={{ height: 500 }}
            />
        </div>
    )
}