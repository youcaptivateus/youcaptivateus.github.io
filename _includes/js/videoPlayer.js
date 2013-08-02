/**
* Video player wrapper around
* media element player
*/
var YCU = YCU || {};
YCU.ui = YCU.ui || {};

(function($, NS, undefined){

	NS.VideoPlayer = function(el, opts){

		this.opts = $.extend(true, {
			src: null,
			mep:{
				videoWidth: '100%',
				videoHeight: '100%',
				pluginPath: '/images/mediaelement/',
				flashName: 'flashmediaelement.swf',
				silverlightName: 'silverlightmediaelement.xap',
				iPadUseNativeControls: true,
				iPhoneUseNativeControls: true,
				AndroidUseNativeControls: true
			}
		}, opts);

		// vimeo or youtube
		this.opts.type = (/player.vimeo.com/.test(this.opts.src)) ? 'vimeo' : 'youtube';

		// if container is string, make jQ object
		this.$videoContainer = (typeof el === 'object') ? el : $(el);

		// build out video element from _ template
		this.$videoContainer.html(
			_.template($('#template-video-element').html(), {
				type: 'video/'+this.opts.type,
				src: this.opts.src
			})
		);

		// instantiate video-element-player
		this.videoId = _.uniqueId('video_');
		this.$videoContainer.find('video').attr('id',this.videoId);

		this.mep = new MediaElementPlayer('#'+this.videoId,{
			videoWidth: '100%',
			videoHeight: '100%',
			pluginPath: '/images/mediaelement/',
			flashName: 'flashmediaelement.swf',
			silverlightName: 'silverlightmediaelement.xap',
			iPadUseNativeControls: true,
			iPhoneUseNativeControls: true,
			AndroidUseNativeControls: true,

			// cb doesn't appear to work for vimeo
			success: function(){
				this.player.addEventListener('timeupdate', function(){
				});
			}
		});

	}

	NS.VideoPlayer.prototype = {
		getType: function(){
			return this.opts.type;
		}
	}


})($, YCU.ui);