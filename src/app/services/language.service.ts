import { inject, Injectable, signal } from "@angular/core";
import { language_en_us, LanguageApllication, language_pt_br } from "../models/language.model";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'

}) export class LanguageService {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    // 
    private currentLanguage = signal<LanguageApllication>(language_pt_br);
    public $currentLanguage = this.currentLanguage.asReadonly();

  updateLanguageSignal(language: 'pt_br' | 'en_us') {
    this.currentLanguage.set(language === 'pt_br' ? language_pt_br : language_en_us);
  }

  setLanguage(language: 'pt_br' | 'en_us', currentUrl: string[]) {
    const langUrl = language === 'pt_br' ? 'pt-br' : 'en-us';
    const currentSegments = this.router.url.split('/').filter(seg => seg);
    const updatedSegments = [langUrl, ...currentSegments.slice(1)];
    this.updateLanguageSignal(language);
    return this.router.navigate(['/', ...updatedSegments]);
  }
}