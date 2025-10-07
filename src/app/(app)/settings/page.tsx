'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b p-4">
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
      </div>
      <main className="flex-1 p-4 md:p-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="User Name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="user@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Acme Inc." />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable dark mode for the interface.
                    </p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Notifications</CardTitle>
                <CardDescription>
                  Manage how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="email-summaries">Email Summaries</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive an email with the meeting summary after generation.
                    </p>
                  </div>
                  <Switch id="email-summaries" defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="email-updates">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive occasional updates about new features.
                    </p>
                  </div>
                  <Switch id="email-updates" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}