import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Language } from './language';

export interface TranslatedText {
  translatedText: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private translatedText = new Subject<string>();

  constructor(private http: HttpClient) { }

  translate(value: string, sourceLng: string, targetLng: string): Observable<string> {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      q: value,
      source: sourceLng,
      target: targetLng,
      format: 'text'
    };
    return this.http.post<TranslatedText>('https://libretranslate.de/translate', body, { headers }).pipe(
      map(response => response.translatedText)
    );
  }

  getText(): Observable<string> {
    return this.translatedText.asObservable();
  }

  updateText(text: string): void {
    this.translatedText.next(text);
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>('https://libretranslate.de/languages');
  }
}
