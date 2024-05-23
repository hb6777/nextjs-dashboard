 
import { deleteCustomer } from '@/app/lib/actions';
import { Customer } from '@/app/lib/definitions';
import React, { useEffect } from 'react'
import { Modal, Button } from "react-bootstrap"; 


const DeleteConfirmation = ({ showModal , hideModal  , id  ,  message , customer }
    :{showModal:any, hideModal:any, id:any,message:string, customer:Customer }) => {
  
        async function  deleteCustomerById(){
             
            try{ 
                await deleteCustomer(customer);
            }catch(e){
                return({message:'Something went wrong. Cannot delete Customer.'});
            } 
        } 
  
        useEffect(()=>{ 
            var customerTbl = document.getElementById("customerTbl");
           
            if(customerTbl){
                if(showModal){ 
                   // console.log(c);   
                   customerTbl.style.opacity="0.4",
                   customerTbl.style.pointerEvents="none" 
                 } else
                 {  
                    //console.log(showModal,'showModal');   
                    customerTbl.style.opacity="1",
                    customerTbl.style.pointerEvents="auto" 
                 } 
            }
        });
   
    return (   
        <div>    
                <Modal id="myModal" show={showModal} onHide={hideModal} className='bg-blue-600' style={{ borderRadius:'8px', display:'flex', width:'20rem', textAlign:'center',padding:'2rem', top:'30%',  left:'45%',   position:'absolute'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body><div>{message}</div></Modal.Body>
                <Modal.Footer style={{margin:'2rem'}}>
                    <Button style={{padding:'0.5rem', marginRight:'1rem',width:'5rem',border:'1px solid black'}} variant="default" 
                        onClick={hideModal}>
                        Cancel
                    </Button>
                    <Button style={{padding:'0.5rem',width:'5rem',border:'1px solid black'}} variant="danger" 
                        onClick={deleteCustomerById}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>  
        </div>  
    )
}

export default DeleteConfirmation;