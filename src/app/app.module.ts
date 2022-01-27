import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ButtonToggleGroupComponent } from './translation/button-toggle-group/button-toggle-group.component';
import { CardComponent } from './translation/card/card.component';
import { LanguagePanelComponent } from './translation/language-panel/language-panel.component';
import { TranslationCardComponent } from './translation/translation-card/translation-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TranslationCardComponent,
    LanguagePanelComponent,
    ButtonToggleGroupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
