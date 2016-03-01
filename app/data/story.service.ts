import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Observable';

import {VisualTalesHttpService, Character, Scene, Tag} from './data';

@Injectable()
export class StoryService {
  private _storiesPath:any[] = ['/stories'];
  
  constructor(private _visualTalesHttp:VisualTalesHttpService){}

  getStory(id:number):Observable<Story>{
    return this._visualTalesHttp.get<Story>(this._storiesPath, id);
  }

  getStories(searchParams:any):Observable<Story[]>{
    let params:any = this.getStoryParams(searchParams);
    return this._visualTalesHttp.getAll<Story>(params); 
  }
  
  private getStoryParams({title='', tag_ids=[], page=1, page_size=20}):any{
    let params:any = {};
    
    if(title.length > 0){
      params.title = title;
    }
        
    if(tag_ids.length > 0){
      params.tagIds = tag_ids.join(',');    
    }
    
    params.page = page.toString();
    params.page_size = page_size.toString();
    
    return params;
  }
  
  createStory(story:Story):Observable<Story>{
    return this._visualTalesHttp.create<Story>(this._storiesPath, story);
  }
  
  updateStory(story:Story):Observable<Story>{
    return this._visualTalesHttp.update<Story>(this._storiesPath, story);
  }
  
  addCharacterToStory(id:number, payload:any):Observable<Character>{
    return this._visualTalesHttp.create<Character>(this.getCharacterPath(id), payload);
  }
  
  getCharactersForStory(id:number):Observable<Character[]>{
    return this._visualTalesHttp.getAll<Character>(this.getCharacterPath(id));
  }
  
  private getCharacterPath(id:number):any[]{
    return this._storiesPath.concat([id, 'characters']);
  }
  
  addSceneToStory(id:number, payload:any):Observable<Scene>{
    return this._visualTalesHttp.create<Scene>(this.getScenesPath(id), payload);  
  }
  
  getScenesForStory(id:number):Observable<Scene[]>{
    return this._visualTalesHttp.getAll<Scene>(this.getScenesPath(id));
  }
  
  private getScenesPath(id:number){
    return this._storiesPath.concat([id, 'scenes']);
  }
  
  addTagToStory(id:number, payload:any):Observable<Tag>{
    return this._visualTalesHttp.create<Tag>(this.getTagsPath(id), payload);
  }
  
  getTagsForStory(id:number):Observable<Tag[]>{
    return this._visualTalesHttp.getAll<Tag>(this.getTagsPath(id), 'tags');
  }
  
  private getTagsPath(id:number){
    return this._storiesPath.concat([id, 'tags']);
  }
}

export interface Story{
  id:number;
  title:string;
  description?:string;
  characters?:any[];
  scenes?:any[];
};