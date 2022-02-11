import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";

export const getAvatarUrl = (seed, options) => {
  return createAvatar(style, {
    seed: seed.toString(),
    dataUri: true,
    ...options,
  });
};
