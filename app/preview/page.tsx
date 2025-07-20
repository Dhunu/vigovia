"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

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

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null)

  useEffect(() => {
    const data = searchParams.get("data")
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data))
        setItinerary(parsedData)
      } catch (error) {
        console.error("Error parsing itinerary data:", error)
      }
    }
  }, [searchParams])

  const handlePrint = () => {
    window.print()
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#541C9C] mb-4">Loading Preview...</h1>
          <p className="text-gray-600">Please wait while we prepare your itinerary.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Print Button - Hidden during print */}
      <div className="no-print fixed top-4 right-4 z-50">
        <Button onClick={handlePrint} className="bg-[#541C9C] hover:bg-[#680099] text-white shadow-lg" size="lg">
          Generate PDF
        </Button>
      </div>

      {/* PDF Template Layout */}
      <div className="print-container bg-white">
        {/* Header */}
        <div className="header bg-gradient-to-r from-[#4A90E2] to-[#5BA0F2] text-white p-6 mb-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">vigovia</h1>
              <p className="text-sm opacity-90">PLAN.PACK.GO</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Hi, {itinerary.customerName}</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold">{itinerary.destination} Itinerary</h2>
            <p className="text-lg mt-2">
              {itinerary.totalDays} Days {itinerary.totalDays - 1} Nights
            </p>
          </div>
        </div>

        {/* Trip Overview */}
        <div className="trip-overview bg-gray-50 p-4 mx-6 mb-6">
          <h3 className="font-bold text-lg mb-3">Trip Overview</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <strong>Destination:</strong> {itinerary.destination}
              </p>
              <p>
                <strong>Duration:</strong> {itinerary.totalDays} Days {itinerary.totalDays - 1} Nights
              </p>
            </div>
            <div>
              <p>
                <strong>Travel Dates:</strong> {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                {new Date(itinerary.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Customer:</strong> {itinerary.customerName}
              </p>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        {itinerary.days.map((day, dayIndex) => (
          <div key={day.day} className="day-section mb-8 mx-6">
            {/* Day Header */}
            <div className="day-header bg-[#541C9C] text-white p-4 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Day {day.day}</h3>
                <p className="text-lg">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Activities */}
            {day.activities.map((activity, actIndex) => (
              <div key={activity.id} className="activity-item flex mb-6">
                {/* Time Circle */}
                <div className="time-circle flex-shrink-0 mr-4">
                  <div className="w-16 h-16 bg-[#541C9C] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {activity.time || "TBD"}
                  </div>
                </div>

                {/* Activity Content */}
                <div className="activity-content flex-grow bg-white border border-gray-200 p-4 rounded-lg">
                  <div className="flex">
                    {/* Activity Image Placeholder */}
                    <div className="activity-image w-20 h-16 bg-gray-200 rounded mr-4 flex items-center justify-center text-gray-500 text-xs">
                      IMG
                    </div>

                    {/* Activity Details */}
                    <div className="activity-details flex-grow">
                      <h4 className="font-bold text-lg mb-1">{activity.name}</h4>
                      <p className="text-gray-600 text-sm mb-1">
                        <span className="inline-block mr-4">📍 {activity.location}</span>
                        <span>⏱️ {activity.duration}</span>
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{activity.description}</p>
                    </div>

                    {/* Price */}
                    <div className="activity-price text-right">
                      <p className="text-2xl font-bold text-[#541C9C]">${activity.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Transfers */}
            {day.transfers.map((transfer) => (
              <div key={transfer.id} className="transfer-item flex mb-4">
                {/* Transfer Circle */}
                <div className="transfer-circle flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-[#936FE0] rounded-full flex items-center justify-center text-white font-bold text-xs">
                    🚗
                  </div>
                </div>

                {/* Transfer Content */}
                <div className="transfer-content flex-grow bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold text-sm">
                        Transfer: {transfer.type.replace("-", " ").toUpperCase()}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {transfer.from} → {transfer.to}
                      </p>
                      <p className="text-xs text-gray-500">
                        Time: {transfer.time} | Duration: {transfer.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#541C9C]">${transfer.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Flight Details */}
        {itinerary.flights.length > 0 && (
          <div className="flight-section mx-6 mb-8">
            <div className="section-header bg-[#541C9C] text-white p-4 mb-4">
              <h3 className="text-xl font-bold">Flight Details</h3>
            </div>

            {itinerary.flights.map((flight) => (
              <div key={flight.id} className="flight-item bg-white border border-gray-200 p-4 mb-4 rounded">
                <div className="flex justify-between items-start">
                  <div className="flight-info">
                    <h4 className="font-bold text-lg mb-2">
                      {flight.type === "departure" ? "Departure" : "Return"} Flight
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>
                          <strong>Airline:</strong> {flight.airline}
                        </p>
                        <p>
                          <strong>Flight:</strong> {flight.flightNumber}
                        </p>
                        <p>
                          <strong>Route:</strong> {flight.departure} → {flight.arrival}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}
                        </p>
                        <p>
                          <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flight-price">
                    <p className="text-2xl font-bold text-[#541C9C]">${flight.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="terms-section mx-6 mb-8">
          <div className="section-header bg-[#541C9C] text-white p-4 mb-4">
            <h3 className="text-xl font-bold">Terms and Conditions</h3>
          </div>
          <div className="terms-content bg-gray-50 p-4 text-sm">
            <ul className="space-y-2">
              <li>• All prices are subject to availability and may change without prior notice.</li>
              <li>• Cancellation charges apply as per our standard policy terms.</li>
              <li>• Travel insurance is highly recommended for all international trips.</li>
              <li>• Valid passport and visa (if required) are mandatory for travel.</li>
              <li>• Please arrive at airport 3 hours before international flights.</li>
              <li>• Hotel check-in: 3:00 PM, check-out: 12:00 PM (standard times).</li>
              <li>• Itinerary subject to change due to weather or unforeseen circumstances.</li>
              <li>• All transfers and activities are subject to availability.</li>
            </ul>
          </div>
        </div>

        {/* Total Price */}
        <div className="total-section mx-6 mb-8">
          <div className="bg-[#541C9C] text-white p-6 text-center rounded">
            <h3 className="text-2xl font-bold mb-2">TOTAL</h3>
            <p className="text-4xl font-bold">${itinerary.totalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="footer bg-gray-100 p-6 mt-8">
          <div className="flex justify-between items-start">
            <div className="company-info text-sm text-gray-700">
              <p className="font-bold">Vigovia Travel Technologies (P) Ltd.</p>
              <p>Email: contact@vigovia.com | Phone: +91-98xxx64641</p>
              <p>Address: HD-109 Cinnabar Hills, Links Business Park</p>
              <p>Bangalore North, Bangalore, Karnataka, India-560071</p>
            </div>
            <div className="logo text-right">
              <h2 className="text-2xl font-bold text-[#541C9C]">vigovia</h2>
              <p className="text-xs text-gray-600">PLAN.PACK.GO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-container {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          
          .header {
            background: linear-gradient(to right, #4A90E2, #5BA0F2) !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .day-header, .section-header {
            background: #541C9C !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .time-circle > div {
            background: #541C9C !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .transfer-circle > div {
            background: #936FE0 !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .total-section > div {
            background: #541C9C !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .footer {
            background: #f8f9fa !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .activity-item, .flight-item {
            page-break-inside: avoid;
          }
          
          .day-section {
            page-break-inside: avoid;
          }
        }
        
        @media screen {
          .print-container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            min-height: 297mm;
          }
        }
      `}</style>
    </>
  )
}
