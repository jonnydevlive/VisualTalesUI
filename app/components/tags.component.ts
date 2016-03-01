import {Component, OnInit, Input} from 'angular2/core';
import {Control, NgControl} from 'angular2/common';
import {TagService, Tag, TagList} from '../data/data'

@Component({
  selector: 'tags',
  template: `
                <div class="chip" *ngFor="#tag of tags">
                    {{tag.name}}
                    <span class="close-btn" (click)="delete(tag.id)">&times;</span>
                </div>
                <div class="add-chip">
                  <form>
                    <input type="text" ngControl="newTagControl" (focus)="onFocus()" #newTagElement (keyup.enter)="add(newTagElement)" placeholder="Add Tag">
                    <span class="close-btn" *ngIf="isNewTagFocused" (click)="newTagCancel(newTagElement)">&times;</span>
                  </form>
                </div>
              `,
  styleUrls: ['app/components/tags.component.css']
})
export class TagsComponent implements OnInit {
  @Input() tagList:TagList;
  public tags: any[] = [];
  newTagControl:Control; 
  newTagElement:Element;
  isNewTagFocused: boolean = false;
  newTagDefaultWidth: number = 70;

  public constructor() { }
  
  ngOnInit(){
    this.tagList.tags$.subscribe(
      tags => this.tags = tags
    );
  }
  
  ngAfterViewInit(){
    console.log(this.newTagElement);
  }

  public delete(id: number) {
    this.tagList.removeTag(id);
  }

  public autoGrow(newTagElement) {
    
    var baseCount: number = 4;
    var increaseBy: number = 8;
    var width: number = this.newTagDefaultWidth + (newTagElement.value.length - baseCount < 0 ? 0 : newTagElement.value.length - baseCount) * increaseBy;
    newTagElement.style = "width: " + width + "px";
  }

  public onFocus() {
    this.isNewTagFocused = true;
  }

  public newTagCancel(newTagElement) {
    this.resetNewTag(newTagElement);
  }

  public add(newTagElement) {
    this.tagList.addTag(newTagElement);
    this.resetNewTag(newTagElement);
  }

  private resetNewTag(newTagElement) {
    newTagElement.value = "";
    newTagElement.blur();
    newTagElement.style = "width: " + this.newTagDefaultWidth + "px";
    this.isNewTagFocused = false;
  }
}