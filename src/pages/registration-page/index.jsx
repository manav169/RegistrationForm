import React, { useState } from 'react'
import { z } from 'zod'
import logo from '../../assets/logo.png'

// Brand colors
const brandColors = {
  blue: 'rgb(67, 67, 132)',
  red: '#E31C25',
  gray: '#909090'
}

// Zod validation schema with enhanced rules
const registrationSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ),
  
  country: z.string()
    .min(2, 'Country must be at least 2 characters')
    .max(56, 'Country must be less than 56 characters')
    .regex(/^[a-zA-Z\s-]+$/, 'Country can only contain letters, spaces, and hyphens'),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(85, 'City must be less than 85 characters')
    .regex(/^[a-zA-Z\s-]+$/, 'City can only contain letters, spaces, and hyphens'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Please enter a valid phone number with country code (e.g., +1234567890)'
    )
})

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    phone: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data
      const validatedData = registrationSchema.parse(formData)

      // Clear any existing errors
      setErrors({})

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Console log the validated data
      console.log('Registration Data:', validatedData)

      // Show success message
      alert('Registration successful! Check the console for details.')

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to our error format
        const newErrors = {}
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Side - Brand Gradient with Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #000, #e3e3e3 59%, #3a3a3a)'
      }}>
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full blur-xl" style={{
            backgroundColor: `rgba(67, 67, 132, 0.2)`
          }}></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full blur-lg" style={{
            backgroundColor: `${brandColors.red}33`
          }}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full blur-md" style={{
            backgroundColor: `${brandColors.gray}4D`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          {/* Logo */}
          <div className="mb-8">
            <img src={logo} alt="Logo" className="h-16 w-auto mb-6" />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Create Your Account
              <br />
              <span style={{ color: brandColors.gray }}>FOR FREE</span>
            </h1>
            
          </div>

          {/* Decorative illustration area */}
          <div className="w-80 h-80 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10" style={{
            background: `linear-gradient(135deg, rgba(67, 67, 132, 0.3), ${brandColors.red}33)`
          }}>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto" style={{
                backgroundColor: 'rgba(67, 67, 132, 0.4)'
              }}>
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: brandColors.gray }}>Welcome to our platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo for mobile */}
            <div className="lg:hidden mb-6">
              <img src={logo} alt="Logo" className="h-12 w-auto mx-auto" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Registration</h2>
            <p className="text-gray-600">Fill in your details to create your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.firstName ? `border-red-400` : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                  onFocus={(e) => {
                    e.target.style.borderColor = brandColors.blue
                    e.target.style.boxShadow = `0 0 0 2px rgba(67, 67, 132, 0.2)`
                  }}
                  onBlur={(e) => {
                    if (!errors.firstName) {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }
                  }}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm" style={{ color: brandColors.red }}>{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.lastName ? `border-red-400` : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                  onFocus={(e) => {
                    e.target.style.borderColor = brandColors.blue
                    e.target.style.boxShadow = `0 0 0 2px rgba(67, 67, 132, 0.2)`
                  }}
                  onBlur={(e) => {
                    if (!errors.lastName) {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }
                  }}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm" style={{ color: brandColors.red }}>{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? `border-red-400` : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                onFocus={(e) => {
                  e.target.style.borderColor = brandColors.blue
                  e.target.style.boxShadow = `0 0 0 2px rgba(67, 67, 132, 0.2)`
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }
                }}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm" style={{ color: brandColors.red }}>{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.phone ? `border-red-400` : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                onFocus={(e) => {
                  e.target.style.borderColor = brandColors.blue
                  e.target.style.boxShadow = `0 0 0 2px rgba(67, 67, 132, 0.2)`
                }}
                onBlur={(e) => {
                  if (!errors.phone) {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }
                }}
                placeholder="+1234567890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm" style={{ color: brandColors.red }}>{errors.phone}</p>
              )}
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2 text-gray-700">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.country ? `border-red-400` : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                  onFocus={(e) => {
                    e.target.style.borderColor = brandColors.blue
                    e.target.style.boxShadow = `0 0 0 2px rgba(67, 67, 132, 0.2)`
                  }}
                  onBlur={(e) => {
                    if (!errors.country) {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }
                  }}
                  placeholder="Country"
                />
                {errors.country && (
                  <p className="mt-1 text-sm" style={{ color: brandColors.red }}>{errors.country}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2 text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.city ? `border-red-400` : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                  onFocus={(e) => {
                    e.target.style.borderColor = brandColors.blue
                    e.target.style.boxShadow = `0 0 0 2px rgba(67, 67, 132, 0.2)`
                  }}
                  onBlur={(e) => {
                    if (!errors.city) {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }
                  }}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="mt-1 text-sm" style={{ color: brandColors.red }}>{errors.city}</p>
                )}
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-2"
                  style={{
                    accentColor: brandColors.blue
                  }}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I've read and agree with{' '}
                  <a href="#" className="font-medium hover:underline" style={{ color: brandColors.blue }}>
                    Terms of Service
                  </a>{' '}
                  and our{' '}
                  <a href="#" className="font-medium hover:underline" style={{ color: brandColors.blue }}>
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                isSubmitting ? 'cursor-not-allowed' : 'hover:opacity-90'
              }`}
              style={{
                backgroundColor: isSubmitting ? brandColors.gray : brandColors.blue
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#" className="font-medium hover:underline" style={{ color: brandColors.blue }}>
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
