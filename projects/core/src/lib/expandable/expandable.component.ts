import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { listAnimation } from '../animations/animations';

@Component({
  selector: 'fiv-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  animations: [listAnimation]
})
export class ExpandableComponent implements OnInit {

  public isOpen = false;
  state = 'closed';
  @Output() fivWillOpen: EventEmitter<ExpandableComponent> = new EventEmitter();
  @Output() fivDidOpen: EventEmitter<ExpandableComponent> = new EventEmitter();
  @Output() fivWillClose: EventEmitter<ExpandableComponent> = new EventEmitter();
  @Output() fivDidClose: EventEmitter<ExpandableComponent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.fivWillOpen.emit(this);
    this.isOpen = true;
    this.state = 'open';
  }

  toggle() {
    if (this.isOpen === false) {
      this.open();
    } else {
      this.close();
    }
  }

  close() {
    this.fivWillClose.emit(this);
    console.log('close');
    this.isOpen = false;
    this.state = 'closed';
  }

  onAnimationEnd(event) {
    if (event.fromState === 'closed') {
      this.fivDidOpen.emit(this);
    } else if (event.fromState === 'open') {
      this.fivDidClose.emit(this);
    }
  }

}
