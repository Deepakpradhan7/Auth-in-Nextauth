import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // <main className="flex  flex-col items-center justify-between p-24">
      
    // </main>
    <div className='w-full flex justify-center'>
    <div className="bg-fuchsia-300 rounded-lg mx-1 md:mx-0 md:rounded-2xl flex max-w-3xl p-5 items-center">
    <div className="md:block hidden w-1/2">
            <img className="rounded-2xl max-h-[1600px]" src="/authhome.jpg" alt="login form image" />
        </div>
        <div className="md:w-1/2 px-8 text-white">
          <div className="bg-white p-6 mb-6 -mt-10 rounded-md">
          <p className=" text-fuchsia-900 font-semibold text-md">Authguard app demonstrate the authentication process using nextuath. Check it out </p>
          </div>
          <div className="flex gap-10 flex-col">
            <Link href='/register'>
          <p className="font-semibold text-xl text-fuchsia-900">  Don't have an account? <span className="text-white">Register Now</span></p>
          </Link>
          <Link href='/login'>
          <p className="font-semibold text-xl text-fuchsia-900">  Already have an account? <span className="text-white">Login Now</span></p>
          </Link>
          </div>
          
        </div>
        
    </div>
</div>
  );
}
