import { Prisma, PrismaClient, Role } from "@prisma/client";
import { TFlat } from "../../../interface/flat.types";
import appError from "../../errors/appError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const addFlatSync = async (id: string, payload: TFlat) => {
  const { amenities, ...flatInfo } = payload;

  const flatAdd = await prisma.flat.create({
    data: {
      ...flatInfo,
      userId: id,
      amenities: {
        create: amenities,
      },
    },
    include: {
      amenities: true,
    },
  });

  return flatAdd;
};

const getFlatSync = async (query: Record<string, any>) => {
  const { page, limit, startPrice, endPrice, numberOfBed, location } = query;

  // console.log(query);

  const conditions: Prisma.FlatWhereInput[] = [];

  if (startPrice && endPrice) {
    conditions.push({
      price: {
        gte: startPrice,
        lte: endPrice,
      },
    });
  }

  if (numberOfBed) {
    conditions.push({
      numberOfBedrooms: {
        equals: Number(numberOfBed),
      },
    });
  }

  if (location) {
    conditions.push({
      location: {
        contains: location,
        mode: "insensitive",
      },
    });
  }

  const pageNumber = Number(page || 1);
  const limitNumber = Number(limit || 10);
  const skip = (pageNumber - 1) * limitNumber;

  const result = await prisma.flat.findMany({
    where: {
      AND: conditions,
    },
    include: {
      user: true,
      amenities: true,
    },
    skip,
    take: limitNumber,
  });

  // console.dir(conditions, { depth: Infinity });

  const total = await prisma.flat.count({
    where: {
      AND: conditions,
    },
  });

  const meta = {
    page: pageNumber,
    limit: limitNumber,
    total,
  };

  return {
    data: result,
    meta,
  };
};

const updateFlatSync = async (
  payload: Partial<TFlat>,
  id: string,
  user: JwtPayload
) => {
  // checking flat profile is exit or not

  let updatedSync;

  if (user.role === Role.user) {
    const checkingFlatBelongToCurrentUser = await prisma.flat.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!checkingFlatBelongToCurrentUser) {
      throw new appError(
        "Unauthorized to edit - (Edited Flat not belong to you!)",
        httpStatus.UNAUTHORIZED
      );
    }

    updatedSync = {
      id,
      userId: user.id,
    };
  } else if (user.role === Role.admin) {
    updatedSync = {
      id,
    };
  } else {
    throw new appError("Unauthorized", httpStatus.UNAUTHORIZED);
  }
  // update flat
  return await prisma.flat.update({
    where: updatedSync,
    data: payload,
  });
};

export const flatService = {
  addFlatSync,
  getFlatSync,
  updateFlatSync,
};
