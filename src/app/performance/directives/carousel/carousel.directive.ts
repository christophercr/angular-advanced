import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

export interface CarouselContext {
  $implicit: string;
  controller: {
    next: () => void;
    prev: () => void;
  };
}

@Directive({
  selector: '[appCarousel]'
})
export class CarouselDirective implements OnInit {

  @Input('appCarouselFrom') images: string[];

  context: CarouselContext | null = null;
  index = 0;

  constructor(
    private templateRef: TemplateRef<CarouselContext>,
    private viewContainerRef: ViewContainerRef
  ) {
  }


  ngOnInit(): void {
    this.context = {
      $implicit: this.images[0],
      controller: {
        next: () => this.next(),
        prev: () => this.prev()
      }
    };

    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  next() {
    this.index++;
    if (this.index >= this.images.length) {
      this.index = 0;
    }
    this.context.$implicit = this.images[this.index];
  }

  prev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.images.length - 1;
    }
    this.context.$implicit = this.images[this.index];
  }

}
