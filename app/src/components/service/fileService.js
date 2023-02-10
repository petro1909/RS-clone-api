import fs from "fs/promises";

export async function getStaticFile(folderName, fileName) {
    try {
        await fs.access(folderName);
        const profilePicturePath = `${folderName}/${fileName}`;
        return profilePicturePath;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function createFile(folderName, file, single) {
    try {
        await fs.access(folderName);
    } catch (err) {
        await fs.mkdir(folderName);
    }
    const filePath = `${folderName}/${file.name}`;
    if (single) {
        try {
            const folderFiles = await fs.readdir(folderName);
            for (const folderFile of folderFiles) {
                await fs.rm(`${folderName}/${folderFile}`);
            }
        } catch (err) {
            return false;
        }
    }
    file.mv(filePath, async (err) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            return true;
        }
    });
}

export async function deleteFile(folderName, fileName) {
    try {
        await fs.rm(`${folderName}/${fileName}`);
        const folderFiles = await fs.readdir(folderName);
        if (folderFiles.length === 0) {
            await fs.rm(folderName);
        }
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}
