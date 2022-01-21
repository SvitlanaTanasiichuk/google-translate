import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Language } from '../language';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-language-panel',
  templateUrl: './language-panel.component.html',
  styleUrls: ['./language-panel.component.scss'],
})
export class LanguagePanelComponent implements OnInit {
  languages$ = new Observable<Language[]>();
  control = new FormControl();
  sourceLng: Language = {code: 'ru', name: 'Russian'};
  targetLng: Language = {code: 'en', name: 'English'};
  lastLng: Language = {code: 'de', name: 'German'};

  constructor(private translateService: TranslateService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLanguages();
  }

  private getLanguages(): void {
    this.languages$ = this.translateService.getLanguages();
  }

  onChange(language: MatButtonToggleChange): void {
    this.sourceLng.code = language.value;
    console.log('language', language);
  }

  onLanguageChange(event: MatOptionSelectionChange, data: string): void {
    if (!event.isUserInput) {
      return;
    }

    const jsonData = JSON.stringify(event.source.value);

    if (data === 'sourceLng') {
      this.sourceLng.code = event.source.value.code;
      localStorage.setItem('sourceLng', jsonData);
    }

    if (data === 'targetLng') {
      this.targetLng.code = event.source.value.code;
      localStorage.setItem('targetLng', jsonData);
    }

    console.log(event);
  }

  changeSourceLng(): void {
    const oldSource = this.sourceLng;
    const oldTarget = this.targetLng;
    this.targetLng = oldSource;
    this.sourceLng = oldTarget;
  }
}
