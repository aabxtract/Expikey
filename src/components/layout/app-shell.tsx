'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  WandSparkles,
  LayoutGrid,
  CalendarClock,
  Globe,
  PanelLeft,
  Github,
} from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import BackgroundParticles from '@/components/emotikey/background-particles';

const navItems = [
  { href: '/create', icon: WandSparkles, label: 'Create' },
  { href: '/gallery', icon: LayoutGrid, label: 'Gallery' },
  { href: '/streak', icon: CalendarClock, label: 'Streak' },
  { href: '/map', icon: Globe, label: 'Emotion Map' },
];

function AppHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const currentNavItem = navItems.find(item => item.href === pathname);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <PanelLeft />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="font-headline text-xl font-bold tracking-tight text-foreground">
          {currentNavItem?.label || 'EmotiKey'}
        </h1>
      </div>
      <div className="flex items-center gap-2">
         {/* Mock Wallet Connect Button */}
         <Button variant="outline" className="bg-background/70">
            Connect Wallet
        </Button>
      </div>
    </header>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full">
        <BackgroundParticles />
        <div className="md:flex">
          <Sidebar
            side="left"
            variant="sidebar"
            collapsible="icon"
            className="border-r border-border/50 bg-card/50 backdrop-blur-lg"
          >
            <SidebarHeader className="p-4">
              <Link
                href="/create"
                className="flex items-center gap-2 text-primary group-data-[state=collapsed]:justify-center"
              >
                <WandSparkles className="h-6 w-6" />
                <span className="font-headline text-xl font-bold group-data-[state=collapsed]:hidden">
                  EmotiKey
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map(item => (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={{ children: item.label }}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <a href="https://github.com/firebase/genkit/tree/main/examples/nextjs-dapp" target="_blank" rel="noopener noreferrer">
                            <SidebarMenuButton tooltip={{children: "GitHub"}}>
                                <Github/>
                                <span>GitHub</span>
                            </SidebarMenuButton>
                        </a>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1">
            <AppHeader />
            <div className="p-4 md:p-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
