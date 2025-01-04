import { Topic } from "encore.dev/pubsub";
import { db } from "../../db";
import { Parcel, ParcelEvent } from "./types";
import { CreateParcelRequest } from "../../routes/parcel/types";

export const parcelCreatedTopic = new Topic<ParcelEvent>("createParcel", {
  deliveryGuarantee: "at-least-once",
});

export class ParcelService {
  async CreateParcel(opts: CreateParcelRequest): Promise<Parcel> {
    console.log("🚀 ~ ParcelService ~ CreateParcel ~ opts:", opts);
    const { merchant_id, customer_name, customer_phone } = opts;
    const parcel = await db.queryRow<Parcel>`
      INSERT INTO parcels (merchant_id, customer_name, customer_phone)
      VALUES (${merchant_id}, ${customer_name}, ${customer_phone})
      RETURNING
          id,
          merchant_id,
          customer_name,
          customer_phone,
          created_at as "createdAt"
  `;

    await parcelCreatedTopic.publish({
      id: parcel?.id as string,
      merchant_id: parcel?.merchant_id as string,
      customer_name: parcel?.customer_name as string,
      action: "created",
    });
    return parcel as Parcel;
  }
}
