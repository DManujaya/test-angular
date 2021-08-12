import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { TrackByComponent } from './track-by/track-by.component';
import { DumbComponent } from './dumb/dumb.component';
import { SmartComponent } from './smart/smart.component';
import { ActiveDirective } from './directives/active.directive';
import { DynamicComponent } from './dynamic/dynamic.component';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { VideojsWavesurferComponent } from './videojs-wavesurfer/videojs-wavesurfer.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    ChildComponent,
    ParentComponent,
    TrackByComponent,
    DumbComponent,
    SmartComponent,
    ActiveDirective,
    DynamicComponent,
    VjsPlayerComponent,
    VideojsWavesurferComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
