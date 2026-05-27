import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import { dummyProfileData } from '../assets/assets'
import { MenuIcon, UserIcon, XIcon } from 'lucide-react'

const Sidebar = () => {
  const {pathname} = useLocation()
  const [userName, setUserName]= useState('')
  const [mobileOpen, setMobileOpen]= useState(false)
   
  useEffect(()=>{
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName)
  },[])

   // close mobile sidebar on route change

  useEffect(()=>{
    setMobileOpen(false)
  },[pathname])

  const role = "" || "Employee";

  const sidebarContent = (
    <>
      {/* {Brand Header} */}
        <div className='px-5 pt-6 border-b border-white/6 pb-5'>
          <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                  <UserIcon  className='text-white size-7'/>
                  <div>
                    <p className='font-semibold text-[13px] text-white tracking-wide'>Employee MS</p>
                    <p className='text-[11px] text-slate-500 font-medium'>Management System</p>
                  </div>
              </div>
              {/* {Close button on mobile} */}
              <button onClick={()=>setMobileOpen(false)} className='lg:hidden text-slate-400 hover:text-white p-1'>
                <XIcon size={20}/>
              </button>
          </div>
        </div>


      {/* {User Profile Card} */}
      {userName && (
          <div className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4'>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0'>
                <span className='text-slate-400 text-xs font-semibold'>
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className='min-w-0'>
                <p className='text-[13px] font-medium text-slate-200 truncate'>{userName}</p>
                <p className='text-[11px] text-slate-500 truncate'>{role === "ADMIN"? "Administrator" : "Emloyee"}</p>
              </div>
            </div>
          </div>
      )}


      {/* {Section Label} */}

      {/* {Navigation List} */}

      {/* {Logout} */}
    </>
  )

  return (
    <>
      {/* {Mobile Hamburger button} */}
      <button onClick={()=>setMobileOpen(true)} className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 texxt-white rounded-lg shadow-lg border border-white/10'>
        <MenuIcon size={20}/>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && <div className='lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-440' onClick={()=>setMobileOpen(false)} />}

      {/* {Sidebar - Desktop} */}
      <aside className='hidden lg:flex flex-col h-full w-[260px] bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4'>
        {sidebarContent}
      </aside>
      
      {/* {Sidebar - Mobile} */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flexx-col transform transition-transform 
        duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebarContent}
      </aside>
    </>


  )
}

export default Sidebar