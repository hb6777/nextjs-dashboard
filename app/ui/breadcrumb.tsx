'use client';
import clsx from "clsx";
import Link from "next/link";
import { lusitana } from "./fonts";

interface Breadcrumb {
    text: string;
    link: string;
    active?: boolean;
  }
  

export default function Breadcrumbs({ linkArrays }: { linkArrays: [{text:string;link:string;active:boolean;}] }) {
  
    return (<nav aria-label="Breadcrumb" className="mb-6 block">
        <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
            {
                linkArrays.map((linkItem, index) => (
                    <li
                        key={linkItem.link}
                        aria-current={linkItem.active}
                        className={clsx(
                                linkItem.active ?  'text-gray-900' : 'text-gray-500',
                        )}                                       
                    >
                        <Link href={linkItem?.link}>{linkItem?.text}</Link> 
                        {
                            index < linkArrays.length-1 ? 
                                <span className={clsx('ml-2 mr-2')}>/</span>
                            : null
                        }
                        
                    </li> 

                )) 

            } </ol>

    </nav>)
}