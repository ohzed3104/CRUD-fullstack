import React from 'react';

export const Register = () => {
  return (
    <div className="min-h-screen bg-blue-300 flex justify-center items-center p-4">
     
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl p-8">

    
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-200 text-sm mt-2">Join us today! Fill in your details</p>
        </div>

        <form className="space-y-5">
        
          <div>
            <label className="block text-white font-semibold text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Dude"
              className="w-full h-11 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg 
                         text-white placeholder:text-white
                         focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white
                         transition"
            />
          </div>

      
          <div>
            <label className="block text-white font-semibold text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full h-11 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg 
                         text-white placeholder:text-white
                         focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white
                         transition"
            />
          </div>

        
          <div>
            <label className="block text-white font-semibold text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-11 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg 
                         text-white placeholder:text-white
                         focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white
                         transition"
            />
          </div>

        
          <div>
            <label className="block text-white font-semibold text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-11 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg 
                         text-white placeholder:text-white
                         focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white
                         transition"
            />
          </div>

       
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded bg-white/20 border border-white/40 text-blue-600 
                         focus:ring-2 focus:ring-white/50 cursor-pointer"
            />
            <label htmlFor="terms" className="text-gray-100 text-sm cursor-pointer">
              I agree to the <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>
            </label>
          </div>

         
          <button
            type="submit"
            className="w-full h-12 mt-6 bg-white/90 hover:bg-white text-blue-600 font-bold 
                       rounded-lg backdrop-blur-md border border-white/40
                       shadow-md hover:shadow-lg transform hover:scale-[1.02] 
                       transition-all duration-200"
          >
            Create Account
          </button>

          
          <div className="flex items-center gap-3 mt-6 text-sm text-gray-200">
            <div className="flex-1 h-px bg-white/30"></div>
            <span>Already have an account?</span>
            <div className="flex-1 h-px bg-white/30"></div>
          </div>

          <button
            type="button"
            className="w-full h-11 mt-3 bg-transparent border border-white/50 text-white 
                       rounded-lg hover:bg-white/10 transition"
          >
            Sign In
          </button>
        </form>

        
        <div className="mt-8 text-center">
          <p className="text-white/80 text-xs">©copyright 2025 .</p>
        </div>
      </div>
    </div>
  );
};