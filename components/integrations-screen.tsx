"use client";

import { BadgeCheck, EllipsisVertical, Figma, Github, Globe, Slack, Trello, Loader } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ConnectedAccountsScreen() {
  const [accounts, setAccounts] = useState([
    { name: "Google", icon: Globe, connected: true, color: "text-red-500", access: ["Email", "Calendar", "Drive", "Contacts"], description: "Google provides a suite of productivity tools including email and calendar." },
    { name: "GitHub", icon: Github, connected: false, color: "text-gray-700", access: ["Repositories", "Issues", "Pull Requests"], description: "GitHub is a platform for version control and collaboration." },
    { name: "Slack", icon: Slack, connected: false, color: "text-purple-500", access: ["Messaging", "Channels", "Files"], description: "Slack is a messaging app for teams and workplaces." },
    { name: "Figma", icon: Figma, connected: false, color: "text-orange-500", access: ["Design files", "Comments"], description: "Figma is a web-based UI/UX design application." },
    { name: "Jira", icon: Trello, connected: false, color: "text-blue-500", access: ["Projects", "Issues", "Sprints", "Backlog"], description: "Jira is a tool for project management and issue tracking." },
  ]);

  const [loading, setLoading] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<string | null>(null);
  const [connectDialogOpen, setConnectDialogOpen] = useState<string | null>(null);

  const toggleConnection = (accountName: string) => {
    setLoading(accountName);
    setTimeout(() => {
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.name === accountName ? { ...account, connected: !account.connected } : account
        )
      );
      const account = accounts.find(acc => acc.name === accountName);
      if (account) {
        const action = account.connected ? "disconnected from" : "connected to";
        toast.success(`Successfully ${action} ${accountName}`);
      }
      setLoading(null);
    }, 2000);
  };

  const connectedAccounts = accounts.filter(account => account.connected);
  const disconnectedAccounts = accounts.filter(account => !account.connected);

  return (
    <div className="space-y-4 max-w-full">
      <h2 className="text-xl font-bold">Connected Accounts</h2>
      <div className="space-y-1">
        {connectedAccounts.map((account) => (
          <div key={account.name} className="flex items-center justify-between p-2 border rounded">
            <div className="flex flex-col items-center space-y-1">
              <div className="flex w-full items-center justify-start space-x-2">
                <account.icon className={`w-8 h-8 ${account.color}`} />
                <span className="font-semibold">{account.name}</span>
                <BadgeCheck className="text-green-600 w-6 h-6" />
              </div>
              <div>
                {account.access.map((access) => (<Badge className="mr-1" key={access} variant="outline">{access}</Badge>))}
              </div>
            </div>
            <DropdownMenu>
              {loading === account.name ? <Loader className="animate-spin" /> : <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>}
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 hover:text-red-700"
                  onClick={() => setDialogOpen(account.name)}
                >
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={dialogOpen === account.name} onOpenChange={() => setDialogOpen(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Disconnect</DialogTitle>
                  <DialogDescription>
                    <p>Are you sure you want to disconnect from {account.name}?</p>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-start">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setDialogOpen(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      toggleConnection(account.name);
                      setDialogOpen(null);
                    }}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold">Available Integrations</h2>
      <div className="flex w-full space-x-4 overflow-x-auto">
        <div className="flex space-x-4">
          {disconnectedAccounts.map((account) => (
            <div key={account.name} className="flex w-48 p-4 border rounded shadow">
              <div className="flex flex-col flex-1 items-center">
                <account.icon className={`w-12 h-12 ${account.color}`} />
                <span className="mt-2 font-medium">{account.name}</span>
                <p className="text-xs text-muted-foreground text-center">{account.description}</p>
                <div className="flex-1" />
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setConnectDialogOpen(account.name)} disabled={loading === account.name}>
                  {loading === account.name ? <Loader className="animate-spin" /> : "Connect"}
                </Button>
                <Dialog open={connectDialogOpen === account.name} onOpenChange={() => setConnectDialogOpen(null)}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogDescription>
                        <div className="flex flex-col items-center justify-center space-x-2">
                          <account.icon className={`w-16 h-16 ${account.color}`} />
                          <p className="text-lg font-semibold">{account.name}</p>
                          <p className="text-xs text-muted-foreground text-center">{account.description}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center mt-4">
                          <p className="text-center">Requires the following access</p>
                          <div className="mt-4">
                            {account.access.map((access) => (<Badge className="mr-1" key={access} variant="outline">{access}</Badge>))}
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-8">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setConnectDialogOpen(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          toggleConnection(account.name);
                          setConnectDialogOpen(null);
                        }}
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}