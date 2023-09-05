import { useState } from 'react';
import { IDateButton } from '@/store/interface';

//generates 13 dates 1day before and 12 days after the given date, syns the calendar date with TopButtons 
export function generateDateButtons(chosenDate: Date): IDateButton[] {
  const currentDate = new Date();
  const daysBeforeChosenDate = 1; // 1 day before the chosen date
  const daysAfterChosenDate = 12; // 12 days after the chosen date

  const dateButtons: IDateButton[] = [];

  for (let i = -daysBeforeChosenDate; i <= daysAfterChosenDate; i++) {
    const dateToAdd = new Date(chosenDate);
    dateToAdd.setDate(chosenDate.getDate() + i);

    const isActive = dateToAdd.toDateString() === currentDate.toDateString();

    const day = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(dateToAdd);
    const date = dateToAdd.getDate();

    dateButtons.push({
      day,
      date,
      isActive,
    });
  }

  return dateButtons;
}

//cusotm date to manage syncing of calendar date to TopButtons
export function useDateButtons(): {
  chosenDate: Date;
  dateButtons: IDateButton[];
  setDate: (newDate: Date) => void;
} {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [dateButtons, setDateButtons] = useState<IDateButton[]>(generateDateButtons(chosenDate));

  const setDate = (newDate: Date) => {
    setChosenDate(newDate);
    const buttons = generateDateButtons(newDate);
    setDateButtons(buttons);
  };

  return {
    chosenDate,
    dateButtons,
    setDate,
  };
}

export default useDateButtons;
