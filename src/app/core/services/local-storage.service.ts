import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    constructor() { }

    public setItem(key: string, data: unknown): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public getItem(key: string): unknown {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clear() {
        localStorage.clear();
    }
}