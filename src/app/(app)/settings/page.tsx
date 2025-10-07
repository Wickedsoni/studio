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
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUser } from '@/context/user-provider';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const ProfileFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  organization: z.string().optional(),
});

export default function SettingsPage() {
  const { user, setUser } = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: user,
  });

  useEffect(() => {
    form.reset(user);
  }, [user, form]);

  function onSubmit(values: z.infer<typeof ProfileFormSchema>) {
    setUser(values);
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully.',
    });
  }

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
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
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
                    <Label htmlFor="product-updates">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive occasional updates about new features.
                    </p>
                  </div>
                  <Switch id="product-updates" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}