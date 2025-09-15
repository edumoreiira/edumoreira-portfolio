import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, inject, Injectable, signal } from "@angular/core";
import { DocumentListenerService } from "./document-listener.service";
import { OverlayContentComponent } from "../components/shared/site-previewer/overlay-content/overlay-content.component";
// import the new component

@Injectable({
    providedIn: 'root'
})
export class SitePreviewerService {
    private overlay = inject(Overlay);
    private dls = inject(DocumentListenerService);
    //
    private overlayRef: OverlayRef | null = null;
    private isOverlayOpen = signal(false);
    private currentIndex = signal(0);
    //
    public isOverlayOpen$ = this.isOverlayOpen.asReadonly();
    public currentIndex$ = this.currentIndex.asReadonly();
    
    setCurrentIndex(index: number) {
        this.currentIndex.set(index);
    }
    
    // update the return type
    openOverlay(): { overlayRef: OverlayRef, componentRef: ComponentRef<OverlayContentComponent> } | void {
        if (this.overlayRef) {
            return;
        }
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            height: 'calc(100svh - 4rem)',
            width: this.dls.screenSize$() > 1280 ? 'calc(100svw - 10rem)' : this.dls.screenSize$() > 640 ? 'calc(100svw - 3rem)' : 'calc(100svw - 1rem)',
            backdropClass: 'cdk-overlay-dark-backdrop',
            positionStrategy: this.overlay.position()
                .global()
                .centerHorizontally()
                .bottom('0')
        });
        this.isOverlayOpen.set(true);

        // create a componentportal for the new overlaycontentcomponent
        const portal = new ComponentPortal(OverlayContentComponent);
        const componentRef = this.overlayRef.attach(portal);

        return { overlayRef: this.overlayRef, componentRef };
    }

    closeOverlay() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.isOverlayOpen.set(false);
        }
    }
}