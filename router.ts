import {Status} from "https://deno.land/std/http/http_status.ts";
import {HTTP_METHOD_GET, HTTP_METHOD_POST, ROUTE_SHORTEN, QUERY_PARAM_TARGET} from "./constants.ts";
import {getTarget, addTarget} from "./controller.ts";
import {sendResponseCode} from "./utils.ts";

export async function handleRequest(req: Request, resp: any) {
    const u=new URL(req.url);
    const path=u.pathname, target=u.searchParams.get(QUERY_PARAM_TARGET);
    switch(req.method) {
        case HTTP_METHOD_GET: {
            getTarget(resp, path);
            break;
        }

        case HTTP_METHOD_POST: {
            if(path !== ROUTE_SHORTEN)
                return sendResponseCode(resp, Status.NotFound);
            addTarget(resp, target);
            break;
        }

        default: {
            return sendResponseCode(resp, Status.MethodNotAllowed);
        }
    }
}

