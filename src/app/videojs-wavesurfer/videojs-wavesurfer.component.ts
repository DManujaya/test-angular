import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import videojs from 'video.js';
import * as WaveSurfer from 'wavesurfer.js';

/*
// Required imports when using videojs-wavesurfer 'live' mode with the microphone plugin
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
*/

// Register videojs-wavesurfer plugin
import * as Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

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

  private config: any;
  private player: any;
  private plugin: any;

  // constructor initializes our declared vars
  constructor(elementRef: ElementRef) {
    this.player = false;

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
          'progressControl',
          'remainingTimeDisplay',
          'playbackRateMenuButton',
          'fullscreenToggle',
          'ResolutionButton',
        ],
      },
      plugins: {
        // configure videojs-wavesurfer plugin
        wavesurfer: {
          backend: 'MediaElement',
          displayMilliseconds: true,
          debug: true,
          waveColor: '#4A4A22',
          progressColor: 'black',
          cursorColor: 'black',
          hideScrollbar: true,
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

      // load file
      this.player.src({ src: 'assets/hal.wav', type: 'audio/wav' });
    });

    this.player.on('waveReady', (event) => {
      console.log('waveform is ready!');
    });

    this.player.on('playbackFinish', (event) => {
      console.log('playback finished.');
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });

    var myButton = this.player.controlBar.addChild('button', {}, 1);
    var myButtonDom = myButton.el();
    console.log(myButtonDom)
    myButton.addClass('vjs-icon-square');

    myButtonDom.onclick = function () {
      alert('Redirecting');
      window.location.href = 'https://www.google.com';
    };
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }
}
