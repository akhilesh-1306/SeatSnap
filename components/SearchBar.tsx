
import React from 'react'
import { Search} from "lucide-react"
import { Input } from "@/components/ui/input"
import Form from "next/form"

function SearchBar() {
  return (
    <div>
        <Form action={"/search"}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
                    type="text"
                    name='q'
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
        </Form>
    </div>
  )
}

export default SearchBar