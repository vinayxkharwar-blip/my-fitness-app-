import React, { useState } from 'react';
import { Target, Plus, Check, Trash2, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/card';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Badge } from '@/components/common/badge';

interface Habit {
  id: string;
  name: string;
  streak: number;
  frequency: 'Daily' | 'Weekly';
  completedToday: boolean;
}

export default function Habits() {
  const [newHabitName, setNewHabitName] = useState('');
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly'>('Daily');

  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Drink 2L Water', streak: 5, frequency: 'Daily', completedToday: true },
    { id: '2', name: 'Read 20 pages', streak: 2, frequency: 'Daily', completedToday: false },
    { id: '3', name: 'Morning Stretch', streak: 12, frequency: 'Daily', completedToday: false },
  ]);

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      streak: 0,
      frequency,
      completedToday: false
    };

    setHabits([...habits, newHabit]);
    setNewHabitName('');
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        return {
          ...h,
          completedToday: !h.completedToday,
          streak: !h.completedToday ? h.streak + 1 : Math.max(0, h.streak - 1)
        };
      }
      return h;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const completedCount = habits.filter(h => h.completedToday).length;
  const completionRate = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className="container mx-auto p-4 pb-24 max-w-4xl animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Habit Tracker</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Build consistency and achieve your goals daily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Summary Stats */}
        <Card className="md:col-span-1 border-primary/20 bg-primary/5">
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completion Rate</h3>
                <div className="text-4xl font-bold text-primary mt-1">{completionRate}%</div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Today's Progress</h3>
                <div className="text-2xl font-bold mt-1">{completedCount} / {habits.length} Habits</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Habit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Add New Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddHabit} className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="E.g., Meditate for 10 mins"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="flex-grow"
              />
              <select
                className="flex h-10 w-full sm:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'Daily' | 'Weekly')}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
              <Button type="submit" className="gap-2">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Today's Habits */}
      <h2 className="text-2xl font-bold mb-4">Today's Habits</h2>
      <div className="space-y-3 mb-10">
        {habits.length > 0 ? habits.map(habit => (
          <Card key={habit.id} className={`transition-all ${habit.completedToday ? 'opacity-70 bg-muted/50' : ''}`}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-grow">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors shrink-0
                                        ${habit.completedToday
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground hover:border-primary'}`}
                >
                  {habit.completedToday && <Check className="w-5 h-5" />}
                </button>

                <div>
                  <h3 className={`font-semibold text-lg ${habit.completedToday ? 'line-through text-muted-foreground' : ''}`}>
                    {habit.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {habit.frequency}
                    </Badge>
                    {habit.streak > 0 && (
                      <div className="flex items-center text-sm font-medium text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                        <Flame className="w-3 h-3 mr-1 fill-orange-500" />
                        {habit.streak} day streak
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive shrink-0"
                onClick={() => deleteHabit(habit.id)}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center p-8 bg-muted rounded-xl">
            <p className="text-muted-foreground">No habits added yet. Start by adding one above!</p>
          </div>
        )}
      </div>

      {/* Weekly Progress Grid */}
      <h2 className="text-xl font-bold mb-4">Last 7 Days (Mock)</h2>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center w-full">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div className="text-xs font-medium text-muted-foreground">{day}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                    ${i < 5 ? 'bg-primary/20 text-primary' : (i === 5 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}
                                `}>
                  {i <= 5 ? <Check className="w-4 h-4" /> : null}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
