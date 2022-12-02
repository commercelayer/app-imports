import { CouponCreate } from '@commercelayer/sdk'

export const csvCouponTemplate: Array<
  keyof CouponCreate | 'promotion_rule_id'
> = [
  'code',
  'promotion_rule_id',
  'usage_limit',
  'customer_single_use',
  'recipient_email'
]