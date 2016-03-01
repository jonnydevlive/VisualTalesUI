import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Tag, TagService} from './data';

export class TagList {
  tags$:Subject<Tag[]>;
  private tags:Tag[];
  
  constructor(private _tagService?:TagService) {
    this.tags$ = new Subject<Tag[]>();
  }

  addTag(tagName){
    
  }
  
  removeTag(tagId:number){
    let tagIndex:number = 0;
    
    while(this.tags[tagIndex].id !== tagId && tagIndex < this.tags.length){
      tagIndex++;
    }
    
    if(tagIndex !== this.tags.length){
      this.tags.splice(tagIndex, 1);
      this.tags$.next(this.tags);
    }
  }
}