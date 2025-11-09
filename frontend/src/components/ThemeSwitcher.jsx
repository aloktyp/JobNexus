import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './ui/button';
import { Palette } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const ThemeSwitcher = () => {
  const { currentTheme, setCurrentTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  const themeColors = {
    purple: { bg: 'bg-gradient-to-r from-purple-500 to-purple-700', border: 'border-purple-500' },
    ocean: { bg: 'bg-gradient-to-r from-cyan-500 to-cyan-700', border: 'border-cyan-500' },
    sunset: { bg: 'bg-gradient-to-r from-orange-500 to-orange-700', border: 'border-orange-500' },
    forest: { bg: 'bg-gradient-to-r from-emerald-500 to-emerald-700', border: 'border-emerald-500' },
    rose: { bg: 'bg-gradient-to-r from-rose-500 to-rose-700', border: 'border-rose-500' },
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 bg-white"
        >
          <Palette className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Choose Your Theme</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(themes).map(([key, theme]) => (
            <div
              key={key}
              onClick={() => {
                setCurrentTheme(key);
                setOpen(false);
              }}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                currentTheme === key
                  ? `${themeColors[key].border} shadow-lg`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`h-16 w-16 rounded-lg ${themeColors[key].bg} shadow-md`}></div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{theme.name}</h3>
                  <p className="text-sm text-gray-500">
                    {currentTheme === key ? '✓ Active Theme' : 'Click to apply'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeSwitcher;
