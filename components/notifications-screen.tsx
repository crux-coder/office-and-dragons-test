import React from 'react';
import { Separator } from "./ui/separator"
import { Switch } from "./ui/switch"

export default function NotificationsScreen() {
  const [masterEnabled, setMasterEnabled] = React.useState(true)
  const [categoryEnabled, setCategoryEnabled] = React.useState(
    Array(3).fill(true) // Assuming there are 3 categories
  );

  const handleCategoryChange = (index: number, value: boolean) => {
    const newCategoryEnabled = [...categoryEnabled];
    newCategoryEnabled[index] = value;
    setCategoryEnabled(newCategoryEnabled);
  };

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
                <p className="text-sm">{category.description}</p>
              </div>
              <Switch
                checked={categoryEnabled[index]}
                onCheckedChange={(value) => handleCategoryChange(index, value)}
                disabled={!masterEnabled}
              />
            </div>
            <div className="ml-4 space-y-2">
              {category.subcategories.map((subcategory, subIndex) => (
                <div key={subIndex} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">{subcategory.name}</h4>
                    <p className="text-xs text-sidebar-foreground">{subcategory.description}</p>
                  </div>
                  <Switch disabled={!masterEnabled || !categoryEnabled[index]} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}