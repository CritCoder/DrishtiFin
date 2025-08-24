"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search } from "lucide-react"

interface AddressComponents {
  fullAddress: string
  street: string
  city: string
  state: string
  pincode: string
  country: string
}

interface AddressAutocompleteProps {
  onAddressSelect: (address: AddressComponents) => void
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  className?: string
  fullAddress?: string
}

interface PincodeData {
  Name: string
  Block: string
  District: string
  State: string
  Country: string
}

export function AddressAutocomplete({
  onAddressSelect,
  placeholder = "Start typing address or PIN code...",
  label = "Address",
  required = false,
  disabled = false,
  className = "",
  fullAddress = ""
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(fullAddress)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Sample Indian cities for autocomplete
  const indianCities = [
    "Mumbai, Maharashtra", "Delhi, Delhi", "Bangalore, Karnataka", "Chennai, Tamil Nadu",
    "Kolkata, West Bengal", "Hyderabad, Telangana", "Pune, Maharashtra", "Ahmedabad, Gujarat",
    "Surat, Gujarat", "Jaipur, Rajasthan", "Lucknow, Uttar Pradesh", "Kanpur, Uttar Pradesh",
    "Nagpur, Maharashtra", "Indore, Madhya Pradesh", "Thane, Maharashtra", "Bhopal, Madhya Pradesh",
    "Visakhapatnam, Andhra Pradesh", "Patna, Bihar", "Vadodara, Gujarat", "Ghaziabad, Uttar Pradesh",
    "Ludhiana, Punjab", "Agra, Uttar Pradesh", "Nashik, Maharashtra", "Faridabad, Haryana",
    "Meerut, Uttar Pradesh", "Rajkot, Gujarat", "Kalyan, Maharashtra", "Vasai-Virar, Maharashtra",
    "Varanasi, Uttar Pradesh", "Srinagar, Jammu and Kashmir", "Aurangabad, Maharashtra",
    "Dhanbad, Jharkhand", "Amritsar, Punjab", "Navi Mumbai, Maharashtra", "Allahabad, Uttar Pradesh",
    "Ranchi, Jharkhand", "Howrah, West Bengal", "Coimbatore, Tamil Nadu", "Jabalpur, Madhya Pradesh",
    "Gwalior, Madhya Pradesh", "Vijayawada, Andhra Pradesh", "Jodhpur, Rajasthan", "Madurai, Tamil Nadu",
    "Raipur, Chhattisgarh", "Kota, Rajasthan", "Gurgaon, Haryana", "Chandigarh, Chandigarh",
    "Solapur, Maharashtra", "Hubballi-Dharwad, Karnataka", "Tiruchirappalli, Tamil Nadu"
  ]

  // Function to search pincode using India Post API
  const searchByPincode = async (pincode: string): Promise<PincodeData[]> => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      const data = await response.json()
      
      if (data && data[0] && data[0].Status === "Success") {
        return data[0].PostOffice || []
      }
      return []
    } catch (error) {
      console.error('Error fetching pincode data:', error)
      return []
    }
  }

  // Debounced search function
  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (inputValue.length < 2) {
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      setIsLoading(true)
      let newSuggestions: string[] = []

      // Check if input is a PIN code (6 digits)
      if (/^\d{6}$/.test(inputValue)) {
        const pincodeData = await searchByPincode(inputValue)
        newSuggestions = pincodeData.map(place => 
          `${place.Name}, ${place.District}, ${place.State} - ${inputValue}`
        ).slice(0, 5)
      } else {
        // Search in Indian cities
        newSuggestions = indianCities
          .filter(city => city.toLowerCase().includes(inputValue.toLowerCase()))
          .slice(0, 8)
      }

      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [inputValue])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        suggestionsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    // Always update the parent with current input
    onAddressSelect({
      fullAddress: value,
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India"
    })
  }, [onAddressSelect])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
    
    // Parse the suggestion to extract components
    const parts = suggestion.split(', ')
    let street = "", city = "", state = "", pincode = ""
    
    if (parts.length >= 2) {
      street = parts[0]
      city = parts[1]
      if (parts.length >= 3) {
        // Check if last part contains pincode
        const lastPart = parts[parts.length - 1]
        const pincodeMatch = lastPart.match(/(\d{6})$/)
        if (pincodeMatch) {
          pincode = pincodeMatch[1]
          state = parts[parts.length - 2]
        } else {
          state = lastPart
        }
      }
    }
    
    onAddressSelect({
      fullAddress: suggestion,
      street,
      city,
      state,
      pincode,
      country: "India"
    })
  }, [onAddressSelect])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div className={`relative space-y-2 ${className}`}>
      {label && (
        <Label htmlFor="address-autocomplete">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        {isLoading && (
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 animate-spin" />
        )}
        <Input
          ref={inputRef}
          id="address-autocomplete"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`pl-10 ${isLoading ? 'pr-10' : ''} ${className}`}
          autoComplete="off"
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-50 last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 text-gray-400 mr-2 flex-shrink-0" />
                  <span>{suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-xs text-slate-500">
        Type a city name or 6-digit PIN code for suggestions
      </p>
    </div>
  )
}

// Separate component for complete address form with individual fields
interface AddressFormProps {
  onAddressChange: (address: AddressComponents) => void
  initialAddress?: Partial<AddressComponents>
  required?: boolean
  disabled?: boolean
}

export function AddressForm({ 
  onAddressChange, 
  initialAddress = {}, 
  required = false, 
  disabled = false 
}: AddressFormProps) {
  const [address, setAddress] = useState<AddressComponents>({
    fullAddress: initialAddress.fullAddress || "",
    street: initialAddress.street || "",
    city: initialAddress.city || "",
    state: initialAddress.state || "",
    pincode: initialAddress.pincode || "",
    country: initialAddress.country || "India"
  })

  // Update parent component when address changes
  useEffect(() => {
    onAddressChange(address)
  }, [address]) // Removed onAddressChange from dependencies to prevent infinite loop

  const updateField = (field: keyof AddressComponents, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }))
  }

  const handleAutocompleteSelect = (selectedAddress: AddressComponents) => {
    setAddress(selectedAddress)
  }

  return (
    <div className="space-y-4">
      <AddressAutocomplete
        onAddressSelect={handleAutocompleteSelect}
        placeholder="Start typing your address..."
        label="Complete Address"
        required={required}
        disabled={disabled}
        fullAddress={address.fullAddress}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="street">
            Street/Area
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id="street"
            value={address.street}
            onChange={(e) => updateField('street', e.target.value)}
            placeholder="Street, Area, Landmark"
            disabled={disabled}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">
            City
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id="city"
            value={address.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="City"
            disabled={disabled}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">
            State
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id="state"
            value={address.state}
            onChange={(e) => updateField('state', e.target.value)}
            placeholder="State"
            disabled={disabled}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pincode">
            PIN Code
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id="pincode"
            value={address.pincode}
            onChange={(e) => updateField('pincode', e.target.value)}
            placeholder="PIN Code"
            disabled={disabled}
            maxLength={6}
          />
        </div>
      </div>
    </div>
  )
}