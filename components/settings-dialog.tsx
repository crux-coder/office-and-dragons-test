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
  Shell,
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
import Image from "next/image"
import AccountScreen from "./account-screen"
import ConnectedAccountsScreen from "./integrations-screen"
import NotificationsScreen from "./notifications-screen"
import AuditLogsScreen from "./audit-log-screen"

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
          <Button size="sm" className="w-[60%] p-2"><Shell />Open Mysterious Portal</Button>
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
          <main className="flex h-[600px] flex-1 flex-col w-[100px]">
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
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-auto p-4 pt-0">
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