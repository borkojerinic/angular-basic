import { Injectable } from '@angular/core';
import { QueryParams, User } from '@app-models';

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    //#region Class properties

    private storage = localStorage;
    public selectedUsers: User[] = [];
    public queryParams: QueryParams;
    public loadOrNavigateBack = 0;

    //#endregion

    constructor() {
        const session = sessionStorage.getItem('isUserLoggedIn');
        const local = localStorage.getItem('isUserLoggedIn');

        if (session === 'true') {
            this.storage = sessionStorage;
        } else if (local) {
            this.storage = localStorage;
        }
    }

    //#region Class functionality

    /**
     * Set storage type
     * 
     * @param useLocalStorage true for local storage, false for session storage
     * 
     * @returns void
     */
    public useLocalStorage(useLocalStorage: boolean): void {
        this.storage = useLocalStorage ? localStorage : sessionStorage;
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
    public getItem(key: string): boolean {
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
     * This method clears all keys stored in a given Storage object.
     * 
     * @returns void
     */
    public clear(): void {
        this.storage.clear();
    }

    //#endregion
}
