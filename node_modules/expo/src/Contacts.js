// @flow

import {
  NativeModules,
} from 'react-native';

type FieldType = 'phoneNumbers' | 'emails' | 'addresses';

export async function getContactsAsync(fields: FieldType[] = []) {
  return await NativeModules.ExponentContacts.getContactsAsync(fields);
}

export const PHONE_NUMBERS = 'phoneNumbers';
export const EMAILS = 'emails';
export const ADDRESSES = 'addresses';
