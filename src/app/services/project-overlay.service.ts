import { inject, Injectable, output } from "@angular/core";
import { Project } from "../models/project.model";
import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ProjectOverlayComponent } from "../components/shared/project-overlay/project-overlay.component";
import { Subject } from "rxjs";

const OVERLAY_DETAILS = {
  width: '90%',
  maxWidth: '900px',
  maxHeight: '90dvh',
}
const OVERLAY_PREVIEW = {
  width: 'calc(100% - 8dvw)',
  maxWidth: '100%',
  maxHeight: '90dvh',
}

@Injectable({
  providedIn: "root"
})
export class ProjectOverlayService {
  private readonly overlay = inject(Overlay);
  private overlayRef?: OverlayRef;
  closed = new Subject<void>();

  openOverlay(project: Project, initialView: 'details' | 'preview' = 'details') {
    const positionStrategy = this.overlay
    .position()
    .global()
    .centerHorizontally()
    .centerVertically();

    const size = initialView === 'details' ? OVERLAY_DETAILS : OVERLAY_PREVIEW;


    const overlayConfig = new OverlayConfig({
      ...size,
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      backdropClass: 'cdk-overlay-blurred-backdrop',
      positionStrategy,
      panelClass: 'project-overlay-pane'
    });

    this.overlayRef = this.overlay.create(overlayConfig);
    const componentPortal = new ComponentPortal(ProjectOverlayComponent);
    const componentRef = this.overlayRef.attach(componentPortal);

    componentRef.setInput('project', project);
    componentRef.setInput('selectedView', initialView);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closed.next();
    });
  }

  // This method should be called to close the overlay from outside on closed subscription
  disposeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  setOverlaySize(position: 'details' | 'preview') {
    if (!this.overlayRef) return;
    const newSize = position === 'details' ? OVERLAY_DETAILS : OVERLAY_PREVIEW;
    this.overlayRef.updateSize(newSize);
  }
}