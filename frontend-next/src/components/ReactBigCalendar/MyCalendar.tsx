import React, {useCallback} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)


export default function MyCalendar({calEvents}:any) {

    const dayPropGetter = useCallback(
        (date:any) => ({
                ...(moment(date).day() === 0 && {
                    style: {
                        background: 'linear-gradient(90deg,#FF3B4A, #FF9159)',
                        color: '#fff',
                    },
                }),
        }),
        []
    )

    const slotGroupPropGetter = useCallback(
        () => ({
            style: {
                borderBottom: "1px solid black",
                borderTopp: "1px solid black",
            },
        }),
        []
    )

    return (
        <div className="bg-[rgba(255,255,255,0.8)] w-[80%] h-[550px] flex items-center justify-center p-4 rounded-2xl">
            <Calendar
                localizer={localizer}
                events={calEvents}
                startAccessor="start"
                endAccessor="end"

                dayPropGetter={dayPropGetter}
                slotGroupPropGetter={slotGroupPropGetter}

                views={{
                    month: true,
                    week: true,
                    agenda: true
                }}
                defaultView={"week"}

                style={{ height: 500, width: "100%" }}
            />
        </div>
    )
}