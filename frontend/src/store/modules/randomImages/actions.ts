import { createAction } from "typesafe-actions";

export const GET_RANDOM_IMAGE = "randomImages/GET_RANDOM_IMAGE";

export const getRandomImage = createAction(GET_RANDOM_IMAGE)<number>();
