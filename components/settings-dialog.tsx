"use client"

import * as React from "react"
import {
  Bell,
  Globe,
  Keyboard,
  Link,
  Lock,
  MessageCircle,
  Paintbrush,
  Settings,
  UserCircle,
  ClipboardList,
  Github,
  Slack,
  Figma,
  Trello,
  Upload,
  LogIn,
  UserPlus,
  Key,
  LogOut,
  Plane,
  Volleyball,
  DoorOpen,
  Ratio,
  Mic,
  Phone,
  Shell,
  Atom,
  CalendarClock,
  Laptop,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Image from "next/image"

const data = {
  nav: [
    { name: "Account", icon: UserCircle },
    { name: "Notifications", icon: Bell },
    { name: "Messages & media", icon: MessageCircle },
    { name: "Connected accounts", icon: Link },
    { name: "Audit logs", icon: ClipboardList },
    { name: "Appearance", icon: Paintbrush },
    { name: "Language & region", icon: Globe },
    { name: "Accessibility", icon: Keyboard },
    { name: "Privacy & visibility", icon: Lock },
    { name: "Advanced", icon: Settings },
  ],
}

export default function Page() {
  return (
    <div className="flex h-svh items-center justify-center">
      <SettingsDialog />
    </div>
  )
}

function SettingsDialog() {
  const [open, setOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState("Account")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col justify-center items-center">
        <Image src="/office_and_dragons.svg" alt="Office and Dragons" width={300} height={100} className="mb-6" />
        <DialogTrigger asChild className="justify-center">
          <Button size="sm" className="w-[50%]">Open Dialog</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="overflow-hidden p-0 md:max-h-[600px] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[60%]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.name === selectedOption}
                          onClick={() => setSelectedOption(item.name)}
                        >
                          <a href="#">
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[600px] flex-1 flex-col overflow-hidden">
            <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{selectedOption}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {selectedOption === "Account" && <AccountScreen />}
              {selectedOption === "Connected accounts" && <ConnectedAccountsScreen />}
              {selectedOption === "Notifications" && <NotificationsScreen />}
              {selectedOption === "Audit logs" && <AuditLogsScreen />}
              {!["Account", "Connected accounts", "Notifications", "Audit logs"].includes(selectedOption) && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Select an option from the sidebar</p>
                </div>
              )}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

function AccountScreen() {
  const [avatarSrc, setAvatarSrc] = React.useState("https://github.com/shadcn.png");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setAvatarSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Account</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatarSrc} alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <Button
              size="sm"
              className="h-8"
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Change
            </Button>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="font-semibold">Full Name</Label>
            <Input id="name" placeholder="Name" defaultValue="John Doe" className="h-8" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" type="email" defaultValue="john@example.com" className="h-8" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Phone" type="tel" className="h-8" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Address" className="h-8" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="country">Country</Label>
            <Select>
              <SelectTrigger id="country" className="h-8">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" className="h-8" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" placeholder="ZIP Code" className="h-8" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="timezone">Timezone</Label>
            <Select>
              <SelectTrigger id="timezone" className="h-8">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                <SelectItem value="est">Eastern Time (ET)</SelectItem>
                <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="h-8">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

function ConnectedAccountsScreen() {
  const accounts = [
    { name: "Google", icon: Globe, connected: true, color: "text-red-500", access: "Email, Calendar" },
    { name: "GitHub", icon: Github, connected: false, color: "text-gray-700", access: "Repositories, Issues" },
    { name: "Slack", icon: Slack, connected: true, color: "text-purple-500", access: "Messaging, Channels" },
    { name: "Figma", icon: Figma, connected: false, color: "text-orange-500", access: "Design files, Comments" },
    { name: "Jira", icon: Trello, connected: true, color: "text-blue-500", access: "Projects, Issues" },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Connected Accounts</h2>
      <div className="space-y-1">
        {accounts.map((account) => (
          <div key={account.name} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center space-x-2">
              <account.icon className={`w-5 h-5 ${account.color}`} />
              <div>
                <span className="font-medium">{account.name}</span>
                <p className="text-xs text-muted-foreground">{account.access}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {account.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationsScreen() {
  const [masterEnabled, setMasterEnabled] = React.useState(true)

  const notificationCategories = [
    {
      name: "Email notifications",
      description: "Receive updates and alerts via email",
      subcategories: [
        { name: "Account activity", description: "Notifications about your account actions" },
        { name: "New features", description: "Updates about new platform features" },
        { name: "Marketing", description: "Promotional offers and newsletters" },
      ]
    },
    {
      name: "Push notifications",
      description: "Receive real-time updates on your device",
      subcategories: [
        { name: "Direct messages", description: "Notifications for new messages" },
        { name: "Mentions", description: "Alerts when you're mentioned in discussions" },
        { name: "Comments", description: "Notifications for replies to your posts" },
      ]
    },
    {
      name: "In-app notifications",
      description: "Receive notifications within the application",
      subcategories: [
        { name: "Task assignments", description: "Alerts for new task assignments" },
        { name: "Project updates", description: "Notifications about project changes" },
        { name: "Team activity", description: "Updates on your team's actions" },
      ]
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Notifications</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Enable all notifications</h3>
            <p className="text-sm text-muted-foreground">
              Turn on/off all notifications for this account
            </p>
          </div>
          <Switch checked={masterEnabled} onCheckedChange={setMasterEnabled} />
        </div>
        <Separator />
        {notificationCategories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <Switch disabled={!masterEnabled} />
            </div>
            <div className="ml-4 space-y-2">
              {category.subcategories.map((subcategory, subIndex) => (
                <div key={subIndex} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{subcategory.name}</h4>
                    <p className="text-xs text-muted-foreground">{subcategory.description}</p>
                  </div>
                  <Switch disabled={!masterEnabled} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AuditLogsScreen() {
  const [userFilter, setUserFilter] = React.useState("");
  const [eventFilter, setEventFilter] = React.useState("");
  const [timeFilter, setTimeFilter] = React.useState("all");

  const logs = [
    { user: { name: "Neo Anderson", email: "neo@matrix.com", avatar: "N" }, event: "Entered the Matrix", icon: DoorOpen, time: "2024-11-08T15:45:00Z" },
    { user: { name: "Maverick", email: "maverick@topgun.com", avatar: "M" }, event: "Performed a flyby", icon: Plane, time: "2024-11-08T10:00:00Z" },
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
    const timeMatch = timeFilter === "all" || (
      timeFilter === "24h" && new Date(log.time) > new Date(Date.now() - 24 * 60 * 60 * 1000) ||
      timeFilter === "7d" && new Date(log.time) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ||
      timeFilter === "30d" && new Date(log.time) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    return userMatch && eventMatch && timeMatch;
  });

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
          <Select onValueChange={setTimeFilter} value={timeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 max-h-[430px] overflow-y-auto">
          {filteredLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-2 w-1/3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback>{log.user.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">{log.user.name}</div>
                  <div className="text-xs text-muted-foreground">{log.user.email}</div>
                </div>
              </div>
              <div className="w-1/3 flex items-center text-sm">
                <log.icon className="w-4 h-4 mr-2" />
                {log.event}
              </div>
              <div className="w-1/3 text-right text-sm text-muted-foreground">
                {new Date(log.time).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}