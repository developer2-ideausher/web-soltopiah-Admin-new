import BackButton from '@/components/BackButton'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className="flex flex-col gap-7">
       <div className="flex flex-row gap-5 items-center">
        <Link href="/content-manage">
          <BackButton />
        </Link>
        <p className="text-userblack font-semibold text-xl2 font-sans">
        Create Content
          
        </p>
      </div>
    </div>
  )
}

export default page
