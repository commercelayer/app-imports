import { AddressCreate } from '@commercelayer/sdk'

export const csvAddressTemplate: Array<keyof AddressCreate> = [
  'business',
  'first_name',
  'last_name',
  'company',
  'line_1',
  'line_2',
  'city',
  'zip_code',
  'state_code',
  'country_code',
  'phone',
  'email',
  'notes',
  'lat',
  'lng',
  'billing_info',
  'reference',
  'reference_origin'
]
