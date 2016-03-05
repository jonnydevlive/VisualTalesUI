import {Component, OnInit, Input} from 'angular2/core';
import {Control} from 'angular2/common';
import {TagService, Tag, TagList} from '../data/data'

@Component({
  selector: 'tags',
  templateUrl: 'app/components/tags.component.html',
  styleUrls: ['app/components/tags.component.css']
})
export class TagsComponent implements OnInit {
  @Input() tagList:TagList;
  public tags:Tag[] = [];
  
  addTagControl:Control;
  foundTags:Tag[];
  
  isAddTagFocused:boolean;
  addTagWidth:string;
  addTagName:string;

  public constructor(private _tagService:TagService) {
    this.foundTags = [];
    this.isAddTagFocused = false;
    this.addTagControl = new Control();
    
    this.addTagControl.valueChanges
      .flatMap(tagName => this._tagService.getTags(tagName))
      .subscribe(
        (foundTags:Tag[]) => {
          this.autoGrow(foundTags.length > 0);
          this.foundTags = foundTags;
        } 
      );
  }
  
  ngOnInit(){
    this.tagList.tags$.subscribe(
      tags => this.tags = tags
    );
  }

  public delete(id: number) {
    this.tagList.removeTag(id);
  }

  public autoGrow(tagsFound:boolean) {
    if(this.addTagName === undefined || this.addTagName === ''){
      this.addTagWidth = '';
    } else {
      let width:number = (this.addTagName.length * .6) + 1.3;
      this.addTagWidth = width + 'em';
    }
  }

  public onFocus() {
    this.isAddTagFocused = true;
  }

  public add() {
    let tagToAdd:Tag = this.foundTags.find(
      tag => tag.name === this.addTagName
    );
    
    tagToAdd = tagToAdd || {name:this.addTagName};
    
    this.tagList.addTag(tagToAdd);
    this.resetAddTag();
  }

  private resetAddTag() {
    this.addTagName = '';
    this.addTagWidth = '';
    this.isAddTagFocused = false;
  }
}