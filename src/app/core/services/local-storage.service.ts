import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    //#region Class properties

    private storage = localStorage;

    //#endregion

    constructor() { }

    //#region Class functionality

    /**
     * Set storage type
     * 
     * @param use true for local storage, false for session storage
     * 
     * @returns void
     */
    public useLocalStorage(use: boolean): void {
        this.storage = use ? localStorage : sessionStorage;
    }

    /**
     * This method sets the value of the specified Storage Object item.
     * 
     * @param key key value
     * @param data data value
     * 
     * @returns void
     */
    public setItem(key: string, data: unknown): void {
        this.storage.setItem(key, JSON.stringify(data));
    }

    /**
     * This method returns value of the specified Storage Object item.
     * 
     * @param key key value
     * 
     * @returns value of the specified Storage Object item
     */
    public getItem(key: string): unknown {
        return JSON.parse(this.storage.getItem(key) || '{}');
    }

    /**
     * This method removes the specified Storage Object item.
     * 
     * @param key 
     * 
     * @returns void
     */
    public removeItem(key: string): void {
        this.storage.removeItem(key);
    }

    /**
     * 
     * This method clears all keys stored in a given Storage object.
     * 
     */
    public clear() {
        this.storage.clear();
    }

    //#endregion
}