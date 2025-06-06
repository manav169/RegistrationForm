import { useState } from 'react'
import RegistrationPage from './pages/registration-page'
import HomePage from './pages/home-page'

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const openRegistration = () => {
    setIsRegistrationOpen(true)
  }

  const closeRegistration = () => {
    setIsRegistrationOpen(false)
  }

  return (
    <div className="relative min-h-screen">
      {/* Main content */}
      <HomePage onOpenRegistration={openRegistration} />
      
      {/* Registration overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${
        isRegistrationOpen 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-opacity-50 transition-opacity duration-500"
          onClick={closeRegistration}
        />
        
        {/* Registration form sliding from right */}
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-500 ease-in-out overflow-y-auto ${
          isRegistrationOpen 
            ? 'translate-x-0' 
            : 'translate-x-full'
        }`}>
          {/* Close button */}
          <button
            onClick={closeRegistration}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Registration form */}
          <RegistrationPage />
        </div>
      </div>
    </div>
  )
}

export default App
