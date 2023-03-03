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
        await fs.mkdir(folderName, { recursive: true });
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
    return true;
}
export async function readFromJsonFile(folderName, fileName) {
    const filePath = `${folderName}/${fileName}`;
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        return null;
    }
}
export async function addToJsonFile(folderName, fileName, data) {
    try {
        await fs.access(folderName);
    } catch (err) {
        await fs.mkdir(folderName, { recursive: true });
    }
    const filePath = `${folderName}/${fileName}`;
    let logArr = [];
    logArr.push(data);
    try {
        await fs.access(filePath);
        const file = await fs.readFile(filePath);
        if (file.length === 0) {
            await fs.writeFile(filePath, JSON.stringify(logArr, null, "\t"));
        } else {
            logArr = JSON.parse(file);
            logArr.push(data);
            await fs.writeFile(filePath, JSON.stringify(logArr, null, "\t"));
        }
    } catch (err) {
        await fs.appendFile(filePath, JSON.stringify(logArr, null, "\t"));
    }
}

export async function deleteFile(folderName, fileName) {
    try {
        await fs.rm(`${folderName}/${fileName}`);
        const folderFiles = await fs.readdir(folderName);
        if (folderFiles.length === 0) {
            await fs.rm(folderName, { recursive: true });
        }
    } catch (err) {
        console.log(err);
        return false;
    }

    return true;
}
