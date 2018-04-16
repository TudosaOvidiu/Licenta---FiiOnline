import {
  Component,
  ElementRef,
  AfterViewInit,
  NgZone,
  Input,
  Output, EventEmitter
} from '@angular/core';

declare var $: any;

@Component({

  selector: 'tabs',
  styles: [`
    .carousel .carousel-item {
      display: block;
      width: 200px;
      height: 200px;
      position: relative;
      top: 0;
      left: 0;
    }
  `],
  template: `
    <ng-content></ng-content>`
})

export class MyTabsComponent implements AfterViewInit {

  $tabs: any;
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Input() swipeable = false;

  constructor(private el: ElementRef, private zone: NgZone) {
  }

  ngAfterViewInit() {
    this.zone
      .runOutsideAngular(() => {

        this.$tabs = $(this.el.nativeElement);
        this.$tabs.find('ul.tabs')
          .on('click', 'a', ((tab) => {
            this.zone.run(() => { // detect change and use
              this.onShow.emit({tab, tabRef: this.$tabs});
            });
          }).bind(this))
          .tabs({// initialize your tabs outside angular
            'responsiveThreshold': 1920,
            'swipeable': this.swipeable

          });

      });
  }
}
