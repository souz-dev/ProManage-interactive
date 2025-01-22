import { format } from 'date-fns';

export function formatDate(date: string | Date, dateFormat: string = 'dd/MM/yyyy'): string {
  return format(new Date(date), dateFormat);
}
