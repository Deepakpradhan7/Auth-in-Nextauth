import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
const Dashboard = async () => {

    const session = await getServerSession();
    
    if (!session){
        redirect('/login')
    }
  return (
    <div className='w-full flex justify-center items-center pt-20'>
      <h1 className='text-2xl font-bold'> Hey   <span className='text-lg'>{session?.user?.email}!</span></h1>
     
    </div>
  )
}

export default Dashboard
