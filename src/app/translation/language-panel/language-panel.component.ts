import { Component, OnInit } from '@angular/core';
import { DefaultLanguages } from '../defaultLanguages';
import { Language } from '../language';

@Component({
  selector: 'app-language-panel',
  templateUrl: './language-panel.component.html',
  styleUrls: ['./language-panel.component.scss'],
})
export class LanguagePanelComponent implements OnInit {
  sourceLng: Language = DefaultLanguages[0];
  targetLng: Language = DefaultLanguages[1];

  constructor() {
  }

  ngOnInit(): void {
  }

  changeSourceLng(): void {
    const oldSource = this.sourceLng;
    const oldTarget = this.targetLng;
    this.targetLng = oldSource;
    this.sourceLng = oldTarget;
    this.setToLocalStorage('sourceLng', JSON.stringify(this.sourceLng));
    this.setToLocalStorage('targetLng', JSON.stringify(this.targetLng));
  }

  onLngSelect(data: Language, value: string): void {
    if (value === 'sourceLng') {
      this.sourceLng = data;
    } else {
      this.targetLng = data;
    }

    this.setToLocalStorage(value, JSON.stringify(data));
  }

  private setToLocalStorage(value: string, data: string): void {
    localStorage.setItem(value, data);
  }

  private getFromLocalStorage(value: string): void {
    localStorage.getItem(value);
  }
}
