export default function sendJsonHttpResponse(res, status, message) {
    return res.status(status).json({ message: message });
}
