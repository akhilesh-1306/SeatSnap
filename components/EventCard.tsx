"use client"
import React from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function EventCard({eventId } : {eventId : Id<"events">}) {
    const { user } = useUser();
    const router = useRouter();
  
    const event = useQuery(api.events.getById, { eventId });
  
    if (!event) {
      return <div className="text-gray-400">Loading event...</div>;
    }
  
    // return (
    //   <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer" onClick={() => router.push(`/event/${event_id}`)}>
    //     <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-lg" />
    //     <h2 className="text-xl font-semibold mt-3">{event.title}</h2>
    //     <p className="text-gray-400 text-sm mt-1">📍 {event.location}</p>
    //     <p className="text-gray-400 text-sm mt-1">📅 {new Date(event.date).toDateString()}</p>
    //   </div>
    // );
}

export default EventCard