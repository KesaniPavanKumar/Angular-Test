import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'simbiotik_jwt';
  private user$ = new BehaviorSubject<any>(null);
  userObs$ = this.user$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) this.user$.next({ token });
  }

  login(data: { username: string; password: string }) {
    return this.http.post(`${environment.apiBase}/users/login`, data).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem(this.tokenKey, res.token);
          this.user$.next(res);
        }
      })
    );
  }

  logout() { localStorage.removeItem(this.tokenKey); this.user$.next(null); }
  isLoggedIn() { return !!localStorage.getItem(this.tokenKey); }
  getToken() { return localStorage.getItem(this.tokenKey); }
}
