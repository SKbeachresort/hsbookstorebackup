import React from 'react';
import Accordion from '@/app/elements/Accordion';

interface AccordionItem {
  title: string;
  content: string;
};

const TermsConditions = () => {

  // const accordionItems: AccordionItem[] = [
  //   {
  //     title: 'What is Next.js?',
  //     content: 'Next.js is a React framework for building server-side rendered and static web applications.'
  //   },
  //   {
  //     title: 'What is Tailwind CSS?',
  //     content: 'Tailwind CSS is a utility-first CSS framework that makes it easy to build responsive designs quickly.'
  //   },
  //   {
  //     title: 'What are React Icons?',
  //     content: 'React Icons is a library of popular icons to use in React projects.'
  //   }
  // ];

  return (
    <div className="h-[40vh]">
      <h1 className="text-[3vh] my-[3vh] text-center font-medium">
        Terms & Conditionrs
      </h1>

      {/* <div className='w-[60%] mx-auto'>
        <Accordion items={accordionItems} />
      </div> */}
    </div>
  )
}

export default TermsConditions;