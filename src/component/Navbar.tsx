import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between '>
      <div>
        <img src="/icons/logo.svg" alt="logo" className="w-10 h-10"/>
      </div>

      <div className="flex items-center justify-center gap-4 pr-6">
        <img src="/icons/search.svg" className="w-6 h-6 cursor-pointer" alt="search" />
        <img src="/icons/cart.svg" className="w-6 h-6 cursor-pointer" alt="cart" />
      </div>
    </div>
  )
}

export default Navbar