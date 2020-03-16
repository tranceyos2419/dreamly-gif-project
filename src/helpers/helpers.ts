import { IInput } from './../@types/types';
import dayjs from 'dayjs';
export const GetErrorMessage = (input: IInput, name: string): string => {
  const type: string = input['type'];
  switch (type) {
    case 'required':
      return `${name} is required`

    case 'pattern':
      return `Input is not valid`

    default:
      return 'Error'
  }
}


export const getCurrentDate = (): string => {
  return dayjs().toISOString();
}

export function getValueOfObject<T>(obj: Object): T[] {
  if (obj !== null && obj !== undefined) {
    return Object.values(obj) as T[];
  }
}
