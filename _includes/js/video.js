/**
* Video page specific functionality
*/
var YCU = YCU || {};
YCU.VideoPage = {};
(function($, NS){
	$.extend(true, NS, {
		init: function(){
			var that = this;

			this.$video = $('.fullscreen-video');

			// resize events
			YCU.Main.resizeCallbacks.add(function(){
				$.proxy(that.onResize(), that);
			});

			// init actions
			this.sizeVideo();
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

			this.$video.css(css);
		}
	});

	$(function(){
		NS.init();
	});
})($, YCU.VideoPage);