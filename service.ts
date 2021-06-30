import {getId} from "./utils.ts";

export function add(target:string) {
    const id=getId();
    localStorage.setItem(id, target);
    return id;
}

export function get(id:string) {
    return localStorage.getItem(id.startsWith('/')?id.slice(1): id);
}