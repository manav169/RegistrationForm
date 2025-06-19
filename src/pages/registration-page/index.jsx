import React, { useState } from 'react'
import { z } from 'zod'
import logo from '../../assets/logo.png'

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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-300 to-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img src={logo} alt="Logo" className="mx-auto mb-4 relative z-10" style={{ maxWidth: '150px' }} />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          </div>
          <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-white via-white-200 to-pink-200 bg-clip-text text-transparent mb-3 drop-shadow-lg">
            Registration Form
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto mb-4 rounded-full shadow-lg"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative">
          {/* Colorful top border */}
          <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400"></div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="relative">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 border-2 ${
                          errors.firstName ? 'border-red-400' : 'border-purple-200'
                        } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200 bg-gradient-to-r from-purple-50 to-pink-50`}
                        placeholder="Enter your first name"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 pointer-events-none"></div>
                    </div>
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 border-2 ${
                          errors.lastName ? 'border-red-400' : 'border-purple-200'
                        } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200 bg-gradient-to-r from-purple-50 to-pink-50`}
                        placeholder="Enter your last name"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 pointer-events-none"></div>
                    </div>
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                
                               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="md:col-span-2 relative">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 border-2 ${
                          errors.email ? 'border-red-400' : 'border-blue-200'
                        } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 bg-gradient-to-r from-blue-50 to-cyan-50`}
                        placeholder="Enter your email address"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-cyan-400/10 pointer-events-none"></div>
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-2 relative">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 border-2 ${
                          errors.phone ? 'border-red-400' : 'border-blue-200'
                        } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 bg-gradient-to-r from-blue-50 to-cyan-50`}
                        placeholder="+1234567890"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-cyan-400/10 pointer-events-none"></div>
                    </div>
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Information Section */}
              <div className="space-y-6">             
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country */}
                  <div className="relative">
                    <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                      Country *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 border-2 ${
                          errors.country ? 'border-red-400' : 'border-green-200'
                        } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200 bg-gradient-to-r from-green-50 to-emerald-50`}
                        placeholder="Enter your country"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 pointer-events-none"></div>
                    </div>
                    {errors.country && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.country}</p>
                    )}
                  </div>

                  {/* City */}
                  <div className="relative">
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 border-2 ${
                          errors.city ? 'border-red-400' : 'border-green-200'
                        } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition duration-200 bg-gradient-to-r from-green-50 to-emerald-50`}
                        placeholder="Enter your city"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/10 pointer-events-none"></div>
                    </div>
                    {errors.city && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.city}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full relative overflow-hidden py-4 px-6 border-0 rounded-2xl shadow-lg text-lg font-bold text-white transform transition-all duration-200 ${
                    isSubmitting 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 hover:scale-105 hover:shadow-xl'
                  } focus:outline-none focus:ring-4 focus:ring-purple-300`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? '🔄 Submitting...' : 'Submit'}
                  </span>
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer decorative elements */}
        <div className="text-center mt-8">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
