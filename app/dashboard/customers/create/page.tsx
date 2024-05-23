 
import Breadcrumbs from '@/app/ui/breadcrumb' 
import Form from '@/app/ui/customers/create-form';
import React from 'react' 

const page = () => {
  const links = [
    {
      text:"Customers",
      link:"/dashboard/customers",
      active:false,
    },
    {
      text:"Create Customers",
      link:"/dashboard/customers/create",
      active:true,
    }, 
  ];

  return (
    <div> 
      {/* import breadcrumbs */}
      {/* <Breadcrumbs linkArrays={links} /> */}
    
      {/* import form components */}
      <Form /> 
      {/* customers={[]}/> */}
    
    </div>
  )
}

export default page
