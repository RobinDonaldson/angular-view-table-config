import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auto-complete-search',
  templateUrl: './auto-complete-search.component.html',
  styleUrls: ['./auto-complete-search.component.scss']
})
export class AutoCompleteSearchComponent implements OnInit {

  private _idTag = 'auto_complete';
  @Input() set idTag(value: string) {
    if (value) {
      this._idTag = value.toLowerCase() + '_';
    }
  }
  get idTag(): string {
    return this._idTag;
  }

  private _data;
  @Input() set data(value: Array<any>) {
    this._data = value;
  }

  @Input() set selectData(value: any) {
    this.setSearchText(value ? value[this.displayField] : '');
  }

  @Input() displayField = 'name';
  @Input() formFieldTitle = '';
  @Input() placeHolderText = '';
  @Input() addBtnOption = false;
  @Output() validSelectionValueChange = new EventEmitter();

  selectedData: any;
  filteredData: Observable<any[]>;
  filteredDataSetCnt = 5;

  SEARCH = 'search';
  searchForm: FormGroup = new FormGroup({
    search: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
    this.subscribeFreeTextFilter();
  }

  subscribeFreeTextFilter(): void {
    this.filteredData = this.searchForm.get(this.SEARCH).valueChanges
      .pipe(map(value => this.filterData(value)));
  }

  filterData(value: string): [] {
    const FILTERED_DATA_SET = this._data.filter(dat => dat[this.displayField].toLowerCase().includes(value.toLowerCase().trim()));
    this.filteredDataSetCnt = FILTERED_DATA_SET.length;
    const VALID_DATA_SET = this._data.filter(dat => dat[this.displayField].toLowerCase().trim() === (value.toLowerCase().trim()));
    this.selectedData = VALID_DATA_SET.length === 1 ? VALID_DATA_SET[0] : undefined;
    if (!this.addBtnOption) {
      this.validSelectionValueChange.emit(this.selectedData);
    }
    return FILTERED_DATA_SET;
  }

  setSearchText(value: string): void {
    this.searchForm.get(this.SEARCH).setValue(value);
    this.searchForm.get(this.SEARCH).updateValueAndValidity();
  }

  addData(): void {
    this.validSelectionValueChange.emit(this.selectedData);
  }

}
