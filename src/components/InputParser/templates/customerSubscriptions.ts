import { CustomerSubscriptionCreate } from '@commercelayer/sdk'

export const csvCustomerSubscriptionsTemplate: Array<
  keyof CustomerSubscriptionCreate | 'customer_group_id'
> = ['customer_email', 'customer_group_id']
