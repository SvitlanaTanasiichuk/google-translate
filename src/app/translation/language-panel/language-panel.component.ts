import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Language } from '../language';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-language-panel',
  templateUrl: './language-panel.component.html',
  styleUrls: ['./language-panel.component.scss'],
})
export class LanguagePanelComponent implements OnInit {
  @ViewChild('matAutocompleteTrigger', {read: MatAutocompleteTrigger}) trigger: MatAutocompleteTrigger;

  filteredOptions$: Observable<Language[]>;
  languages$: Observable<Language[]>;
  showLanguagePanel = false;
  control: FormControl = new FormControl();
  sourceLng: Language;
  targetLng: Language;

  private filteredOptionsSubject = new BehaviorSubject<Language[]>([]);

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.filteredOptions$ = this.filteredOptionsSubject.asObservable();
    this.getLanguages();
  }

  private getLanguages(): Observable<Language[]> {
    return this.languages$ = this.translateService.getLanguages()
      .pipe(tap(val => this.filteredOptionsSubject.next(val)));
  }

  onLanguageChange(event: MatOptionSelectionChange, data: string): void {
    if (!event.isUserInput) {
      return;
    }

    if (data === 'sourceLng') {
      this.sourceLng = event.source.value;
    }

    if (data === 'targetLng') {
      this.targetLng = event.source.value;
    }

    const jsonData = JSON.stringify(event.source.value);
    this.setToLocalStorage(data, jsonData);
    console.log(event);
  }

  setToLocalStorage(value: string, data: string): void {
    localStorage.setItem(value, data);
  }

  changeSourceLng(): void {
    const oldSource = this.sourceLng;
    const oldTarget = this.targetLng;
    this.targetLng = oldSource;
    this.sourceLng = oldTarget;
  }

  toggleAutocomplete(): void {
    this.showLanguagePanel = !this.showLanguagePanel;
  }

  onAutocompleteKeyUp(searchText: string, languages: Language[]): void {
    const lowerSearchText = searchText?.toLowerCase();

    this.filteredOptionsSubject.next(
      languages.filter(val =>
        val.name.toLocaleLowerCase().includes(lowerSearchText)));
  }

  onLngSelect(event: Event): void {
    console.log(86, event);
  }
}
