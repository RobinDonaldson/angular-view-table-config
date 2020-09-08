import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ViewTableModule} from 'view-table';
import {TableConfigGeneratorComponent} from './table-config-generator/table-config-generator.component';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {AutoCompleteSearchComponent} from './auto-complete-search/auto-complete-search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatExpansionModule} from '@angular/material/expansion';
import {NpmInstallComponent} from './npm-install/npm-install.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MsgNotificationComponent} from './msg-notification/msg-notification.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MarkdownModule} from 'ngx-markdown';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

@NgModule({
  declarations: [
    AppComponent,
    AutoCompleteSearchComponent,
    TableConfigGeneratorComponent,
    NpmInstallComponent,
    MsgNotificationComponent
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ViewTableModule,
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatInputModule,
    MatExpansionModule,
    ClipboardModule,
    MatTabsModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
