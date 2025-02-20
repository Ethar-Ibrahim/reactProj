import React from 'react'
import { Spinner } from '@heroui/react'

export default function LoadingScreen() {
  return (
    <>
    <div className='h-[60vh] flex justify-center items-center'>
        <Spinner color='red' size='lg'/>
        </div>
    </>
  )
}
