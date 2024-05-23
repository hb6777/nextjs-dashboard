import { fetchCustomerById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumb";
import EditCustomerForm from "@/app/ui/customers/edit-customer";


export default async function EditCustomer({params}:{params:{id:string}}){

    const id = params.id;
    const [customer] = await Promise.all([fetchCustomerById(id)]);
 
    const links = [
        {
          text:"Customers",
          link:"/dashboard/customers",
          active:false,
        },
        {
          text:"Edit Customers",
          link:`/dashboard/customers/${id}/edit`,
          active:true,
        }, 
      ];
    
    return(<div>
   {/* import breadcrumbs */}
   {/* <Breadcrumbs linkArrays={links} /> */}
    
    {/* import form components */}
    <EditCustomerForm customer={customer} />
    </div>);

};