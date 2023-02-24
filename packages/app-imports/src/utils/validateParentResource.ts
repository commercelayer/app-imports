import {
  CommerceLayerClient,
  CouponCodesPromotionRule,
  Promotion
} from '@commercelayer/sdk'
import { AllowedResourceType } from 'App'

export async function validateParentResource({
  sdkClient,
  resourceType,
  parentResourceId
}: {
  resourceType: AllowedResourceType
  parentResourceId: string
  sdkClient: CommerceLayerClient
}): Promise<string> {
  // in case of coupons, the UI will show `promotions` as parent resources
  // while we need to have `coupon_codes_promotion_rule`
  // se let's check if current promotion has a `coupon_codes_promotion_rule` already
  // if not we create a new one and always return a coupon_codes_promotion_rule's ID
  // to generate the import task
  if (resourceType === 'coupons') {
    const promotion = await fetchPromotionWithCouponPromotionRule(
      sdkClient,
      parentResourceId
    )
    const couponCodePromotionRuleId =
      promotion.coupon_codes_promotion_rule?.id ??
      (await createCouponCodePromotionRuleId(sdkClient, promotion)).id

    return couponCodePromotionRuleId
  }

  return parentResourceId
}

async function fetchPromotionWithCouponPromotionRule(
  sdkClient: CommerceLayerClient,
  promotionId: string
): Promise<Promotion> {
  return await sdkClient.promotions.retrieve(promotionId, {
    fields: {
      promotions: ['id', 'name', 'coupon_codes_promotion_rule'],
      coupon_codes_promotion_rule: ['id']
    },
    include: ['coupon_codes_promotion_rule']
  })
}

async function createCouponCodePromotionRuleId(
  sdkClient: CommerceLayerClient,
  promotion: Promotion
): Promise<CouponCodesPromotionRule> {
  return await sdkClient.coupon_codes_promotion_rules.create({
    promotion: {
      id: promotion.id,
      type: 'promotions'
    }
  })
}
