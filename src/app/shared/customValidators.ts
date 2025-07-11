import { AbstractControl } from '@angular/forms';

export function validateExpiryDate(control: AbstractControl): { [key: string]: any } | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    return { 'invalidExpiryDate': true };
  }

  return null;
}

export function validateDateOfBirth(control: AbstractControl): { [key: string]: any } | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - selectedDate.getFullYear();

  if (age < 18) {
    return { 'invalidAge': true };
  }

  return null;
}