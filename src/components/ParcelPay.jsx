import { Link } from "react-router-dom"
import { useState } from "react"
import { MoreHorizontal } from "lucide-react"

const ParcelPay = ({ parcel, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 bg-teal-50 text-teal-700 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right  absolute z-100 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          style={{
            position: 'fixed', 
            top: 'auto', // Let the browser calculate the position
            bottom: 'auto',
          }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Link
              to={`/dashboard/updateparcel/${parcel._id}`}
              className={`block px-4 py-2 text-sm ${parcel.bookingStatus !== "pending" 
                ? "text-gray-400 cursor-not-allowed" 
                : "text-teal-700 hover:bg-teal-50 hover:text-teal-900"}`}
              role="menuitem"
              onClick={(e) => parcel.bookingStatus !== "pending" && e.preventDefault()}
            >
              Update
            </Link>
            
            <button
              onClick={() => {
                onCancel(parcel)
                setIsOpen(false)
              }}
              disabled={parcel.bookingStatus !== "pending"}
              className={`block w-full text-left px-4 py-2 text-sm ${parcel.bookingStatus !== "pending" 
                ? "text-gray-400 cursor-not-allowed" 
                : "text-red-600 hover:bg-red-50 hover:text-red-800"}`}
              role="menuitem"
            >
              Cancel
            </button>
            
            <Link
              to={`/dashboard/payment/${parcel._id}`}
              className="block px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 hover:text-purple-800"
              role="menuitem"
            >
              Pay
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ParcelPay