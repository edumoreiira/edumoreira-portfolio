import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { LanguageService } from "../services/language.service";

@Injectable({
    providedIn: 'root'
})
export class LangGuard implements CanActivate {
    private router = inject(Router);
    private language = inject(LanguageService);

    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        const lang = route.params['lang'];
        const allowedLanguages = ['pt-br', 'en-us'];
        if (allowedLanguages.includes(lang)) {
            const langToSet = lang === 'pt-br' ? 'pt_br' : 'en_us';
            this.language.updateLanguageSignal(langToSet);
            return true;
        }
        return this.router.parseUrl('/pt-br/home');
    }
}