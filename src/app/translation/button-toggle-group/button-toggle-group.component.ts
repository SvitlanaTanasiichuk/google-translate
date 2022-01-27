import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatOptionSelectionChange } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DefaultLanguages } from '../defaultLanguages';
import { Language } from '../language';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
  styleUrls: ['./button-toggle-group.component.scss']
})
export class ButtonToggleGroupComponent implements OnInit {
  @Input() selectedLang: Language;
  @Output() selectedLanguage = new EventEmitter<Language>();
  @ViewChild('matAutocompleteTrigger', {read: MatAutocompleteTrigger}) trigger: MatAutocompleteTrigger;


  // sourceLng: Language;
  // targetLng: Language;
  control: FormControl = new FormControl();
  showLanguagePanel = false;
  filteredOptions$: Observable<Language[]>;
  languages$: Observable<Language[]>;
  private filteredOptionsSubject = new BehaviorSubject<Language[]>([]);
  public defaultLanguages = DefaultLanguages;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.filteredOptions$ = this.filteredOptionsSubject.asObservable();
    this.getLanguages();
  }

  onChange(language: MatButtonToggleChange): void {
    this.selectedLanguage.emit(language.value);
    console.log('language', language.value);
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

  onLanguageChange(event: MatOptionSelectionChange): void {
    if (!event.isUserInput) {
      return;
    }

    this.selectedLanguage.emit(event.source.value);
    console.log(event);
  }

  private getLanguages(): Observable<Language[]> {
    return this.languages$ = this.translateService.getLanguages()
      .pipe(tap(val => this.filteredOptionsSubject.next(val)));
  }
}
