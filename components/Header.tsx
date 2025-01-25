"use client"

import { useState } from "react"
import { Menu, Search, Sun, Moon } from "lucide-react"
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { isSignedIn, user } = useUser()

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <span className="text-2xl font-semibold text-teal-600 dark:text-teal-400">SeatSnap</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Features
              </Button>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                About
              </Button>
              {isSignedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                        <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.fullName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.primaryEmailAddress?.emailAddress}
                        </p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SignOutButton>Sign out</SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    className="border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900"
                  >
                    Sign In
                  </Button>
                </SignInButton>
              )}
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button> */}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <Button
              variant="ghost"
              className="w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Features
            </Button>
            <Button
              variant="ghost"
              className="w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              About
            </Button>
            {isSignedIn ? (
              <>
                <div className="flex items-center space-x-4 px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                    <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.fullName}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>
                <SignOutButton>
                  <Button
                    variant="outline"
                    className="w-full border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900"
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="w-full border-teal-500 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900"
                >
                  Sign In
                </Button>
              </SignInButton>
            )}
            {/* <Button
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button> */}
          </div>
        </div>
      )}
    </nav>
  )
}

