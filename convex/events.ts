import {query,mutation} from "./_generated/server"
import { ConvexError,v } from "convex/values"

export const get = query({
    args : {},
    handler : async (ctx)=>{
        return await ctx.db
            .query("events")
            .filter((q)=>q.eq(q.field("is_cancelled"),undefined))
            .collect();
    },
});

export const getById = query({
    args : {eventId : v.id("events")},
    handler : async (ctx, {eventId})=>{
        return await ctx.db.get(eventId);
    }
});