import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "fullstack=ems" });

// Auto Check-out for employees:
const autoCheckOut = inngest.createFunction(
  { id: "auto-check-out"}, 
  {event: 'employee/check-out'},
  async ({ event, step }) => {
    const {employeeId, attendanceId} = event.data;

    //wait for 9hrs
    await step.sleepUntil("wait-for-the-9-hours", new Date(new Date().getTime()+ 9 *60 * 60 * 1000))

    //get attendance data

    let attendance = await Attendance.findById(attendanceId)

    if(!attendance?.checkOut){
        //get Employee Data
        const employee = await Employee.findById(employeeId)

        //send reminder email


        //after 10hours, mark attendance as checked out with status  "Late"
        await step.sleepUntil("wait-for-the-1-hours", new Date(new Date().getTime()+ 1 *60 * 60 * 1000))

        attendance = await Attendance.findById(attendanceId)
        if(!attendance?.checkOut){
            attendance.checkOut = new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000;
            attendance.workingHours = 4;
            attendance.dayType = "Half Day";
            attendance.status = "LATE"

            await attendance.save()
        }
    }
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [];