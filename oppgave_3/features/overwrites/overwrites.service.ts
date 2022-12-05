import * as userRepo from "./overwrites.repository";

export const getOverwrite = async (id: string) => {
    const overwrite = await userRepo.getOverwrite(id);

    if (!overwrite?.success) {
        return { success: false, error: "Overwrite not found" };
    }

    return { success: true, data: overwrite };
}

export const createOverwrite = async (name: string) => {
    const overwrite = await userRepo.exists(name);


    if (overwrite?.data) {
        return { success: false, error: "Overwrite already exists" };
    }

    const newOverwrite = await userRepo.createOverwrite({ name });

    if (!newOverwrite?.success) {
        return { success: false, error: "Could not create overwrite" };
    }
}