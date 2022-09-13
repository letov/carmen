import { generateFromString } from "generate-avatar";

export const getCustomerAvatar = (image : string | null, seed: string) => {
    return null === image
        ? `data:image/svg+xml;utf8,${generateFromString(seed)}`
        : `${import.meta.env.VITE_SERVER_URL}/${import.meta.env.VITE_UPLOAD_PATH}/${image}`;
}
