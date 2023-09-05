class DateFormatter {
  private currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }
  //gets due date of a Todo
  formatDate(dateString: string): string {
    const inputDate = new Date(dateString);

    if (this.isToday(inputDate)) {
      return 'Today';
    }

    if (this.isTomorrow(inputDate)) {
      return 'Tomorrow';
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return inputDate.toLocaleDateString('en-US', options);
  }
  getTruncatedTime(timeString: string): string {
    // Parse the input time string
    const inputTime = new Date(timeString);

    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour format (AM/PM)
    };

    return inputTime.toLocaleTimeString('en-US', options);
  }

  getGreeting(): string {
    const currentHour = this.currentDate.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }

  getCurrentYearAndMonth(): string {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.toLocaleDateString('en-US', { month: 'long' });

    return `${month} ${year}`;
  }

  private isToday(date: Date): boolean {
    return (
      date.getDate() === this.currentDate.getDate() &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getFullYear() === this.currentDate.getFullYear()
    );
  }

  private isTomorrow(date: Date): boolean {
    const tomorrowDate = new Date(this.currentDate);
    tomorrowDate.setDate(this.currentDate.getDate() + 1);

    return (
      date.getDate() === tomorrowDate.getDate() &&
      date.getMonth() === tomorrowDate.getMonth() &&
      date.getFullYear() === tomorrowDate.getFullYear()
    );
  }
}

export default DateFormatter;
