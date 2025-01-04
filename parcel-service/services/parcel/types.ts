export interface Parcel {
  id: string;
  merchant_id: string;
  customer_name: string;
  customer_phone: string;
  createdAt: Date;
}

export interface ParcelEvent {
  id: string;
  merchant_id: string;
  customer_name: string;
  action: "created" | "updated" | "deleted";
}
