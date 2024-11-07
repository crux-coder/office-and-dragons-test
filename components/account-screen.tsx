"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function AccountScreen() {
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
            <AvatarImage src={avatarSrc} alt="User Avatar" className="rounded-full" />
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