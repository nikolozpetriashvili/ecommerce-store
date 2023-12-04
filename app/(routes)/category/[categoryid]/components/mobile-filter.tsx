'use client'

import Button from "@/components/ui/Button";
import { Color, Size } from "@/types";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import {Dialog} from '@headlessui/react'
import IconButton from "@/components/ui/icon-button";
import Filter from "./filter";

interface MobileFilterProps{
  sizes:Size[]
  colors:Color[]
}

const MobileFilter:React.FC<MobileFilterProps> = ({
  sizes,
  colors
}) => {
  const [open,setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return(
    <>
      <Button className="flex items-center gap-x-2 lg:hidden" onClick={onOpen}>
        Filters
        <Plus size={20}/>
      </Button>

      <Dialog open={open} as="div" className='relative z-40 lg:hidden' onClose={onClose} >
        {/* background */}
        <div className="fixed inset-0 bg-black bg-opacity-25"/>

          {/* Dialog position */}
          <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
              {/*Close button  */}
              <div className="flex items-center justify-end px-4"  >
                <div className="bg-neutral-200 rounded-full p-2 cursor-pointer" onClick={onClose} >
                <X size={15} />
                </div>
              </div>
              {/* Render the filters */}
              <div className="p-4">
                <Filter valueKey="sizeId" name="sizes" data={sizes} />
                <Filter valueKey="colorId" name="colors" data={colors} />
              </div>

            </Dialog.Panel>
          </div>

      </Dialog>
    </>
  )
}

export default MobileFilter;