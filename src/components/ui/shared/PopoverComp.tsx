"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TPopoverCompProps = {
  children: React.ReactNode
  popupContent: React.ReactNode
}

const PopoverComp = ({ children, popupContent }: TPopoverCompProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>{popupContent}</PopoverContent>
    </Popover>
  )
}

export default PopoverComp
