import { inject, Injectable } from "@angular/core";
import { Project } from "../models/project.model";
import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ProjectOverlayComponent } from "../components/shared/project-overlay/project-overlay.component";

@Injectable({
  providedIn: "root"
})
export class ProjectOverlayService {
  private readonly overlay = inject(Overlay);

  openOverlay(project: Project) {
    const positionStrategy = this.overlay
    .position()
    .global()
    .centerHorizontally()
    .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      width: '90%',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      maxWidth: '900px',
      maxHeight: '90dvh',
      backdropClass: 'cdk-overlay-blurred-backdrop',
      positionStrategy,
    });

    const overlayRef = this.overlay.create(overlayConfig);
    const componentPortal = new ComponentPortal(ProjectOverlayComponent);
    const componentRef = overlayRef.attach(componentPortal);

    componentRef.setInput('project', project);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });





  }
}