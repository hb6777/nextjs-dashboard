'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import { error } from 'console';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';  
 
import { Customer } from '@/app/lib/definitions';

 // Use Zod to update the expected types
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
  
  export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };  

const CreateInvoice = FormSchema.omit({ id: true, date: true }); 
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const CustomerFormSchema = z.object({
  id: z.number(), 
  email: z.string().min(1, {message:' '}).email({message:'Invalid email.'}),
  name: z.string().min(1,{
    message: "Customer name is required",
   // invalid_type_error: "First name must be a string",
  }),

  image_url: z.string().min(1, {message:'Image needed.'}),
  // name: z.string({required_error:'Customer name is required..'}),
  // email: z.string({required_error:'Customer Email is required..'}),
  // image_url: z.string()
});
 
// export async function createInvoice(formData: FormData) {
  export type StateCustomer = { 
    errors?: { 
      id?: string[];
      name?: string[];
      email?: string[]; 
      image_url?: string[];
    };
    message: string | null;
  };  

  const CreateCustomer  = CustomerFormSchema.omit({id:true});
  const EditCustomer   = CustomerFormSchema.omit({id:true});

export async function updateCustomerById(
  id: string,
  prevState: StateCustomer,
  formData: FormData
) 
{ 
  const validateFields = EditCustomer.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      image_url: formData.get('image_url'),
  })

  if(validateFields.success===false){
    return({
        error: validateFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Customer.',
    })
  }

  const {name, email, image_url} = validateFields.data;

  try{
    await sql`UPDATE CUSTOMERS SET name=${name}, email=${email}, image_url=${image_url} WHERE ID=${id}`
  }catch(e){
    return ({message: 'Cannot Update Customer.'});
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');

}
 
export async function createCustomerToDB(prevState: StateCustomer, formData: FormData)
{          
  
  // console.log(prevState, 'prevState');
  //  console.log(formData.get('image_url'), 'formData.get( image_url )');

  // Validate form using Zod
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url:  formData.get('image_url'), 
  }); 

  console.log (validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (validatedFields.success===false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { name, email, image_url } = validatedFields.data; 
  
  // Insert data into the database
  try {
    await sql`
      INSERT INTO CUSTOMERS (name, email, image_url)
      VALUES (${name}, ${email}, ${image_url})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Customer.' + error,
    };
  }
 
//      console.log(prevState,'StateCustomer'); 
  
//     // validate with Zod 
//      const validateFields = CustomerFormSchema.safeParse({
//          name: formData.get('customerName'),
//          email: formData.get('email'),
//          image_url: formData.get('image_url'),
//      });
  
//      console.log(validateFields,'validateFields'); 

//      // if validate NOT success, then display errors early. Otherwise, insert to db 
//      if (!validateFields.success){
//          return({
//               error: validateFields.error.flatten().fieldErrors,
//               message: 'Missing Fields. Failed to Create Customer.',
//          });
//      }

//      const { name, email  } = validateFields.data; 
// //'/customers/hector-simpson.png'
//      try{
//          await sql`INSERT INTO CUSTOMERS (name, email, image_url) VALUES (${name}, ${email}, '/customers/hector-simpson.png')`; 
//      }catch(e){
//       throw   error(e);
//          return {message: 'Cannot create Customer.'}
//      }

    // revalidatepath to update cache then redirect to customer page
     revalidatePath('/dashboard/customers');
      redirect('/dashboard/customers');

};

export async function deleteCustomer( customer:Customer ){
   try{
     await sql`DELETE FROM CUSTOMERS WHERE ID=${customer.id}`
     revalidatePath('/dashboard/customers')

   }catch(e){
     return ({message: 'Cannot delete Customer.'});
   }
}

  export async function createInvoice(prevState: State, formData: FormData) {
    
    console.log(prevState);

    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }); 

    console.log (validatedFields);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
   
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }
//export async function updateInvoice(id: string, formData: FormData) {
  export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
  )  {
  // const { customerId, amount, status } = UpdateInvoice.parse({
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // });
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data; 
  const amountInCents = amount * 100;
   
    try{
      await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id} `;
    }
    catch(error){
      return {message:'Cannot update invoice.'};
    }
         
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
 
  // throw new Error('FAILED TO DELETE!!!');
  try{
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } 
  catch(error){
    throw new Error('Cannot delete invoice.!!!');
     // return {message: 'Cannot delete invoice.'};
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'; // + error;
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

