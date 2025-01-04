import { Subscription } from "encore.dev/pubsub";
import { parcelCreatedTopic } from "../../../parcel-service/services/parcel/parcel";

export const applyCouponSubscriber = new Subscription(
  parcelCreatedTopic,
  "apply-coupon",
  {
    handler: async (event) => {
      console.log("🚀 ~ handler: ~ event:", event);
    },
  }
);
