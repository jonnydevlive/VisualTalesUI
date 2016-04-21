import {Component} from 'angular2/core';
import {Control, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {StoryService, Story, TagList} from '../data/data';
import {ImagePanelListComponent} from '../components/image-panel-list.component';
import {TagsComponent} from '../components/tags.component';

@Component({
  selector: 'stories',
  templateUrl: 'app/stories/stories.component.html',
  styleUrls: ['app/stories/stories.component.css'],
  directives: [FORM_DIRECTIVES, ImagePanelListComponent, TagsComponent]
})

export class StoriesComponent{
  stories:Story[];
  
  titleControl = new Control();
  
  title:string;
  storyTags:TagList;
  error:string;
  
  constructor(private _storyService:StoryService, private _router:Router) {
    this.storyTags = new TagList();
    
    this.stories = this.stories || [];
    
    let tagIds$ = this.storyTags.tags$
      .map(tags => tags.map(tag => tag.id))
    
    let title$ = this.titleControl.valueChanges
                 .debounceTime(800)
                 .distinctUntilChanged();
    
    Observable.combineLatest(title$, tagIds$)
      .flatMap(searchParams => this._storyService.getStories({title: searchParams[0], tags_ids:searchParams[1]}))
      .subscribe(
        (stories:Story[]) => { this.stories = stories; },
        error => { this.error = error.toString(); }
      )
  }
  
  selectStory = (story:Story) => {
      this._router.navigate(['StoryEditor', { id: story.id }]);
  };
}