import React, {useCallback, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/en-gb'

import "react-big-calendar/lib/css/react-big-calendar.css";
// import "globalize/lib/cultures/globalize.culture.en-GB"


const localizer = momentLocalizer(moment)


export default function MyCalendar({calEvents, handleNavigate, onSelectSlot, onSelectEvent, scrollToTime}:any) {

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
        <div className="bg-[rgba(255,255,255,0.8)] w-[97%] h-[100%] flex items-center justify-center p-4 rounded-2xl">
            <Calendar
                localizer={localizer}
                events={calEvents}
                startAccessor="start"
                endAccessor="end"

                dayPropGetter={dayPropGetter}
                slotGroupPropGetter={slotGroupPropGetter}
                eventPropGetter={(e: any) => ({
                    style: { backgroundColor: e.color }
                })}

                selectable
                onSelectSlot={onSelectSlot}
                onSelectEvent={onSelectEvent}

                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 21, 0, 0)}

                views={{
                    month: true,
                    week: true,
                    day: true,
                    agenda: true
                }}
                defaultView={"day"}
                culture={"en-GB"}
                onNavigate={handleNavigate}
                scrollToTime={scrollToTime}
                style={{ height: "95% ", width: "100%" }}
            />
        </div>
    )
}