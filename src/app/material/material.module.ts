import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatIconModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules,
  ],
  exports: [
    CommonModule,
    modules,
  ],
})
export class MaterialModule {
}
