import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Language, TranslatedText } from '../language';

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
    return this.http.post<TranslatedText>(`${environment.baseUrl}/translate`, body, { headers }).pipe(
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
    return this.http.get<Language[]>(`${environment.baseUrl}/languages`);
  }
}
