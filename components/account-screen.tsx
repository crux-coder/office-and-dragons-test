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

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
    { value: "in", label: "India" },
    { value: "br", label: "Brazil" },
    { value: "za", label: "South Africa" },
    { value: "ru", label: "Russia" },
    { value: "it", label: "Italy" },
    { value: "es", label: "Spain" },
    { value: "mx", label: "Mexico" },
    { value: "kr", label: "South Korea" },
    { value: "se", label: "Sweden" },
    { value: "nl", label: "Netherlands" },
    { value: "ch", label: "Switzerland" },
    { value: "tr", label: "Turkey" },
    // Add more countries as needed
  ];

  const timezones = [
    { value: "pst", label: "Pacific Time (PT)" },
    { value: "est", label: "Eastern Time (ET)" },
    { value: "utc", label: "Coordinated Universal Time (UTC)" },
    { value: "cst", label: "Central Time (CT)" },
    { value: "mst", label: "Mountain Time (MT)" },
    { value: "gmt", label: "Greenwich Mean Time (GMT)" },
    { value: "cet", label: "Central European Time (CET)" },
    { value: "ist", label: "India Standard Time (IST)" },
    { value: "jst", label: "Japan Standard Time (JST)" },
    { value: "aest", label: "Australian Eastern Standard Time (AEST)" },
    { value: "bst", label: "British Summer Time (BST)" },
    { value: "cst", label: "China Standard Time (CST)" },
    { value: "brt", label: "Brasília Time (BRT)" },
    { value: "sast", label: "South Africa Standard Time (SAST)" },
    { value: "msk", label: "Moscow Standard Time (MSK)" },
    // Add more timezones as needed
  ];

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
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
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
                {timezones.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
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