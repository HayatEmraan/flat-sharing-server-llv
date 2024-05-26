import { Prisma, Purpose } from "@prisma/client";

export interface TFlat {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  briefDescription: string;
  location: string;
  name: string;
  category: string;
  purpose: Purpose;
  price: number;
  area: number;
  landmark: number;
  taxes?: number | null;
  images: Prisma.InputJsonValue;
  amenities: Prisma.InputJsonValue;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
