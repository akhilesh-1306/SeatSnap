"use client"
import { api } from "@/convex/_generated/api";
import {useUser} from "@clerk/nextjs"
import { useMutation } from "convex/react";
import { useEffect } from "react";

function SyncUserData() {

    const {user} = useUser();
    const updateUser = useMutation(api.users.updateUser);
    useEffect(()=>{
        if(!user){
            return;
        }
        const syncUser = async ()=>{
            try{
                await updateUser({
                    userId : user.id,
                    name : `${user.firstName ?? ""}${user.lastName ?? ""}`.trim(),
                    email : user.emailAddresses[0]?.emailAddress ?? "",
                });
            }
            catch(e){
                console.log("Error syncing user",e);
            }
        };
        syncUser();
    },[user, updateUser]);

  return (
    <div></div>
  )
}

export default SyncUserData