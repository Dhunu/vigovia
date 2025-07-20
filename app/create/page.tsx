"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Plane, Car, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Activity {
  id: string
  name: string
  description: string
  time: string
  duration: string
  price: number
  location: string
}

interface Transfer {
  id: string
  type: string
  time: string
  from: string
  to: string
  duration: string
  price: number
  capacity: number
}

interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: string
  arrival: string
  departureTime: string
  arrivalTime: string
  price: number
  type: "departure" | "return"
}

interface DayItinerary {
  day: number
  date: string
  activities: Activity[]
  transfers: Transfer[]
}

interface ItineraryData {
  destination: string
  duration: string
  startDate: string
  endDate: string
  totalDays: number
  days: DayItinerary[]
  flights: Flight[]
  customerName: string
  customerEmail: string
  customerPhone: string
  totalPrice: number
}

export default function ItineraryBuilder() {
  const [itinerary, setItinerary] = useState<ItineraryData>({
    destination: "",
    duration: "",
    startDate: "",
    endDate: "",
    totalDays: 1,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    totalPrice: 0,
    days: [],
    flights: [],
  })

  const [currentStep, setCurrentStep] = useState(1)

  // Auto-save data to localStorage
  useEffect(() => {
    const saveData = () => {
      localStorage.setItem("vigovia-itinerary", JSON.stringify(itinerary))
    }

    const timeoutId = setTimeout(saveData, 1000) // Save after 1 second of inactivity
    return () => clearTimeout(timeoutId)
  }, [itinerary])

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("vigovia-itinerary")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setItinerary(parsedData)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  const initializeDays = (numDays: number, startDateStr?: string) => {
    const days: DayItinerary[] = []
    const startDate = new Date(startDateStr || itinerary.startDate)

    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      days.push({
        day: i + 1,
        date: currentDate.toISOString().split("T")[0],
        activities: [],
        transfers: [],
      })
    }

    setItinerary((prev) => ({ ...prev, days, totalDays: numDays }))
  }

  const addActivity = (dayIndex: number) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      name: "",
      description: "",
      time: "",
      duration: "",
      price: 0,
      location: "",
    }

    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex ? { ...day, activities: [...day.activities, newActivity] } : day,
      ),
    }))
  }

  const updateActivity = (dayIndex: number, activityId: string, field: keyof Activity, value: string | number) => {
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              activities: day.activities.map((activity) =>
                activity.id === activityId ? { ...activity, [field]: value } : activity,
              ),
            }
          : day,
      ),
    }))
  }

  const removeActivity = (dayIndex: number, activityId: string) => {
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex
          ? { ...day, activities: day.activities.filter((activity) => activity.id !== activityId) }
          : day,
      ),
    }))
  }

  const addTransfer = (dayIndex: number) => {
    const newTransfer: Transfer = {
      id: Date.now().toString(),
      type: "",
      time: "",
      from: "",
      to: "",
      duration: "",
      price: 0,
      capacity: 1,
    }

    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex ? { ...day, transfers: [...day.transfers, newTransfer] } : day,
      ),
    }))
  }

  const updateTransfer = (dayIndex: number, transferId: string, field: keyof Transfer, value: string | number) => {
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex
          ? {
              ...day,
              transfers: day.transfers.map((transfer) =>
                transfer.id === transferId ? { ...transfer, [field]: value } : transfer,
              ),
            }
          : day,
      ),
    }))
  }

  const removeTransfer = (dayIndex: number, transferId: string) => {
    setItinerary((prev) => ({
      ...prev,
      days: prev.days.map((day, index) =>
        index === dayIndex
          ? { ...day, transfers: day.transfers.filter((transfer) => transfer.id !== transferId) }
          : day,
      ),
    }))
  }

  const addFlight = () => {
    const newFlight: Flight = {
      id: Date.now().toString(),
      airline: "",
      flightNumber: "",
      departure: "",
      arrival: "",
      departureTime: "",
      arrivalTime: "",
      price: 0,
      type: "departure",
    }

    setItinerary((prev) => ({
      ...prev,
      flights: [...prev.flights, newFlight],
    }))
  }

  const updateFlight = (flightId: string, field: keyof Flight, value: string | number) => {
    setItinerary((prev) => ({
      ...prev,
      flights: prev.flights.map((flight) => (flight.id === flightId ? { ...flight, [field]: value } : flight)),
    }))
  }

  const removeFlight = (flightId: string) => {
    setItinerary((prev) => ({
      ...prev,
      flights: prev.flights.filter((flight) => flight.id !== flightId),
    }))
  }

  const calculateTotalPrice = () => {
    let total = 0

    itinerary.days.forEach((day) => {
      day.activities.forEach((activity) => {
        total += activity.price
      })
      day.transfers.forEach((transfer) => {
        total += transfer.price
      })
    })

    itinerary.flights.forEach((flight) => {
      total += flight.price
    })

    setItinerary((prev) => ({ ...prev, totalPrice: total }))
  }

  const handlePreview = () => {
    calculateTotalPrice()
    // Navigate to preview page with itinerary data
    const encodedData = encodeURIComponent(JSON.stringify(itinerary))
    window.open(`/preview?data=${encodedData}`, "_blank")
  }

  const renderBasicInfo = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-[#541C9C]">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={itinerary.customerName}
              onChange={(e) => setItinerary((prev) => ({ ...prev, customerName: e.target.value }))}
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              type="email"
              value={itinerary.customerEmail}
              onChange={(e) => setItinerary((prev) => ({ ...prev, customerEmail: e.target.value }))}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <Label htmlFor="customerPhone">Phone</Label>
            <Input
              id="customerPhone"
              value={itinerary.customerPhone}
              onChange={(e) => setItinerary((prev) => ({ ...prev, customerPhone: e.target.value }))}
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={itinerary.destination}
              onChange={(e) => setItinerary((prev) => ({ ...prev, destination: e.target.value }))}
              placeholder="e.g., Singapore"
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={itinerary.startDate}
              onChange={(e) => {
                const newStartDate = e.target.value
                setItinerary((prev) => ({ ...prev, startDate: newStartDate }))

                // Calculate days automatically when both dates are set
                if (newStartDate && itinerary.endDate) {
                  const start = new Date(newStartDate)
                  const end = new Date(itinerary.endDate)
                  const diffTime = Math.abs(end.getTime() - start.getTime())
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

                  if (diffDays > 0) {
                    setItinerary((prev) => ({ ...prev, totalDays: diffDays }))
                    initializeDays(diffDays, newStartDate)
                  }
                }
              }}
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={itinerary.endDate}
              onChange={(e) => {
                const newEndDate = e.target.value
                setItinerary((prev) => ({ ...prev, endDate: newEndDate }))

                // Calculate days automatically when both dates are set
                if (itinerary.startDate && newEndDate) {
                  const start = new Date(itinerary.startDate)
                  const end = new Date(newEndDate)
                  const diffTime = Math.abs(end.getTime() - start.getTime())
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

                  if (diffDays > 0) {
                    setItinerary((prev) => ({ ...prev, totalDays: diffDays }))
                    initializeDays(diffDays, itinerary.startDate)
                  }
                }
              }}
            />
          </div>
          {itinerary.startDate && itinerary.endDate && (
            <div className="md:col-span-2">
              <div className="bg-[#FBF4FF] p-3 rounded-lg border border-[#936FE0]/20">
                <p className="text-[#541C9C] font-medium">
                  Trip Duration: {itinerary.totalDays} day{itinerary.totalDays !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderDayItinerary = () => (
    <div className="space-y-6">
      {itinerary.days.map((day, dayIndex) => (
        <Card key={day.day} className="border-l-4 border-l-[#541C9C]">
          <CardHeader>
            <CardTitle className="text-[#541C9C] flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Day {day.day} - {new Date(day.date).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Activities Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-[#680099]">Activities</h4>
                <Button onClick={() => addActivity(dayIndex)} size="sm" className="bg-[#541C9C] hover:bg-[#680099] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>

              {day.activities.map((activity, activityIndex) => (
                <Card key={activity.id} className="mb-4 bg-[#FBF4FF]">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label>Activity Name</Label>
                        <Input
                          value={activity.name}
                          onChange={(e) => updateActivity(dayIndex, activity.id, "name", e.target.value)}
                          placeholder="e.g., City Tour"
                        />
                      </div>
                      <div>
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={activity.time}
                          onChange={(e) => updateActivity(dayIndex, activity.id, "time", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          value={activity.duration}
                          onChange={(e) => updateActivity(dayIndex, activity.id, "duration", e.target.value)}
                          placeholder="e.g., 3 hours"
                        />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input
                          value={activity.location}
                          onChange={(e) => updateActivity(dayIndex, activity.id, "location", e.target.value)}
                          placeholder="e.g., Marina Bay"
                        />
                      </div>
                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={activity.price}
                          onChange={(e) =>
                            updateActivity(dayIndex, activity.id, "price", Number.parseFloat(e.target.value) || 0)
                          }
                          placeholder="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={() => removeActivity(dayIndex, activity.id)} variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Description</Label>
                      <Textarea
                        value={activity.description}
                        onChange={(e) => updateActivity(dayIndex, activity.id, "description", e.target.value)}
                        placeholder="Describe the activity..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Transfers Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-[#680099]">Transfers</h4>
                <Button onClick={() => addTransfer(dayIndex)} size="sm" className="bg-[#541C9C] hover:bg-[#680099] text-white">
                  <Car className="h-4 w-4 mr-2" />
                  Add Transfer
                </Button>
              </div>

              {day.transfers.map((transfer) => (
                <Card key={transfer.id} className="mb-4 bg-[#FBF4FF]">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label>Transfer Type</Label>
                        <Select
                          value={transfer.type}
                          onValueChange={(value) => updateTransfer(dayIndex, transfer.id, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private-car">Private Car</SelectItem>
                            <SelectItem value="shared-shuttle">Shared Shuttle</SelectItem>
                            <SelectItem value="taxi">Taxi</SelectItem>
                            <SelectItem value="bus">Bus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={transfer.time}
                          onChange={(e) => updateTransfer(dayIndex, transfer.id, "time", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          value={transfer.duration}
                          onChange={(e) => updateTransfer(dayIndex, transfer.id, "duration", e.target.value)}
                          placeholder="e.g., 30 mins"
                        />
                      </div>
                      <div>
                        <Label>From</Label>
                        <Input
                          value={transfer.from}
                          onChange={(e) => updateTransfer(dayIndex, transfer.id, "from", e.target.value)}
                          placeholder="Starting location"
                        />
                      </div>
                      <div>
                        <Label>To</Label>
                        <Input
                          value={transfer.to}
                          onChange={(e) => updateTransfer(dayIndex, transfer.id, "to", e.target.value)}
                          placeholder="Destination"
                        />
                      </div>
                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={transfer.price}
                          onChange={(e) =>
                            updateTransfer(dayIndex, transfer.id, "price", Number.parseFloat(e.target.value) || 0)
                          }
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label>Capacity</Label>
                        <Input
                          type="number"
                          value={transfer.capacity}
                          onChange={(e) =>
                            updateTransfer(dayIndex, transfer.id, "capacity", Number.parseInt(e.target.value) || 1)
                          }
                          placeholder="Number of people"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={() => removeTransfer(dayIndex, transfer.id)} variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderFlights = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-[#541C9C] flex items-center gap-2">
          <Plane className="h-5 w-5" />
          Flight Details
        </CardTitle>
        <Button onClick={addFlight} size="sm" className="bg-[#936FE0] hover:bg-[#680099] w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Add Flight
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {itinerary.flights.map((flight) => (
          <Card key={flight.id} className="bg-[#FBF4FF]">
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Flight Type</Label>
                  <Select
                    value={flight.type}
                    onValueChange={(value: "departure" | "return") => updateFlight(flight.id, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="departure">Departure</SelectItem>
                      <SelectItem value="return">Return</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Airline</Label>
                  <Input
                    value={flight.airline}
                    onChange={(e) => updateFlight(flight.id, "airline", e.target.value)}
                    placeholder="e.g., Singapore Airlines"
                  />
                </div>
                <div>
                  <Label>Flight Number</Label>
                  <Input
                    value={flight.flightNumber}
                    onChange={(e) => updateFlight(flight.id, "flightNumber", e.target.value)}
                    placeholder="e.g., SQ123"
                  />
                </div>
                <div>
                  <Label>Departure City</Label>
                  <Input
                    value={flight.departure}
                    onChange={(e) => updateFlight(flight.id, "departure", e.target.value)}
                    placeholder="e.g., New York"
                  />
                </div>
                <div>
                  <Label>Arrival City</Label>
                  <Input
                    value={flight.arrival}
                    onChange={(e) => updateFlight(flight.id, "arrival", e.target.value)}
                    placeholder="e.g., Singapore"
                  />
                </div>
                <div>
                  <Label>Departure Time</Label>
                  <Input
                    type="datetime-local"
                    value={flight.departureTime}
                    onChange={(e) => updateFlight(flight.id, "departureTime", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Arrival Time</Label>
                  <Input
                    type="datetime-local"
                    value={flight.arrivalTime}
                    onChange={(e) => updateFlight(flight.id, "arrivalTime", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    value={flight.price}
                    onChange={(e) => updateFlight(flight.id, "price", Number.parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={() => removeFlight(flight.id)} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF4FF] to-white pb-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Button asChild variant="ghost" className="mr-4">
              <Link href="/" className="flex items-center text-[#680099] hover:text-[#541C9C]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#541C9C] mb-2">Vigovia Itinerary Builder</h1>
            <p className="text-[#680099] text-lg">Create beautiful travel itineraries with ease</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center space-x-4 mb-6">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-105 ${
                    currentStep >= step
                      ? "bg-[#541C9C] text-white shadow-lg"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
            <div className="flex justify-center space-x-8 text-sm">
              <span className={currentStep >= 1 ? "text-[#541C9C] font-semibold" : "text-gray-500"}>Basic Info</span>
              <span className={currentStep >= 2 ? "text-[#541C9C] font-semibold" : "text-gray-500"}>
                Daily Itinerary
              </span>
              <span className={currentStep >= 3 ? "text-[#541C9C] font-semibold" : "text-gray-500"}>
                Flights & Generate
              </span>
            </div>
          </div>

          {currentStep === 1 && <div>{renderBasicInfo()}</div>}

          {currentStep === 2 && <div>{renderDayItinerary()}</div>}

          {currentStep === 3 && <div>{renderFlights()}</div>}
        </div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full shadow-2xl border border-gray-200 px-6 py-3 flex items-center space-x-4">
          {currentStep > 1 && (
            <Button
              onClick={() => setCurrentStep(currentStep - 1)}
              variant="outline"
              className="border-[#541C9C] text-[#541C9C] hover:bg-[#541C9C] hover:text-white"
            >
              ← Previous
            </Button>
          )}

          <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${currentStep === step ? "bg-[#541C9C]" : "bg-gray-300"}`}
              />
            ))}
          </div>

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-[#541C9C] hover:bg-[#680099]"
              disabled={
                (currentStep === 1 && (!itinerary.destination || !itinerary.startDate || !itinerary.customerName)) ||
                (currentStep === 2 && itinerary.days.some((day) => day.activities.length === 0))
              }
            >
              Next →
            </Button>
          ) : (
            <Button
              onClick={handlePreview}
              className="bg-gradient-to-r from-[#541C9C] to-[#680099] hover:from-[#680099] hover:to-[#936FE0] text-white"
            >
              Preview Itinerary
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#321E5D] text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Our offerings</h3>
              <ul className="space-y-2 text-sm">
                <li>Holidays</li>
                <li>Visa</li>
                <li>Forex</li>
                <li>Hotels</li>
                <li>Flights</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Popular destinations</h3>
              <ul className="space-y-2 text-sm">
                <li>Dubai</li>
                <li>Bali</li>
                <li>Thailand</li>
                <li>Singapore</li>
                <li>Malaysia</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Vigovia Specials</h3>
              <ul className="space-y-2 text-sm">
                <li>Featured Experience</li>
                <li>Group Tours</li>
                <li>Backpackers Club</li>
                <li>Offline Events</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Vigovia Blog</li>
                <li>Partner Portal</li>
                <li>Accreditations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="text-sm space-y-2">
                <p>Need help? Call us</p>
                <p className="font-semibold">+91-98xxx64641</p>
                <p>Email: contact@vigovia.com</p>
                <p>HD-109 Cinnabar Hills,Links Business Park,Bangalore North,Bangalore,Karnataka,India-560071</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">vigovia</div>
              <span className="text-sm">PLAN.PACK.GO</span>
            </div>
            <div className="text-sm">© 2025 Vigovia Travel Technologies (P) Ltd. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
