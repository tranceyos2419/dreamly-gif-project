import { IInput } from './../components/pages/signup/SignUpForm';
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
