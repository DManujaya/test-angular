import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import videojs from 'video.js';
import * as WaveSurfer from 'wavesurfer.js';

import * as Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

import { annotations } from '../../assets/annotations.js';

/*
// Required imports when using videojs-wavesurfer 'live' mode with the microphone plugin
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
*/

import * as RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';
import * as MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js';
import * as TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';

WaveSurfer.regions = RegionsPlugin;
WaveSurfer.minimap = MinimapPlugin;
WaveSurfer.timeline = TimelinePlugin;

@Component({
  selector: 'app-videojs-wavesurfer',
  templateUrl: './videojs-wavesurfer.component.html',
  styleUrls: ['./videojs-wavesurfer.component.css'],
})
export class VideojsWavesurferComponent implements OnInit, OnDestroy {
  // reference to the element itself: used to access events and methods
  private _elementRef: ElementRef;

  // index to create unique ID for component
  idx = 'clip1';
  file = null;
  tag = null;

  private config: any;
  private player: any;
  private plugin: any;

  // constructor initializes our declared vars
  constructor(elementRef: ElementRef, private http: HttpClient) {
    this.player = false;
    this.file = false;
    this.tag = false;

    // save reference to plugin (so it initializes)
    this.plugin = Wavesurfer;

    // video.js configuration
    this.config = {
      controls: true,
      bigPlayButton: false,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 600,
      height: 300,
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        children: [
          'playToggle',
          'volumePanel',
          'durationDisplay',
          'timeDivider',
          'currentTimeDisplay',
          // 'progressControl',
          'playbackRateMenuButton',
          // 'fullscreenToggle',
        ],
      },
      plugins: {
        // configure videojs-wavesurfer plugin
        wavesurfer: {
          backend: 'MediaElement',
          displayMilliseconds: true,
          debug: true,
          waveColor: '#0100fd',
          progressColor: 'black',
          cursorColor: 'red',
          hideScrollbar: true,
          plugins: [WaveSurfer.regions.create()],
        },
      },
    };
  }

  ngOnInit() {}
  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {
    // ID with which to access the template's audio element

    let el = 'audio_' + this.idx;

    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el), this.config, () => {
      console.log('player ready! id:', el);

      // print version information at startup
      const msg =
        'Using video.js ' +
        videojs.VERSION +
        ' with videojs-wavesurfer ' +
        videojs.getPluginVersion('wavesurfer') +
        ' and wavesurfer.js ' +
        WaveSurfer.VERSION;
      videojs.log(msg);

      this.player.src({ src: 'assets/sample_3.wav' });
    });

    this.player.on('loadstart', () => {
      console.log('mediainfo', this.player.toJSON());
    });

    this.player.on('waveReady', (event) => {
      this.player.wavesurfer().setupPlaybackEvents(true);
      this.player.wavesurfer().surfer.enableDragSelection({
        color: this.randomColor(0.1),
      });
      if (localStorage.regions) {
        this.loadRegions(JSON.parse(localStorage.regions));
      } else {
        this.loadRegions(annotations);
        this.saveRegions();
      }

      this.player.wavesurfer().surfer.on('region-click', (region, e) => {
        e.stopPropagation();
        // Play on click, loop on shift click
        this.player.pause();
        e.shiftKey ? region.playLoop() : region.play();
      });

      this.player.wavesurfer().surfer.on('region-play', function (region) {
        region.once('out', function () {
          this.player.wavesurfer().surfer.play(region.start);
          this.player.wavesurfer().surfer.pause();
        });
      });
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });

    var stopButton = this.player.controlBar.addChild('button', {}, 1);
    var stopButtonDom = stopButton.el();
    stopButtonDom.innerHTML = '<i class="fas fa-stop"></i>';

    stopButtonDom.onclick = () => {
      const player = videojs('audio_clip1');
      player.pause();
      player.currentTime(0);
    };
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }

  randomColor(alpha) {
    return (
      'rgba(' +
      [
        ~~(Math.random() * 255),
        ~~(Math.random() * 255),
        ~~(Math.random() * 255),
        alpha || 1,
      ] +
      ')'
    );
  }

  loadRegions(regions) {
    regions.forEach((region) => {
      region.color = this.randomColor(0.1);
      this.player.wavesurfer().surfer.addRegion(region);
    });
  }

  saveRegions() {
    localStorage.regions = JSON.stringify(
      Object.keys(this.player.wavesurfer().surfer.regions.list).map((id) => {
        let region = this.player.wavesurfer().surfer.regions.list[id];
        return {
          start: region.start,
          end: region.end,
          attributes: region.attributes,
          data: region.data,
        };
      })
    );
  }
}
