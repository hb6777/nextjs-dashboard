import React from 'react'
import Link from 'next/link'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
 

export   function CreateCustomerButton ()  {
  return ( 
        <Link
            href="/dashboard/customers/create"
            className="flex ml-3 h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <span className="hidden md:block">Create Customer</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
  )
} ;

export  function UpdateCustomerButton({id} : {id:string}){

  return(
    <Link
    href={`/dashboard/customers/${id}/edit`}
    className="rounded-md border p-2 hover:bg-gray-200"
  >
    <PencilIcon className="w-5" />
  </Link>
  )
}; 

export function DeleteCustomerButton({id}:{id:string}){
  return(
    <Link href={`/dashboard/customers/${id}/edit}`}
      className="rounded-md border p-2 hover:bg-pink-200"
    >
      <TrashIcon className="w-5" />
    </Link>  
  );
};