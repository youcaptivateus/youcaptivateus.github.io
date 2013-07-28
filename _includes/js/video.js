/**
* Video page specific functionality
*/
var YCU = YCU || {};
YCU.VideoPage = {};
(function($, NS){
	$.extend(true, NS, {
		init: function(){
			var that = this;

			var src = YCU.pageMeta.video;

			// build player if there's a video
			if (src) {

				// vimeo or youtube
				var type = (/player.vimeo.com/.test(src)) ? 'vimeo' : 'youtube';


				YCU.Main.$body.addClass('video-type-'+type);

				// build out video element from _ template
				this.$videoContainer = $('.fullscreen-video').html(
					_.template($('#template-video-element').html(), {
						type: 'video/'+type,
						src: src
					})
				);

				this.sizeVideo();

				// instantiate video-element-player
				this.$video = this.$videoContainer.find('video').mediaelementplayer({
					videoWidth: '100%',
					videoHeight: '100%',
					pluginPath: '/images/mediaelement/',
					flashName: 'flashmediaelement.swf',
					silverlightName: 'silverlightmediaelement.xap',
					iPadUseNativeControls: true,
					iPhoneUseNativeControls: true,
					AndroidUseNativeControls: true
				});

				// resize events
				YCU.Main.resizeCallbacks.add(function(){
					$.proxy(that.onResize(), that);
				});

			}

		},

		onResize: function(){
			this.sizeVideo();
		},

		sizeVideo: function(){
			var useableHeight = YCU.Main.viewportHeight - YCU.Main.navHeight;
			var css = {};

			// window too short. letterbox.
			if (YCU.Main.viewportWidth * 0.5625 > useableHeight ){
				css.width = useableHeight * 1.77777;
				css.height = useableHeight;
			} else {

				// window plenty tall
				css.width = '100%';
				css.height = YCU.Main.viewportWidth * 0.5625;
			}

			this.$videoContainer.css(css);
		}
	});

	$(function(){
		NS.init();
	});
})($, YCU.VideoPage);