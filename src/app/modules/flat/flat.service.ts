import { Active, PrismaClient, Role } from "@prisma/client";
import { sortingQuery } from "../../utils/sortingQuery";
import { flatConstant } from "./flat.constant";
import { TFlat } from "../../../interface/flat.types";
import { IUserEncode } from "../../../interface";
import appError from "../../errors/appError";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const addFlatSync = async (id: string, payload: TFlat) => {
  const flatAdd = await prisma.flat.create({
    data: {
      ...payload,
      userId: id,
    },
  });

  return flatAdd;
};

const getFlatSync = async (query: Record<string, any>) => {
  const { page, limit, searchTerm, sortBy, sortOrder, availability } = query;

  // console.log(query);

  const conditions = [];

  if (searchTerm) {
    conditions.push({
      OR: flatConstant.searchFields.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (availability === "true" || availability === "false") {
    // console.log("yes");
    conditions.push({
      availability: availability === "true" ? true : false,
    });
  }

  const pageNumber = Number(page || 1);
  const limitNumber = Number(limit || 10);
  const skip = (pageNumber - 1) * limitNumber;

  const sorting = await sortingQuery({ sortBy, sortOrder });
  const result = await prisma.flat.findMany({
    where: {
      AND: conditions,
    },
    skip,
    take: limitNumber,
    orderBy: sorting,
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
  user: IUserEncode
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
      where: {
        id,
        userId: user.id,
      },
      data: payload,
    };
  } else if (user.role === Role.admin) {
    updatedSync = {
      where: {
        id,
      },
      data: payload,
    };
  } else {
    throw new appError("Unauthorized", httpStatus.UNAUTHORIZED);
  }
  // update flat
  return await prisma.flat.update(updatedSync);
};

export const flatService = {
  addFlatSync,
  getFlatSync,
  updateFlatSync,
};
