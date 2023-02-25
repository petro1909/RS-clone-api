import RequestLogRepository from "../repository/requestLogRepository.js";

export class RequestLoggerService {
    constructor() {
        this.requestLogRepository = new RequestLogRepository();
    }
    makeLog = async (req, res, next) => {
        const userAgentString = req.headers["user-agent"];
        if (!userAgentString) {
            return next();
        }
        let osConfig = userAgentString.match(/\([^)]*\)/);
        let osName;
        if (!osConfig) {
            osName = "other";
        } else {
            let osConfigString = osConfig[0];
            osConfigString = osConfigString.slice(1, osConfigString.length - 1);
            const osConfigArr = osConfigString.split(";");
            osName = osConfigArr[0];
        }

        const reqBrowser = this.getBrowser(userAgentString);
        const method = req.method;
        const url = req.url;

        const loggedInsance = { logDate: new Date(), url: url, method: method, os: osName, browser: reqBrowser };
        try {
            await this.requestLogRepository.create(loggedInsance);
        } catch (err) {
            console.log(err);
        }

        return next();
    };

    getBrowser = (userAgentString) => {
        userAgentString = userAgentString.toLowerCase();
        switch (true) {
            case userAgentString.indexOf("edge") > -1:
                return "MS Edge";
            case userAgentString.indexOf("edg/") > -1:
                return "Edge ( chromium based)";
            case userAgentString.indexOf("opr") > -1:
                return "Opera";
            case userAgentString.indexOf("chrome") > -1:
                return "Chrome";
            case userAgentString.indexOf("trident") > -1:
                return "MS IE";
            case userAgentString.indexOf("firefox") > -1:
                return "Mozilla Firefox";
            case userAgentString.indexOf("safari") > -1:
                return "Safari";
            default:
                return "other";
        }
    };
}
