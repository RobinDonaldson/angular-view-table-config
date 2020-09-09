import {Component, ElementRef, ViewChild} from '@angular/core';
import {TableConfig} from 'view-table';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatSort} from '@angular/material/sort';
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
  content;
  jsonParseErr;
  copiedToClipboardMsg: MsgNotification;

  constructor(public configService: TableConfigService,
              public markdownService: MarkdownService) {
  }

  reset(): void {
    this.removedColumnData = [];
    this.content = [];
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
      if (event.container.id === 'cdk-drop-list-1' && event.previousContainer.data[event.previousIndex].objectAttribute === this.tableConfig.sortByAttribute) {
        this.clearSortConfig();
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.content = JSON.parse(JSON.stringify(this.content));
    this.tableConfig = JSON.parse(JSON.stringify(this.tableConfig));
  }

  sortDisabled(enabled: boolean) {
    this.tableConfig.sorting = enabled;
    if (!enabled) {
      this.clearSortConfig();
    }
  }

  sortChangeEvent($event: MatSort) {
    if ($event.direction) {
      this.tableConfig.sortByAttribute = $event.active;
      this.tableConfig.sortDir = $event.direction;
    } else {
      this.clearSortConfig();
    }
  }

  clearSortConfig() {
    this.tableConfig.sortByAttribute = '';
    this.tableConfig.sortDir = '';
  }

  setColumnTitle(data: TableData, event): void {
    data.columnTitle = event.target.value;
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
    displayAsIcon?: boolean;
}
