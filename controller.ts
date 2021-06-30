import {Status} from "https://deno.land/std/http/http_status.ts"
import {sendResponseCode, sendResponseRedirect, sendResponseShortenedUrl} from "./utils.ts";
import {get,add} from "./service.ts";

export function getTarget(resp: any, urlCode: string) {
    const target=get(urlCode);
    if(!target)
        return sendResponseCode(resp, Status.NotFound);
    sendResponseRedirect(resp, target);
}

export function addTarget(resp: any, target: string|null) {
    if(!target)
        return sendResponseCode(resp, Status.BadRequest);
    const urlCode=add(target);
    sendResponseShortenedUrl(resp, urlCode);
}

