import { Injectable, signal } from "@angular/core";

export type HomeView = 'freelancer' | 'developer' | 'none';
@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  private homeView = signal<HomeView | ''>('');
  homeView$ = this.homeView.asReadonly();

  setHomeView(view: HomeView | '') {
    this.homeView.set(view);
  }

}