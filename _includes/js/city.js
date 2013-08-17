/**
* City page specific functionality
*/
var YCU = YCU || {};
YCU.CityPage = {};
(function($, NS){
	$.extend(true, NS, {
		init: function(){
			var that = this;


			// Add banner image
			if (YCU.pageMeta.banner) {
				YCU.Main.$topper.html(_.template($('#template-city-topper').html()));

				// YCU.Main.$topper.find('.city-topper-wrapper').stellar({
				// 	horizontalScrolling: false
				// 	// verticalOffset: 40
				// });
			}


			YCU.Main.$content.find('.curator-container').html(_.template($('#template-curator-box').html(),{
				image: 'h',
				name: 'name',
				city: 'city',
				twitter: 'tweet'
			}));

			// resize events
			YCU.Main.resizeCallbacks.add(function(){
				$.proxy(that.onResize(), that);
			});



		},

		onResize: function(){
		}
	});

	$(function(){
		NS.init();
	});
})($, YCU.CityPage);