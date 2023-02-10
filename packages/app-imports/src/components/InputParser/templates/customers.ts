import { CustomerCreate } from '@commercelayer/sdk'

export const csvCustomersTemplate: Array<
  keyof CustomerCreate | 'customer_group_id'
> = ['email', 'password', 'customer_group_id']
