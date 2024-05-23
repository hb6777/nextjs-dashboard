'use client';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, createCustomerToDB } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { CustomerField } from '@/app/lib/definitions';
import { useState } from 'react';
 
export default function Form(){ 
 
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCustomerToDB, initialState);
  console.log (state,'state.');
  
  const [inputValue, setinputValue] = useState('');
  
  function handleImage(e:any){ 
    var filename= e.target.files[0].name;  
    setinputValue( "/customers/" + filename);  
  }

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Customer Name:
          </label> 
           <div className="relative">
              <input
                id="customer"
                name="name"
                type="text" 
                placeholder="Enter name ..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
             />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
             {state.errors?.name &&
              //state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={1}>
                  {state.errors?.name}
                </p>
             // ))
              }  
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="email"
                type="text" 
                placeholder="Enter email ..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
             />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
             // state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={2}>
                  {state.errors?.email}
                </p>
             // ))
            }
          </div>
        </div>  

        {/* Image_URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
             Image:  <input type="hidden" defaultValue={inputValue} name="image_url" id="image_url" autoComplete='on' 
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
           ></input>
            <input style={{marginTop:'1rem'}} type="file" id="btnid" onChange={(e)=>handleImage(e)} />         
          </label>  
          <div id="img-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url &&
              //state.errors.image_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={3}>
                  {state.errors?.image_url}
                </p>
             // ))
              }
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
            {state &&   
                <p className="mt-2 text-sm text-red-500" >
                  {state.message}
                </p>
             }
          </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
