"use client"
import { useQuery } from "convex/react"
import {api} from "@/convex/_generated/api"
import Spinner from "./Spinner";

function EventList() {
  const events = useQuery(api.events.get);

  if(!events){
    return(
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner/>
      </div>
    )
  }

  const upcomingEvents = events.filter((event)=>{
    event.eventDate > Date.now()
  }).sort((a,b)=>a.eventDate - b.eventDate);

  
  const pastEvents = events.filter((event)=>{
    event.eventDate <= Date.now()
  }).sort((a,b)=>b.eventDate - a.eventDate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Upcoming Events
          </h1>
          <p>
            Check out and book all of the amazing events
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventList