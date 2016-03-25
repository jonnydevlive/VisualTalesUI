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
  
  titleControl = new Control();
  
  title:string;
  storyTags:TagList;
  error:string;
  
  constructor(private _storyService:StoryService, private _router:Router) {
    this.storyTags = new TagList();
    
    this.stories = this.stories || [];
    
    let titleObservable = this.titleControl.valueChanges
                 .debounceTime(800)
                 .distinctUntilChanged();
      
        this._storyService.getStories()
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