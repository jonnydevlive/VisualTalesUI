import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

import 'rxjs/Rx';

import {StoryService} from './data/data';
import {VisualTalesHttpService, AuthenticationService} from './http/http';
import {VisualTalesAppComponent} from './visual-tales-app.component';

bootstrap(VisualTalesAppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, VisualTalesHttpService, AuthenticationService, StoryService]);