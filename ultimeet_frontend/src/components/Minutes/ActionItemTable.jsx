"use client";
import { Card, Typography } from "@material-tailwind/react";
import styles from "../../app/minutes/minutes.module.css";
import { profilePic as profp } from "@/constants/data";
import { TbLink } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import { useState, useEffect } from "react";
import EditActionItemsPopup from "./EditActionItemsPopup";
import { axiosInstance } from '@/api/Axios'
import moment from 'moment';
const TABLE_HEAD = [
  "Action Item",
  "Files",
  "Owner",
  "Reporter",
  "Priority",
  "Due on",
  "Status",
  "Actions",
];

const TABLE_ROWS = [
  {
    name: "User research feedback analysis",
    action_item_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profp,
    reporter: "Jessi",
    priority: "Urgent",
    due_on: "24 June 23",
    status: "In Progress",
  },
  {
    name: "User research feedback analysis",
    action_item_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profp,
    reporter: "Jessi",
    priority: "Medium",
    due_on: "24 June 23",
    status: "In Progress",
  },
  {
    name: "User research feedback analysis",
    action_item_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profp,
    reporter: "Jessi",
    priority: "Low",
    due_on: "24 June 23",
    status: "In Progress",
  },
  {
    name: "User research feedback analysis",
    action_item_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profp,
    reporter: "Jessi",
    priority: "Low",
    due_on: "24 June 23",
    status: "In Progress",
  },
  {
    name: "User research feedback analysis",
    action_item_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profp,
    reporter: "Jessi",
    priority: "Urgent",
    due_on: "24 June 23",
    status: "In Progress",
  },
];

export default function ActionItemTable() {
  const [open, setOpen] = useState(false);
  const [actionItem, setActionItem] = useState([])
  const [selectedRow, setSelectedRow] = useState();

  const handleOpen = (index = null) => { setOpen(!open), index != null ? setSelectedRow(actionItem[index]) : {} }

  const saveHandler = (data) => {
    console.log(data, "on Save")

    let dataUpdate = [...actionItem]
    let index = dataUpdate.findIndex(o => o.action_item_id === data.action_item_id)
    dataUpdate[index] = data;
    setActionItem(dataUpdate)

  }
  useEffect(() => {

    axiosInstance().get("meeting_action_tasks/get_action_items_by_meeting_id/2/").then((res) => {
      setActionItem(res?.data)

    }).catch(e => new Error(e))


  }, [])
  return (
    <div className="bg-white rounded-lg shadow-md  mt-8" style={{ padding: '12px' }}>
      <h2 className="text-primary text-lg font-semibold text-inherit pb-3">
        Action Items
      </h2>
      <Card className={`overflow-scroll w-full ${styles.scrollbarNone}`}>
        <table className="table-auto">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`text-base font-inter leading-none opacity-70 ${styles.actionItemHeader}`}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {actionItem.map(
              (
                {
                  name,
                  action_item_id,
                  file,
                  owner,
                  owner_profile_pic,
                  reporter_profile_pic,
                  reporter,
                  priority,
                  due_on,
                  status,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        color="blue-gray"
                        className="max-w-[150px] font-inter"
                      >
                        <span className={`text-primary text-sm font-medium ${styles.actionItemText}`}>
                          {name}
                        </span>
                        <br />
                        <span className={`text-sm text-[#919BA7] mt-1 ${styles.actionItemText}`}>
                          {action_item_id}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className="font-inter flex items-center gap-2">
                        <TbLink fontSize={16} className="text-primary" />
                        <span className={`text-primary text-sm font-medium ${styles.actionItemText}`}>
                          {file}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className=" font-inter flex items-center gap-2">
                        <Image
                          src={owner_profile_pic || ''}
                          alt={owner}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className={`text-primary text-sm font-medium ${styles.actionItemText}`}>
                          {owner}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className="font-inter flex items-center gap-2">
                        <Image
                          src={reporter_profile_pic || ''}
                          alt={reporter}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className={`text-primary text-sm font-medium ${styles.actionItemText}`}>
                          {reporter}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className="font-inter flex items-center gap-2">
                        <span
                          className={`text-sm px-2 py-1 rounded-sm
                        ${priority === "High" && `{text-[#CA0C0C] bg-[#FDEBEB] ${styles.urgentText}}`
                            }
                        ${priority === "Medium" && "text-[#EEA23E] bg-[#FFF8EB]"
                            }
                        ${priority === "Low" && "text-[#2D8A39] bg-[#F0FAF0]"}
                        `}
                        >
                          {priority}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes} style={{ padding: '0px' }}>
                      <Typography className=" font-inter flex items-center gap-2">
                        <span className={`text-primary text-sm font-medium ${styles.actionItemText}`}>
                          {due_on ? moment(new Date(due_on.toString()).getTime()).format('DD MMM YY') : ''}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className=" font-inter flex items-center gap-2">
                        <span className={`text-primary text-sm font-medium ${styles.actionItemText}`}>
                          {status}
                        </span>
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="text-primary cursor-pointer"
                      >
                        <CiEdit fontSize={18} onClick={() => handleOpen(index)} />
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
      <EditActionItemsPopup onSave={saveHandler} open={open} {...selectedRow} handleOpen={() => handleOpen()} />
    </div>
  );
}
