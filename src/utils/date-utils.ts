export class DateUtils {
  static formatRelative(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);

    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    return this.formatDate(date);
  }

  static toIsoString(date: Date): string {
    return date.toISOString();
  }

  static dateFromIsoString(isoString: string): Date {
    return new Date(isoString);
  }

  static formatDate(
    date: Date,
    format: 'dd-mm-yyyy' | 'dd mmm yyyy' = 'dd mmm yyyy',
  ): string {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNum = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    if (format === 'dd-mm-yyyy') {
      return `${day}-${monthNum}-${year}`;
    } else {
      const monthShort = date.toLocaleString('en-US', { month: 'short' });
      return `${day} ${monthShort} ${year}`;
    }
  }
}
