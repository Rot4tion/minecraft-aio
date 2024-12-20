import { DATABASE_EXECUTE_CHANNEL } from "./api-channels";

export function exposeAPIContext() {
    const { contextBridge, ipcRenderer } = window.require("electron");
    contextBridge.exposeInMainWorld("api", {
        execute: (...args) => ipcRenderer.invoke(DATABASE_EXECUTE_CHANNEL, ...args),
    });
}
