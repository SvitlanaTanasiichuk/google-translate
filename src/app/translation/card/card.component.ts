import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Language } from '../language';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() sourceLng: Language;
  @Input() targetLng: Language;

  translation$ = new Subscription();
  private searchText$ = new Subject<string>();

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.getTranslation();
  }

  getValue(event: KeyboardEvent): void {
    return this.searchText$.next((event.target as HTMLInputElement).value);
  }

  private getTranslation(): void {
    this.translation$ = this.searchText$.pipe(
      filter(text => text.length >= 2),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.translateService.translate(value, this.sourceLng.code, this.targetLng.code),
      ),
    ).subscribe(res => this.translateService.updateText(res));
  }

  ngOnDestroy(): void {
    if (this.translation$) {
      this.translation$.unsubscribe();
    }
  }
}
