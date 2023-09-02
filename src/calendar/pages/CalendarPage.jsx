import { Calendar } from 'react-big-calendar'
import {NavBar, CalendarEvent, CalendarModal}  from "../";

import { addHours} from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css"

import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useUiStore } from '../../hooks';

const events = [
  {
    title: 'My event',
    note: 'This is a cool event',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Nacho'
    }
  }
]




export default function CalendarPage() {
  const { openDateModal} = useUiStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
    return {
      style
    }  
  }
  
  const onDobleClick = (e)=>{
    openDateModal()
  }
  
  const onSelect = (e)=>{
    console.log({
      onClick: e
    })
  }
  
  const onViewChanged = (e)=>{
    localStorage.setItem('lastView', e)
  }


  return (
    <>     
      <NavBar/>
      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView = {lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessagesES()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDobleClick}
      onSelectEvent={onSelect}
      onView={onViewChanged}
      />

      <CalendarModal/>
    </>
  )
}
