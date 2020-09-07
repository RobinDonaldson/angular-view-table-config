import {Injectable} from '@angular/core';
import {TableConfig} from 'view-table';

@Injectable({
  providedIn: 'root'
})
export class TableConfigService {

  constructor() { }

  public generateTableConfig(content): TableConfig {

    const VALID_KEYS: {field: string, type: string}[] = this.getValidKeys(content);

    const DATA = VALID_KEYS.map(key => ({
      columnTitle: this.getColumnName(key.field),
      objectAttribute: key.field,
      displayBooleanAsIcon: key.type === 'boolean',
      displayAsColour: this.isValidColor(this.retrieveValue(content[0], key.field))
    }));

    return {
      data: DATA,
      rowHover: true,
      sortByColumn: VALID_KEYS[0].field,
      sortDir: 'asc',
      idTag: 'table',
      locale: 'en-UK'
    };

  }

  private getValidKeys(value: any[]): {field: string, type: string}[] {

    const ALL_KEYS_ARR: {field: string, type: string}[][] = value.map(val => this.getAllNestedObjectProps(val));
    const UNIQUE_KEYS_DE_REFERENCED: Set<string> = new Set([].concat.apply([], ALL_KEYS_ARR).map(objects => JSON.stringify(objects)));
    const MAPPED_UNIQUE_FIELDS: {field: string, type: string}[] = [];
    UNIQUE_KEYS_DE_REFERENCED.forEach(obj => {
      const OBJECT = JSON.parse(obj);
      if (OBJECT.type !== 'object') {
        MAPPED_UNIQUE_FIELDS.push(OBJECT);
      }
    });

    const VALID_KEYS: {field: string, type: string}[] = [];
    MAPPED_UNIQUE_FIELDS.forEach(key => {
      if (ALL_KEYS_ARR.filter(array => array.map(arr => arr.field).includes(key.field)).length === value.length) {
        VALID_KEYS.push(key);
      }
    });

    return VALID_KEYS;
  }

  private getAllNestedObjectProps(val): {field: string, type: string}[] {
    const PROPS: {field: string, type: string}[] = this.getObjProps(val);
    const PROPS_TO_SPLICE: {field: string, type: string}[] = [];
    for (let i = 0; i < PROPS.length; i++) {
      const FIELD = PROPS[i];
      if (Array.isArray(val[PROPS[i].field])) {
        PROPS_TO_SPLICE.push(PROPS[i]);
        continue;
      }
      let object;
      if (PROPS[i].field.includes('.')) {
        const FIELDS = PROPS[i].field.split('.');
        object = val[FIELDS[0]];
        for (let j = 1; j < FIELDS.length; j++) {
          object = object[FIELDS[j]];
        }
      } else {
        object = val[PROPS[i].field];
      }
      const optFields = this.getObjProps(object);
      if (optFields !== object) {
        optFields.forEach(field => PROPS.push({field: PROPS[i].field + '.' + field.field, type: typeof object[field.field]}));
        PROPS_TO_SPLICE.push(FIELD);
      }
    }
    PROPS_TO_SPLICE.forEach(fieldToSplice => {
      PROPS.splice(PROPS.indexOf(fieldToSplice), 1);
    });
    return PROPS;
  }

  private getObjProps(value): {field: string, type: string}[] {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      const PROPS = Object.getOwnPropertyNames(value);
      const PROPS_TYPE_DICTIONARY = [];
      PROPS.forEach(prop => PROPS_TYPE_DICTIONARY.push({field: prop, type: typeof value[prop]}));
      return PROPS_TYPE_DICTIONARY;
    } else {
      return value;
    }
  }

  private getColumnName(property: string): string {
    return property.split(/(?=[A-Z])/).join(' ').split('.').join(' ').toUpperCase();
  }

  private isColor(strColor): boolean {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
  }

  public isValidColor(value): boolean {
    return (/^#[0-9A-F]{6}$/i.test(value) || /^#([0-9A-F]{3}){1,2}$/i.test(value) || this.isColor(value));
  }

  public retrieveValue(obj, path): any {
    path.split('.').forEach(field => {
      obj = obj[field];
    });
    return obj;
  }

}
