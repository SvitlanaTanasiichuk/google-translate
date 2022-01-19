import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Language } from '../language';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-language-panel',
  templateUrl: './language-panel.component.html',
  styleUrls: ['./language-panel.component.scss']
})
export class LanguagePanelComponent implements OnInit {
  languages$ = new Observable<Language[]>();
  languages: FormGroup;
  panelOpenState = false;
  fontStyle: any;
  sourceLng = 'ru';
  targetLng = 'en';
  lastLng = 'de';

  constructor(private translateService: TranslateService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getLanguages();
    this.initialiseForm();
  }

  private getLanguages(): void {
    this.languages$ = this.translateService.getLanguages();
  }

  private initialiseForm(): void {
    this.languages =  this.fb.group({
      name: ''
    });
  }

  onChange(languageCode: Language): void {
    console.log(languageCode);
  }
}
