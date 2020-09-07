import {Injectable} from '@angular/core';
import {TableConfig} from 'view-table';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  public indexHTMLCode = '```html\n' +
    '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n' +
    '```';

  public appComponentHTMLCode = '```html\n' +
    '<lib-view-table \n' +
    '[config]="config" \n' +
    '[content]="content" \n' +
    '(dblClick)="clickEvent($event)">\n' +
    '</lib-view-table>\n' +
    '```';

  constructor() { }

  getAppComponentCode(tableConfig: TableConfig, content: any[]): string {
    return '```typescript\n' +
      this.getTableConfig(tableConfig) + '\n' +
      this.getContent(content) + '\n' +
      this.getMethod() + '\n' +
      '```';
  }

  getTableConfig(tableConfig: TableConfig): string {
    return ' config: TableConfig = {\n' +
    '  data: [\n' + this.mapTableData(tableConfig) +
    '  rowHover: ' + tableConfig.rowHover + ',\n' +
    '  sortByColumn: \'' + tableConfig.sortByColumn + '\',\n' +
    '  sortDir: \'' + tableConfig.sortDir + '\',\n' +
    '  idTag: \'' + tableConfig.idTag + '\',\n' +
    '  locale: \'' + tableConfig.locale + '\'\n' +
    ' };\n';
  }

  mapTableData(tableConfig: TableConfig): string {
    return tableConfig.data.map(data => {
      let colInfo = '     {columnTitle: \'' + data.columnTitle + '\', objectAttribute: \'' + data.objectAttribute + '\'';
      colInfo += (data.displayAsColour ? ', displayAsColour: ' + data.displayAsColour : '');
      colInfo += (data.displayBooleanAsIcon ? ', displayBooleanAsIcon: ' + data.displayBooleanAsIcon : '');
      return colInfo + '}';
    }).join(', \n') + '\n  ],\n';
  }

  getContent(content: any[]): string {
    return ' content: any[] = [\n' + content.map(data => '  ' + JSON.stringify(data).replace(/"([^"]+)":/g, '$1:')).join(', \n') + '\n];\n';
  }

  getMethod(): string {
    return ' clickEvent(event): void {\n' +
      '   console.log(event);\n' +
      ' }';
  }

  getAppModuleCode(): string {
    return '```typescript\n' +
      'import { NgModule } from \'@angular/core\';\n' +
      '\n' +
      'import { AppComponent } from \'./app.component\';\n' +
      'import { ViewTableModule } from \'view-table\';\n' +
      '\n' +
      '@NgModule({\n' +
      '  imports:      [ ViewTableModule ],\n' +
      '  declarations: [ AppComponent ],\n' +
      '  bootstrap:    [ AppComponent ]\n' +
      '})\n' +
      'export class AppModule { }\n' +
      '```';
  }

}
