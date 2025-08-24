"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin } from "lucide-react"

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

export function AddressAutocomplete({
  onAddressSelect,
  placeholder = "Start typing address...",
  label = "Address",
  required = false,
  disabled = false,
  className = "",
  fullAddress = ""
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [inputValue, setInputValue] = useState(fullAddress)

  // Google Maps API key - you'll need to set this in environment variables
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"

  useEffect(() => {
    const initializeAutocomplete = async () => {
      if (!inputRef.current || autocompleteRef.current || !GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_API_KEY") {
        // Fallback to regular input if API key is not configured
        setIsLoaded(true)
        return
      }

      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places"]
        })

        await loader.load()

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          types: ["address"],
          componentRestrictions: { country: "in" }, // Restrict to India
          fields: ["address_components", "formatted_address", "geometry"]
        })

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          
          if (place.address_components && place.formatted_address) {
            const addressComponents: AddressComponents = {
              fullAddress: place.formatted_address,
              street: "",
              city: "",
              state: "",
              pincode: "",
              country: ""
            }

            // Parse address components
            place.address_components.forEach(component => {
              const types = component.types
              const value = component.long_name

              if (types.includes("street_number") || types.includes("route")) {
                addressComponents.street += (addressComponents.street ? " " : "") + value
              } else if (types.includes("locality") || types.includes("administrative_area_level_2")) {
                addressComponents.city = value
              } else if (types.includes("administrative_area_level_1")) {
                addressComponents.state = value
              } else if (types.includes("postal_code")) {
                addressComponents.pincode = value
              } else if (types.includes("country")) {
                addressComponents.country = value
              }
            })

            // If street is empty, try sublocality
            if (!addressComponents.street) {
              place.address_components.forEach(component => {
                if (component.types.includes("sublocality") || component.types.includes("sublocality_level_1")) {
                  addressComponents.street = component.long_name
                }
              })
            }

            setInputValue(place.formatted_address)
            onAddressSelect(addressComponents)
          }
        })

        autocompleteRef.current = autocomplete
        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading Google Maps API:", error)
        setIsLoaded(true) // Fallback to regular input
      }
    }

    initializeAutocomplete()

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [onAddressSelect, GOOGLE_MAPS_API_KEY])

  // Update input value when fullAddress prop changes
  useEffect(() => {
    setInputValue(fullAddress)
  }, [fullAddress])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    
    // If Google Places is not loaded, still allow manual typing
    if (!autocompleteRef.current) {
      onAddressSelect({
        fullAddress: e.target.value,
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India"
      })
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor="address-autocomplete">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          ref={inputRef}
          id="address-autocomplete"
          type="text"
          placeholder={isLoaded ? placeholder : "Loading map services..."}
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled || !isLoaded}
          className={`pl-10 ${className}`}
        />
      </div>
      {!isLoaded && (
        <p className="text-xs text-slate-500">
          {GOOGLE_MAPS_API_KEY === "YOUR_API_KEY" 
            ? "Configure Google Maps API key for address autocomplete" 
            : "Loading address suggestions..."}
        </p>
      )}
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
  }, [address, onAddressChange])

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