import {Component, ElementRef, ViewChild} from '@angular/core';
import {TableConfig} from 'view-table';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SortDirection} from '@angular/material/sort';
import {MatExpansionPanel} from '@angular/material/expansion';
import {MsgNotification} from '../msg-notification/msg-notification.component';
import {MarkdownService} from '../markdown.service';
import {TableConfigService} from '../table-config.service';

@Component({
  selector: 'app-table-config-generator',
  templateUrl: './table-config-generator.component.html',
  styleUrls: ['./table-config-generator.component.css']
})
export class TableConfigGeneratorComponent {

  @ViewChild('configurationPanel', {static: true}) configurationPanel: MatExpansionPanel;
  @ViewChild('configurationFiles', {static: true}) configurationFiles: MatExpansionPanel;
  @ViewChild('copiedAlertMsg', {static: true}) copiedAlertMsg: ElementRef;

  tableConfig: TableConfig;
  removedColumnData: TableData[] = [];
  selectedSortByCol: TableData;
  content;
  jsonParseErr;
  copiedToClipboardMsg: MsgNotification;

  constructor(public configService: TableConfigService,
              public markdownService: MarkdownService) {
  }

  reset(): void {
    this.removedColumnData = [];
    this.content = [];
    this.selectedSortByCol = null;
  }

  parseJSON(value): void {
    this.reset();
    try {
      this.content = JSON.parse(value);
      this.jsonParseErr = '';
      if (!this.tableConfig) {
        this.configurationPanel.open();
      }
      this.tableConfig = this.configService.generateTableConfig(this.content);
      this.selectedSortByCol = this.tableConfig.data[0];
    } catch (e) {
      this.jsonParseErr = e;
    }
  }

  isBoolean(value): boolean {
    return typeof value === 'boolean';
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.id === 'cdk-drop-list-1' && this.selectedSortByCol && event.previousContainer.data[event.previousIndex].objectAttribute === this.selectedSortByCol.objectAttribute) {
        this.selectedSortByCol = undefined;
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.content = JSON.parse(JSON.stringify(this.content));
    this.tableConfig = JSON.parse(JSON.stringify(this.tableConfig));
  }

  setSortByColumn(event): void {
    this.tableConfig.sortByColumn = event ? event.objectAttribute : '';
    this.selectedSortByCol = event;
    this.content = JSON.parse(JSON.stringify(this.content));
  }

  setSortDirection(event): void {
    this.tableConfig.sortDir = event as SortDirection;
    this.content = JSON.parse(JSON.stringify(this.content));
  }

  setColumnTitle(data: TableData, event): void {
    data.columnTitle = event.target.value;
    if (this.selectedSortByCol.objectAttribute === data.objectAttribute) {
      this.selectedSortByCol = JSON.parse(JSON.stringify(data));
    }
  }

  showCopiedToClipboardMsg(): void {
    this.copiedToClipboardMsg = {msg: 'Copied to Clipboard!', color: '#DBFFDB'};
  }

}

export interface TableData {
    columnTitle: string;
    objectAttribute: string;
    dateFormat?: string;
    displayAsColour?: boolean;
    displayBooleanAsIcon?: boolean;
}
