import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
  t: any
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}


interface TimeBlockProps {
  label: string;
  value: number;
}



export default function CountdownTimer({ targetDate, t }: CountdownTimerProps) { 
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(targetDate);
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);
  
  const timeBlocks: TimeBlockProps[] = [
    { label: t.countdown.days, value: timeLeft.days },
    { label: t.countdown.hours, value: timeLeft.hours },
    { label: t.countdown.minutes, value: timeLeft.minutes },
    { label: t.countdown.seconds, value: timeLeft.seconds }
  ];
  
  return (
    <div className="flex justify-center gap-4">
      {timeBlocks.map((block, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow-lg p-3 md:p-4 w-16 md:w-24"
        >
          <div className="text-2xl md:text-4xl font-bold text-rose-600">
            {block.value < 10 ? `0${block.value}` : block.value}
          </div>
          <div className="text-xs md:text-sm text-gray-500">
            {block.label}
          </div>
        </div>
      ))}
    </div>
  );
}