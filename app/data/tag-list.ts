import {BehaviorSubject, Subscription} from 'rxjs/Rx';

import {Tag, TagService, StoryService} from './data';

/**
 * (description)
 * 
 * @export
 * @class TagList
 */
export class TagList {
  /**
   * (description)
   * 
   * @type {BehaviorSubject<Tag[]>}
   */
  tags$:BehaviorSubject<Tag[]>;
  /**
   * (description)
   * 
   * @private
   * @type {Tag[]}
   */
  private _tags:Tag[];
  
  /**
   * Creates an instance of TagList.
   * 
   * @param {number} [storyId] (description)
   * @param {TagService} [_tagService] (description)
   * @param {StoryService} [_storyService] (description)
   */
  constructor(storyId?:number, private _tagService?:TagService, private _storyService?:StoryService) {
    this._tags = [];
    this.tags$ = new BehaviorSubject<Tag[]>(this._tags);
    
    if(storyId){
      let getTagsSub:Subscription = this._storyService.getTagsForStory(storyId)
        .subscribe(
          storyTags => {
            this.updateTags(storyTags);
            getTagsSub.unsubscribe(); 
          }
        );
    }
  }
  
  /**
   * Adds a tag to the tag list. 
   * 
   * @param {Tag} tag - the tag to add
   */
  addTag(tag:Tag):void{
    if(tag.id){
      this.updateTags(this._tags.concat([tag]));
    } else {
      let createTagSub:Subscription = this._tagService.createTag(tag)
        .subscribe(
          createdTag => {
            this.updateTags(this._tags.concat([createdTag]));
            createTagSub.unsubscribe();
          }
        )
    }
  }
  
  /**
   * (description)
   * 
   * @param {number} tagId - the id of the tag to remove.
   */
  removeTag(tagId:number):void{
    this.updateTags(this._tags.filter(tag => tag.id !== tagId));
  }
  
  /**
   * (description)
   * 
   * @private
   * @param {Tag[]} updatedTags (description)
   */
  private updateTags(updatedTags:Tag[]){
    this._tags = updatedTags;
    this.tags$.next(this._tags);
  }
}