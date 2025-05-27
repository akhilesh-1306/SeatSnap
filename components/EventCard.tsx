'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import Spinner from './Spinner';
import { useStorageUrl } from '@/lib/utils';

export default function EventCard({eventId } : {eventId : Id<"events">}) {
  const { user } = useUser();
  const router = useRouter();

  const event = useQuery(api.events.getById, { eventId });
  const availability = useQuery(api.events.getEventAvailability, { eventId });

  const userTicket = useQuery(api.tickets.getUserTicketForEvent, { userId: user?.id || '', eventId });

  const queuePosition = useQuery(api.waitingList.getQueuePosition,{eventId,userId : user?.id || ''});

  const imageUrl = useStorageUrl(event?.imageStorageId);
  

  if(!event){
    return(
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner/>
      </div>
    )
  }
  return (
    <div 
      className="bg-gray-900 text-white p-4 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer flex flex-col items-center sm:items-start w-full max-w-md mx-auto sm:max-w-full" 
      onClick={() => router.push(`/event/${event._id}`)}
    >
      <img 
        src={event.imageStorageId || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
        alt={event.name} 
        className="w-full h-48 object-cover rounded-lg" 
      />
      <div className="mt-3 text-center sm:text-left w-full">
        <h2 className="text-xl font-semibold">{event.name}</h2>
        <p className="text-gray-400 text-sm mt-1">📍 {event.location}</p>
        <p className="text-gray-400 text-sm mt-1">📅 {new Date(event.eventDate).toDateString()}</p>
        <p className="text-gray-400 text-sm mt-1">🆔 {event._id}</p>
        <p className="text-gray-400 text-sm mt-1">💰 Price: ${event.price}</p>
        <p className="text-gray-400 text-sm mt-1">🎟️ Total Tickets: {event.totalTickets}</p>
        <p className="text-gray-300 text-sm mt-2">{event.description}</p>
      </div>
      <button className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full max-w-xs sm:max-w-full">Buy Ticket</button>
    </div>
  );
}


// 1:56:32