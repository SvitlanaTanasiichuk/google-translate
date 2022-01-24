import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Language } from '../language';

@Component({
  selector: 'app-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
  styleUrls: ['./button-toggle-group.component.scss']
})
export class ButtonToggleGroupComponent implements OnInit {
  @Input() language: Language;
  @Output() selectedLanguage = new EventEmitter();

  option1: Language = {code: 'ru', name: 'Russian'};
  option2: Language = {code: 'en', name: 'English'};
  option3: Language = {code: 'de', name: 'German'};

  constructor() { }

  ngOnInit(): void {
  }

  onChange(language: MatButtonToggleChange): void {
    this.selectedLanguage.emit(language);
    console.log('language', language);
  }
}
