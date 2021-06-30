import {Status} from "https://deno.land/std/http/http_status.ts";
import {HEADER_LOCATION, URL_CODE_LENGTH, SERVICE_DOMAIN} from "./constants.ts";

export function sendResponseCode(resp:any, code:number) {
    resp(new Response(undefined, {status: code}));
}

export function sendResponseShortenedUrl(resp:any, shortCode:string) {
    resp(new Response(JSON.stringify({shortUrl: SERVICE_DOMAIN+shortCode}), {status: Status.OK}));
}

export async function sendResponseRedirect(resp:any, target:string) {
        await resp(new Response(undefined, {
            status: Status.Found,
            headers: new Headers({[HEADER_LOCATION]: target})
    }));
}  

export function getId() {
    var arr = new Uint8Array(URL_CODE_LENGTH/2)
    crypto.getRandomValues(arr);
    const toHex=(d:any)=>d.toString(16).padStart(2, "0");
    return Array.from(arr, toHex).join('')
  }
  