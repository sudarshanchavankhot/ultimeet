import { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import { TbLink } from "react-icons/tb";

import styles from "../../app/minutes/minutes.module.css";
import { IoCloseSharp } from "react-icons/io5";
import DropDownnComp from "./DropDownComp";
import {
  ownerList,
  priorityList,
  reporterList,
  statusList,
} from "@/constants/data";

import { useEffect, useState } from "react";
import { axiosInstance } from '@/api/Axios'
/*
{owner, reporter, priority, due_on, status}
*/

export default function EditActionItemsPopup({action_item_id,name, open, handleOpen, owner, reporter, priority, due_on, status, onSave }) {
   const [participentlist, setParticipentlist] = useState({});
   const [Due_on, setDueOn] = useState(due_on)
   const [Owner, setowner] = useState(owner)
   const [Reporter, setReporter] = useState(reporter)
   const [Priority, setpriority] = useState(priority)
   const [Status, setStatus] = useState(status)
   const [dependency, setDependency ] = useState("")
   const [comments, setComments ] = useState("")
   const [resquest, setRequest] = useState({})
  useEffect(()=>{
   axiosInstance().get("recording_transcription/users_list/").then((res)=>{
      setParticipentlist(res.data)
   }).catch(e=>  new Error(e) )
  },[])


  /*
  {
        "action_item_id": 91,
        "name": "Reflect Historical Changes in Narrow MR Rate Target",
        "owner": "Eric Johnson",
        "reporter": "Eric Johnson",
        "priority": "High",
        "due_on": "2023-07-16",
        "status": "Open",
        "actions": "",
        "reporter_profile_pic": "https://www.classicaloasis.com/wp-content/uploads/2014/03/profile-square.jpg",
        "owner_profile_pic": "https://www.classicaloasis.com/wp-content/uploads/2014/03/profile-square.jpg"
    }
  
  */
  const  updateActionList =() =>{
   const data = {
      "name": name,
      "owner": Owner,
      "reporter": Reporter,
      "priority": Priority,
      "due_on": Due_on,
      "status": Status,
      "actions": "",
      "dependencies": dependency,
      "comments": comments,
      "reporter_profile_pic" : participentlist.find(o => o.name === Reporter).profile_pic,
      "owner_profile_pic": participentlist.find(o => o.name === Owner).profile_pic
    }
    setRequest({...data, action_item_id});
    onSave({...data, action_item_id})
    axiosInstance().put(`meeting_action_tasks/update_action_item/${action_item_id}/`,data)
    .then(res=>
      handleOpen()
    ).catch(e => new Error(e),setRequest({}))
  }
  const handleOwnerChange =(data)=>{
    console.log("owner",data )
    setowner(data)
  } 
  const handleReporterChange =(data)=>{
    setReporter(data)
  }
  const handleStatusChange =(data)=>{
    setStatus(data)
  }
  const handlePriorityChange =(data)=>{
    setpriority(data)
  }
   // co
  const handleDateChange =($event)=>{
    console.log($event.target.value,"$event.target.valu")
    setDueOn($event.target.value)
   // console.log($event.target.value);
  }
  const  handleDependencyChange =($event)=>{
    setDependency($event.target.value)
   // console.log($event.target.value);
  }
  const handleCommentsChange =($event)=>{
    setComments($event.target.value)
   // console.log($event.target.value);
  }
  
  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogBody
          className={`h-[36rem] overflow-scroll p-5 ${styles.scrollNone}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-primary text-lg font-inter">Action Items</h2>
            <IoCloseSharp
              className="text-primary cursor-pointer"
              fontSize={24}
              onClick={handleOpen}
            />
          </div>
          <div className="mt-5">
            <h3
              className="text-primary text-lg font-medium"
              style={{
                fontFamily: "Inter",
              }}
            >
              {name}
            </h3>
            <p
              className="text-[#919BA7] text-sm"
              style={{
                fontFamily: "Inter",
              }}
            >
              #{action_item_id}
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: "Inter",
              }}
            >
              <TbLink fontSize={20} className="text-primary" />
              <p className="text-primary text-base font-medium">Figjam</p>
            </div>
            <div>
              <label
                htmlFor="attachment"
                className="text-[#2161D1] text-base cursor-pointer"
              >
                + Add attachment
              </label>
              <input type="file" id="attachment" className="hidden" />
            </div>
          </div>
          <form className="mt-6">
            <div className="grid grid-flow-col grid-cols-2 gap-8">
              <DropDownnComp label="Owner" list={participentlist}  onSelectValue={handleOwnerChange} selectedValue={owner} />
              <DropDownnComp label="Reporter" list={participentlist} onSelectValue={handleReporterChange} selectedValue={reporter} />
            </div>
            <div className="grid grid-flow-col grid-cols-2 gap-8 mt-6">
              <div className="col-span-1">
                <DropDownnComp label="Priority" list={priorityList} onSelectValue={handlePriorityChange} selectedValue={priority}  />
              </div>
              <Input type="date" label="Due on" onChange={handleDateChange} value={Due_on} className="col-span-1" />
              <p>{Due_on}</p>
            </div>
            <div className="grid grid-flow-col grid-cols-2 gap-8 mt-6">
              <div className="col-span-1">
                <DropDownnComp label="Status" selectedValue={status} onSelectValue={handleStatusChange} list={statusList} />
              </div>
            </div>
            <div className="mt-6">
              <label
                className="text-primary text-base py-1 pb-2"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Dependencies
              </label>
              <Input type="text" value={dependency} onChange={handleDependencyChange} label="Dependencies" className="" />
            </div>
            <div className="mt-6">
              <label
                className="text-primary text-base py-1 pb-2"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Comments
              </label>
              <Input type="text" value={comments} onChange={handleCommentsChange} label="Comments" className="" />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            className="text-primary border border-slate-400 capitalize text-base bg-white"
            onClick={handleOpen}
          >
            Cancel
          </Button>
          <Button
            className="bg-darkBlue text-white text-base capitalize"
            onClick={updateActionList}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
