import { addToJsonFile, readFromJsonFile } from "./fileService.js";
import { staticFilesFolder } from "../../app.js";
import path from "path";
export const logLevels = {
    WARN: "WARN",
    INFO: "INFO",
    ERROR: "ERROR",
};

export default class ErrorLoggerService {
    static fileNumber = 1;
    static errorLogFolderName = "errorLog";
    async makeLog(logLevel, message) {
        const logInstance = { date: new Date(), logLevel, message };
        const logFolder = path.resolve(staticFilesFolder, ErrorLoggerService.errorLogFolderName);

        const lastLogFileLogArray = await readFromJsonFile(logFolder, `log${ErrorLoggerService.fileNumber}.json`);
        if (lastLogFileLogArray && lastLogFileLogArray.length > 100) {
            ErrorLoggerService.fileNumber += 1;
        }
        await addToJsonFile(logFolder, `log${ErrorLoggerService.fileNumber}.json`, logInstance);
    }
}
