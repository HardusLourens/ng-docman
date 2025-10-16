import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
  Auth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  authState
} from '@angular/fire/auth';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
interface Dbuser {
  id: string;
  email: string;
  name: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private apiUrl = 'http://localhost:5000';

  private currentDbUser = new BehaviorSubject<Dbuser | null>(null);
  currentUser$ = this.currentDbUser.asObservable();

  constructor(private http: HttpClient) {
    authState(this.auth).subscribe( async (firebaseUser) => {
      if (firebaseUser) {
        // get or create user in db
        await this.syncUserWithDatabase(firebaseUser);
      } else {
        this.currentDbUser.next(null);
      }
    });
  }

  private async syncUserWithDatabase(firebaseUser: any) {
    try {
      // try ti get existing user or create new one
      const dbUser = await firstValueFrom(
        this.http.post<Dbuser>(`${this.apiUrl}/users/sync`, {
          firebaseId: firebaseUser.uid,
          email: firebaseUser.email,
        })
      )

      this.currentDbUser.next(dbUser);

    } catch (error) {
      console.error('Error syncing user with database', error);
  }
  }
  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

 async logout() {
    await signOut(this.auth);
    this.currentDbUser.next(null)
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  getCurrentUserId(): string | null {
    return this.currentDbUser.value?.id || null;
  }
}