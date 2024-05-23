import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  Customer,
  CustomersTableType,
   FormattedCustomersTable,
} from '@/app/lib/definitions';
 
import {CreateCustomerButton, UpdateCustomerButton, DeleteCustomerButton} from '@/app/ui/customers/button';
import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data';
import { createRef } from 'react';
 
export default async function CustomersTable({ 
  data,query, currentPage,
}: {   
  data:Customer[];
  query: string;
  currentPage: number;
}) {

  //const customers = await fetchCustomers();
 
  console.log(query,'query tbl');
  
  const customers = await fetchFilteredCustomers(query, currentPage); 
     
  return (
    <div className="w-full">
      {/* <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      
      <div className='flex justify-between mt-5'>
        <Search placeholder="Search customers..." />
        <CreateCustomerButton />
      </div> */}

      <div  id="customerTbl"  className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src= {customer.image_url} 
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div> 
                  </div>

                ))}
              </div>
              <table className="hidden justify-start min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr> 
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6"> 
                    Customer
                    </th> 
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th></th> 
                  </tr>
                </thead>

                <tbody className="divide-y  bg-white  text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap  bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src= {customer.image_url}
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> 
                          <span>{customer.name} </span>
                        </div>
                      </td>
                      
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.email} 
                      </td>
                    
                      <td className="flex bg-white justify-end gap-2 mt-3 mr-3">
                          <UpdateCustomerButton id= {customer.id} />
                          <DeleteCustomerButton customer= {customer} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
