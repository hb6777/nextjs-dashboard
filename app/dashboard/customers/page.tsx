import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { TableCellsIcon } from '@heroicons/react/24/outline'; 
import { lusitana } from '@/app/ui/fonts'; 
import { CustomerSkeleton } from '@/app/ui/skeletons';
import CustomersTable from '@/app/ui/customers/table';
import  { fetchCustomers, fetchCustomerPages, fetchFilteredCustomers } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { CreateCustomerButton } from '@/app/ui/customers/button';
import Pagination from '@/app/ui/customers/pagination';

export const metadata:Metadata={
  title: {
    template: '%s | Acme Dashboard',
    default: 'Customers',
  },
};
  
export default async function CustomerPage({searchParams}:{searchParams?:{
    query?:string;
    page?:string;
}}) {
 
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  console.log(query,'query');

  const data = await fetchFilteredCustomers(query, currentPage); 
   const totalPages = await fetchCustomerPages(query);
   
  // fetch customer list
  // const customerList = await fetchCustomers(); 

  return (
      <div className='flex flex-col'> 
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Customers</h1> 
        </div>
    
         <div className='flex justify-between mt-5'>
            <Search placeholder="Search customers..." />
            <CreateCustomerButton />
        </div>  
       <Suspense key={query + currentPage}  fallback={<CustomerSkeleton />}>
           <CustomersTable data={data} query={query} currentPage={currentPage} />  
       </Suspense>
       <div className='flex justify-center mt-5 w-full'>
          <Pagination totalPages={totalPages} />
       </div>
      </div>
    )
};
 