'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Star, CalendarDays } from 'lucide-react';
import { mockStreakData } from '@/lib/mock-data';
import { isSameDay, startOfMonth, eachDayOfInterval, format } from 'date-fns';

const StreakStatCard = ({ icon, title, value, unit }: { icon: React.ReactNode, title: string, value: number, unit: string }) => (
    <Card className="bg-card/60 backdrop-blur-lg border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{unit}</p>
        </CardContent>
    </Card>
);

const CalendarView = () => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const daysInMonth = eachDayOfInterval({
        start: monthStart,
        end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    });

    const isDayMinted = (day: Date) => {
        return mockStreakData.dates.some(mintedDate => isSameDay(day, mintedDate));
    }

    return (
        <Card className="bg-card/60 backdrop-blur-lg border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    This Month's Activity
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-2">
                    {daysInMonth.map(day => (
                        <div key={day.toString()} className="flex flex-col items-center">
                            <span className="text-xs text-muted-foreground">{format(day, 'E')[0]}</span>
                            <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                                ${isDayMinted(day) ? 'bg-primary/80 text-primary-foreground' : 'bg-secondary'}
                                ${isSameDay(day, today) ? 'ring-2 ring-primary' : ''}
                            `}>
                                {format(day, 'd')}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default function StreakTracker() {
  const { current, longest } = mockStreakData;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StreakStatCard icon={<Flame className="h-4 w-4 text-muted-foreground" />} title="Current Streak" value={current} unit="days in a row" />
        <StreakStatCard icon={<Star className="h-4 w-4 text-muted-foreground" />} title="Longest Streak" value={longest} unit="days ever" />
      </div>
      <CalendarView />
    </div>
  );
}
