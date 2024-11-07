import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Atom, CalendarClock, Clock, DoorOpen, Key, Laptop, Mic, Phone, Plane, Shell, Volleyball } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { addDays, format, startOfToday, endOfToday, subHours, startOfMonth, endOfMonth, subMonths } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AuditLogsScreen() {
  const [userFilter, setUserFilter] = React.useState("");
  const [eventFilter, setEventFilter] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [preset, setPreset] = React.useState<string | undefined>("today");

  const logs = [
    { user: { name: "Neo Anderson", email: "neo@matrix.com", avatar: "N" }, event: "Entered the Matrix", icon: DoorOpen, time: "2024-11-07T15:45:00Z" },
    { user: { name: "Maverick", email: "maverick@topgun.com", avatar: "M" }, event: "Performed a flyby", icon: Plane, time: "2024-11-07T10:00:00Z" },
    { user: { name: "Rick Sanchez", email: "rick@rickandmorty.com", avatar: "R" }, event: "Traveled to another dimension", icon: Shell, time: "2024-11-05T20:15:00Z" },
    { user: { name: "Roy Trenneman", email: "roy@itcrowd.com", avatar: "R" }, event: "Fixed a computer", icon: Laptop, time: "2024-11-05T13:55:00Z" },
    { user: { name: "Jack Black", email: "jack@black.com", avatar: "J" }, event: "Performed a live concert", icon: Mic, time: "2024-10-27T20:15:00Z" },
    { user: { name: "Maverick", email: "maverick@topgun.com", avatar: "M" }, event: "Played beach volleyball", icon: Volleyball, time: "2024-10-27T14:00:00Z" },
    { user: { name: "Roy Trenneman", email: "roy@itcrowd.com", avatar: "R" }, event: "Answered a tech support call", icon: Phone, time: "2024-10-21T08:30:00Z" },
    { user: { name: "Rick Sanchez", email: "rick@rickandmorty.com", avatar: "R" }, event: "Invented a portal gun", icon: Atom, time: "2024-10-21T11:45:00Z" },
    { user: { name: "Lara Croft", email: "lara@tombraider.com", avatar: "L" }, event: "Discovered a hidden tomb", icon: Key, time: "2024-10-21T08:30:00Z" },
    { user: { name: "Marty McFly", email: "marty@back2future.com", avatar: "M" }, event: "Traveled back in time", icon: CalendarClock, time: "2024-10-11T23:59:00Z" },
  ];

  const filteredLogs = logs.filter(log => {
    const userMatch = !userFilter || log.user.name.toLowerCase().includes(userFilter.toLowerCase()) || log.user.email.toLowerCase().includes(userFilter.toLowerCase());
    const eventMatch = !eventFilter || log.event.toLowerCase().includes(eventFilter.toLowerCase());
    const dateMatch = date?.from && date?.to && new Date(log.time) >= date.from && new Date(log.time) <= date.to;
    return userMatch && eventMatch && dateMatch;
  });

  const handlePresetChange = (preset: string) => {
    const now = new Date();
    switch (preset) {
      case "lastHour":
        setDate({ from: subHours(now, 1), to: now });
        break;
      case "last6Hours":
        setDate({ from: subHours(now, 6), to: now });
        break;
      case "last12Hours":
        setDate({ from: subHours(now, 12), to: now });
        break;
      case "today":
        setDate({ from: startOfToday(), to: endOfToday() });
        break;
      case "last7Days":
        setDate({ from: addDays(now, -7), to: now });
        break;
      case "thisMonth":
        setDate({ from: startOfMonth(now), to: endOfMonth(now) });
        break;
      case "lastMonth":
        const lastMonth = subMonths(now, 1);
        setDate({ from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) });
        break;
      default:
        setDate(undefined);
    }
    setPreset(preset);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Audit Logs</h2>
      <div className="space-y-1">
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Search users"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="w-[200px]"
          />
          <Input
            placeholder="Search events"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="w-[200px]"
          />
          <div className="flex flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[250px] justify-start text-left font-normal rounded-e-none",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(d) => { setDate(d); setPreset(""); }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Select onValueChange={handlePresetChange} value={preset}>
              <SelectTrigger className="border rounded p-1 rounded-s-none">
                <SelectValue placeholder="Select preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastHour" className="cursor-pointer">
                  <div className="flex w-full flex-1 items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Last Hour</span>
                  </div>
                </SelectItem>
                <SelectItem value="last6Hours" className="cursor-pointer">
                  <div className="flex w-full flex-1 items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Last 6 Hours</span>
                  </div>
                </SelectItem>
                <SelectItem value="last12Hours" className="cursor-pointer">
                  <div className="flex w-full flex-1 items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Last 12 Hours</span>
                  </div>
                </SelectItem>
                <SelectItem value="today" className="cursor-pointer">
                  <div className="flex w-full flex-1 items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Today</span>
                  </div>
                </SelectItem>
                <SelectItem value="last7Days" className="cursor-pointer">
                  <div className="flex w-full flex-1 items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Last 7 Days</span>
                  </div>
                </SelectItem>
                <SelectItem value="thisMonth" className="cursor-pointer">
                  <div className="flex w-full flex-1 items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>This Month</span>
                  </div>
                </SelectItem>
                <SelectItem value="lastMonth" className="cursor-pointer">
                  <div className="flex w-full flex-1 items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Last Month</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="h-full space-y-2 max-h-[430px] overflow-y-auto">
          {filteredLogs.length > 0 ? (
            <>
              <div className="flex items-center justify-between border-y p-1 text-sm">
                <div className="w-1/3">User</div>
                <div className="w-1/3">Event</div>
                <div className="w-1/3">Timestamp</div>
              </div>
              {filteredLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center space-x-2 w-1/3">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>{log.user.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm">{log.user.name}</div>
                      <div className="text-xs text-background">{log.user.email}</div>
                    </div>
                  </div>
                  <div className="w-1/3 flex items-center text-sm">
                    <log.icon className="w-4 h-4 mr-2" />
                    {log.event}
                  </div>
                  <div className="w-1/3 text-left text-sm">
                    {new Date(log.time).toLocaleString()}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col flex-1 text-center text-sm text-muted-foreground">
              No logs within the selected timeframe.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}