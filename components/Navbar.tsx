'use client'
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

const Navbar = () => {
    const session = useSession()
   
  return (
    <div className="text-md font-semibold px-6">
      <ul className="flex py-8 justify-between items-center">
        <div>
            <Link href='/' className="text-fuchsia-900 text-lg">
                <li>AuthGuard</li>
            </Link>
        </div>
        <div className="flex gap-3 md:gap-5">
            <Link href='/dashboard' className="text-fuchsia-900">
                <li>Dashboard</li>
            </Link>
            {session.status == 'unauthenticated' ? (
                <><Link href='/login' className="text-fuchsia-900">
                <li>Login</li>
            </Link>
            <Link href='/register' className="text-fuchsia-900">
                <li>Register</li>
            </Link></>
            ):(
                <>
                {/* <span className="text-fuchsia-900 text-sm"> {session?.data?.user?.name}</span> */}
                
                <button className="text-orange-400 text-md"   onClick={()=>signOut()}>Sign Out</button>
                </>
            ) }
            
        </div>
        
      </ul>
    </div>
  )
}

export default Navbar
