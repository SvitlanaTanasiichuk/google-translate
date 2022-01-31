import { Component, OnInit } from '@angular/core';
import { DefaultLanguages } from '../defaultLanguages';
import { Language } from '../language';

@Component({
  selector: 'app-language-panel',
  templateUrl: './language-panel.component.html',
  styleUrls: ['./language-panel.component.scss'],
})
export class LanguagePanelComponent implements OnInit {
  defaultLanguages: Language[] = DefaultLanguages;
  sourceLng: Language;
  targetLng: Language;

  constructor() {
  }

  ngOnInit(): void {
    this.setDefaultLanguages();
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

      if (this.sourceLng === this.targetLng) {
        const index = this.defaultLanguages.findIndex(x => x === this.targetLng);
        this.targetLng = this.compareLanguages(index);
      }
    } else {
      this.targetLng = data;

      if (this.sourceLng === this.targetLng) {
        const index = this.defaultLanguages.findIndex(x => x === this.sourceLng);
        this.sourceLng = this.compareLanguages(index);
      }
    }

    this.setToLocalStorage(value, JSON.stringify(data));
  }

  private compareLanguages(index: number): Language {
    return index === 0
      ? this.defaultLanguages[index + 1]
      : this.defaultLanguages[index - 1];
  }

  private setToLocalStorage(value: string, data: string): void {
    localStorage.setItem(value, data);
  }

  private setDefaultLanguages(): void {
    this.sourceLng = this.getFromLocalStorage('sourceLng')
      ? this.getFromLocalStorage('sourceLng')
      : DefaultLanguages[0];

    this.targetLng = this.getFromLocalStorage('targetLng')
      ? this.getFromLocalStorage('targetLng')
      : DefaultLanguages[1];
  }

  private getFromLocalStorage(value: string): Language {
    const storageItem = localStorage.getItem(value);
    // @ts-ignore
    return JSON.parse(storageItem);
  }
}
