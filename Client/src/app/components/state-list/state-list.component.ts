import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { State } from 'src/app/models/state';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnChanges {

  @Input() states: State[] | null = null;

  @Input() selectedState: State | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() state = new EventEmitter<State>();

  options: {[key: number]: boolean } = {};

  ngOnChanges() {
    this.updateOptions();
  }

  onClose() {
    this.close.emit();
  }

  addNew() {}

  updateOptions() {
    if (this.states) this.states.forEach((state) => {
      if (this.selectedState?.id == state.id) this.options[state.id] = true;
      else this.options[state.id] = false;
    });
  }

  toggleDropdown(element: HTMLElement) {
    element.classList.toggle('bi-chevron-down');
    element.classList.toggle('bi-chevron-up');
  }

  selectState(state: State) {
    this.selectedState = state;
    this.state.emit(this.selectedState);
  }
}