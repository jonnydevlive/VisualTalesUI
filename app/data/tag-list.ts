import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Tag, TagService} from './data';

export class TagList {
  tags$:Subject<Tag[]>;
  private _tags:Tag[];
  
  constructor(private _tagService?:TagService) {
    this._tags = [];
    this.tags$ = new Subject<Tag[]>();
  }

  addTag(tag:Tag){
    if(tag.id){
      this._tags.push(tag);
      this.tags$.next(this._tags);
    }
  }
  
  removeTag(tagId:number){
    let tagIndex:number = this._tags.findIndex(
      tag => tag.id === tagId 
    );
    
    if(tagIndex !== this._tags.length){
      this._tags.splice(tagIndex, 1);
      this.tags$.next(this._tags);
    }
  }
}