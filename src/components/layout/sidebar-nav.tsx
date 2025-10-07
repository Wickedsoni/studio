'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, FileClock, ClipboardList } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  {
    href: '/dashboard',
    icon: <Home />,
    label: 'Dashboard',
    tooltip: 'Dashboard',
  },
  {
    href: '/meetings',
    icon: <FileClock />,
    label: 'All Meetings',
    tooltip: 'All Meetings',
  },
  {
    href: '/templates',
    icon: <ClipboardList />,
    label: 'Templates',
    tooltip: 'Templates',
  },
  {
    href: '/settings',
    icon: <Settings />,
    label: 'Settings',
    tooltip: 'Settings',
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            tooltip={item.tooltip}
            isActive={pathname.startsWith(item.href)}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
