"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  useEffect(()=>{
    router.push("/login")
  })
  return (
    <div className='modal-container flex flex-wrap gap-3'>
    </div>
  )
}
