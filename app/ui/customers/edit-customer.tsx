'use client';

import { Customer } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCustomerById } from '@/app/lib/actions'; 
import { useFormState } from 'react-dom';

export default function EditCustomerForm({ 
  customer,
}: { 
  customer: Customer;
})  
{ 
  const initialState = { message: null, errors: {} };
  const updateCustomer = updateCustomerById.bind(null, customer.id);
  const [state, dispatch] = useFormState(updateCustomer, initialState);

 // console.log(updateCustomer,'updateCustomer');
  console.log(state,'state.');
  console.log(state.errors,'state.errors?.image_url.');

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customerName" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <input className='pl-18'
              id='customerName'
              name='name'
              type='text'
              defaultValue={customer.name}
              aria-describedby='customerName-error' />
            {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          <div id="customerName-error" aria-live="polite" aria-atomic="true">
            {state.error?.name &&
              //state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500">
                  {state.error?.name}
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
              id='email'
              name='email'
              type='text'
              defaultValue={customer.email} 
              aria-describedby='email-error'
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.error?.email &&
              //state.error.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" >
                  {state.error?.email}
                </p>
              // ))
            }
          </div>
          </div>
        </div>
 
        {/* image_url */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <input
              id='image_url'
              name='image_url'
              type='text'
              defaultValue={customer.image_url} 
              aria-describedby='image_url-error'
              />
              {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
            </div>
            <div id="image_url-error" aria-live="polite" aria-atomic="true">
            {state.error?.image_url &&
             // state.errors.image_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" >
                  {state.error?.image_url}
                </p>
             // ))
            }
          </div>
          </div>
        </div>
 
      <div aria-live="polite" aria-atomic="true">
            {state &&
                <p className="mt-2 text-sm   text-red-500">
                  {state.message}
                </p>
              }
          </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div></div>
    </form>
  );
}
