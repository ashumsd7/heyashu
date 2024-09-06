import React from 'react'
import { TbSeedingOff } from "react-icons/tb";
function PlantingSoon() {
  return (
    <div className='flex flex-col gap-2 opacity-50'>
      <TbSeedingOff className='text-gray-500 text-4xl'/>
      <h2 className="md:text-4xl text-2xl font-light opacity-50">Seeding Soon</h2>
    </div>
  )
}

export default PlantingSoon