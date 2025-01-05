import { api } from "encore.dev/api";
import { CreateParcelRequest } from "./types";
import { ParcelService } from "../../services/parcel/parcel";

export const parcel = api(
  {
    method: "POST",
    path: "/posts",
    expose: true,
  },
  async (req: CreateParcelRequest) => {
    const parcelService = new ParcelService();
    const parcel = await parcelService.CreateParcel({ ...req });
    return {
      isError: false,
      parcel,
    };
  }
);
