"use client";

import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { profilePic } from "@/constants/data";
import Image from "next/image";

export default function DropDownnComp({ label, list , selectedValue, onSelectValue}) {
  const [selectedOptions, setSelectedOptions] = useState(list[0].name);
  const [index, setIndex] = useState(0);

  const onChange = (data) => {
    setSelectedOptions(data);
  };
  const onSelection = (index)=>{
    setIndex(index)
  }

  useEffect(()=>{
   console.log(selectedValue,"Selected Value")
  },[])

  return (
    <div className="">
      <Select
        size="lg"
        label={label}
        value={selectedValue}
        onSelect={onSelectValue(selectedOptions)}
        onChange={onChange}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            className: "flex items-center px-0 gap-2 pointer-events-none",
          })
        }
      >
        {list.map(({ name, profile_pic },index) => (
          <Option key={name} value={name} className="flex items-center gap-2">
            {profile_pic && (
              <Image
                width={26}
                height={26}
                src={profile_pic}
                alt={name}
                className="h-5 w-5 rounded-full object-cover"
              />
            )}
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}
