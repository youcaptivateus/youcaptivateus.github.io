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

				// presize video container
				this.$videoContainer = $('.fullscreen-video');
				this.sizeVideo();

				// build new video player
				this.player = new YCU.ui.VideoPlayer(this.$videoContainer,{
					src: src,
					type: type
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