import {Component, OnInit} from 'angular2/core';
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

export class StoriesComponent implements OnInit {
  stories:Story[];
  
  titleControl:Control;
  
  title:string;
  storyTags:TagList;
  error:string;
  
  constructor(private _storyService:StoryService, private _router:Router) {
    this.storyTags = new TagList();
    this.titleControl = new Control();
    
    this.stories = this.stories || [];
    
    let titleObservable = this.titleControl.valueChanges
                 .debounceTime(800)
                 .distinctUntilChanged();
      
    Observable.forkJoin(titleObservable, this.storyTags.tags$)
        .flatMap(searchInfo => this._storyService.getStories({title:searchInfo[0], tag_ids:searchInfo[1]}))
        .subscribe(
          stories => this.stories = <Story[]>stories,
          error => this.error = error.toString()
        );
  }
  
  ngOnInit() {
    
  }
  
  selectStory = (story:Story) => {
      this._router.navigate(['StoryEditor', { id: story.id }]);
  };
}