"use client"

import { useState, Fragment} from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {Login} from "@/components/login" 
import { Dialog } from "@headlessui/react"
import { Transition } from "@headlessui/react"

export function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [currentDialog, setCurrentDialog] = useState(''); // 'signUp' or 'signIn'
  const [stocks, setStocks] = useState([
    { id: 1, name: "Apple Inc.", ticker: "AAPL", price: 125.5 },
    { id: 2, name: "Microsoft Corporation", ticker: "MSFT", price: 250.75 },
    { id: 3, name: "Amazon.com, Inc.", ticker: "AMZN", price: 3150.0 },
    { id: 4, name: "Tesla, Inc.", ticker: "TSLA", price: 650.0 },
    { id: 5, name: "Alphabet Inc.", ticker: "GOOGL", price: 2500.25 },
    { id: 6, name: "Johnson & Johnson", ticker: "JNJ", price: 165.75 },
    { id: 7, name: "Walmart Inc.", ticker: "WMT", price: 142.5 },
    { id: 8, name: "Pfizer Inc.", ticker: "PFE", price: 38.25 },
    { id: 9, name: "The Coca-Cola Company", ticker: "KO", price: 54.0 },
    { id: 10, name: "Exxon Mobil Corporation", ticker: "XOM", price: 56.75 },
  ])
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsOpen(false);
  }

  const handleSetIsOpen = (type) => {
    setCurrentDialog(type);
    setIsOpen(true);
  }
  

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            prefetch={false}
          >
            <MountainIcon className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden gap-4 md:flex">
            <Link
              href="#"
              className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              StockX
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
        {!isLoggedIn ? (
          <>
            <Button variant="outline" className="h-9 px-4 text-sm" onClick={() => handleSetIsOpen("signIn")}>
              Sign In
            </Button>
            <Button className="h-9 px-4 text-sm" onClick={() => handleSetIsOpen("signUp")}>
              Sign Up
            </Button>
          </>
        ) : (
          <Button className="h-9 px-4 text-sm" onClick={() => {
            setIsLoggedIn(false);
            // Add logout logic here
          }}>
            Log Out
          </Button>
        )}

        </div>
      </header>
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}
                  >
                    <SettingsIcon className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="w-full">
            <h2 className="mb-4 text-xl font-bold">Dashboard</h2>
            <Input
              type="search"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Stocks</CardTitle>
                <CardDescription>A table of stock tickers, names, and prices.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStocks.map((stock) => (
                      <TableRow key={stock.id}>
                        <TableCell>{stock.ticker}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg"
                  style={{ backgroundColor: 'white' }} // Inline style to ensure solid white background
                >
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div className="mt-2">
                  <Login onSuccess={handleLoginSuccess} currentDialog={currentDialog} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.18a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.18a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.18a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
