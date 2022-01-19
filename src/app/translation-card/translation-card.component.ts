import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-translation-card',
  templateUrl: './translation-card.component.html',
  styleUrls: ['./translation-card.component.scss']
})
export class TranslationCardComponent implements OnInit {
  translatedText: Observable<string> | undefined;

  constructor(private translateService: TranslateService ) { }

  ngOnInit(): void {
    this.translatedText = this.translateService.getText();
    console.log(this.translatedText);
  }

}
