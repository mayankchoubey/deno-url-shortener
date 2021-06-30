import {PORT as port} from "./constants.ts";
import {handleRequest} from "./router.ts";

if(!window.location) {
    console.error("ERROR: Location must be specified with --location");
    Deno.exit(1);
}

const listener = Deno.listen({port});

for await(const conn of listener)
    handleNewConnection(conn);
    
async function handleNewConnection(conn: Deno.Conn) {
    for await(const req of Deno.serveHttp(conn))
        await handleRequest(req.request, req.respondWith);
}
