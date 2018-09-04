import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SessionService {

  constructor() { }

  private storageSub = new Subject<boolean>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  getitem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next(true);
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.storageSub.next(true);
  }

  removeAllItems() {
    localStorage.clear();
    this.storageSub.next(true);
  }
}
