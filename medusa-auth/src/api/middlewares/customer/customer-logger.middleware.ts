import { defineMiddlewares} from "@medusajs/framework/http";
import type { MedusaRequest, MedusaResponse, MedusaNextFunction } from "@medusajs/framework/http";
import { writeLog } from "../../../utils/logs/logCreator";

async function loggerGet(
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
) {
    // writeLog("GET request to /store/customer");
    next();
}

export default defineMiddlewares({
    routes: [
        {
            matcher: "/store/customer/as",
            middlewares: [loggerGet],
        },
    ],
})