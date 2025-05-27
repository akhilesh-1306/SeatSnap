import {query,mutation} from "./_generated/server"
import { ConvexError,v } from "convex/values"

export const getUserTicketForEvent = query({
    args : {
        userId : v.string(),
        eventId : v.id("events"),
    },
    handler : async (ctx, {userId, eventId}) => {
        const ticket = await ctx.db.query("tickets").withIndex("by_user_event", (q) => q.eq("userId", userId).eq("eventId", eventId)).first();
        return ticket;
    }
});
