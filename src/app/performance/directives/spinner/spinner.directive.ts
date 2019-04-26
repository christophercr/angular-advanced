import {
  ComponentFactoryResolver,
  Directive,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import {SpinnerComponent} from '../../components/spinner/spinner.component';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective implements OnChanges, OnDestroy {

  @Input('appSpinner')
  visible: boolean = false;

  private readonly componentViewRef: ViewRef;
  viewRef: ViewRef;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {
    const componentFactory = componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
    const componentRef = componentFactory.create(injector);
    this.componentViewRef = componentRef.hostView;

    this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && !changes['visible'].isFirstChange()) {
      if (this.visible) {
        this.viewContainerRef.detach(this.viewContainerRef.indexOf(this.viewRef));
        this.viewContainerRef.insert(this.componentViewRef); // insert the view in the last position
      } else {
        this.viewContainerRef.detach(this.viewContainerRef.indexOf(this.componentViewRef));
        this.viewContainerRef.insert(this.viewRef);
      }
    }
  }

  ngOnDestroy(): void {
    this.componentViewRef.destroy(); // destroy the spinner
  }

}
