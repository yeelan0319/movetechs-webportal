function redoLayout(){
	var articles = $('.article');
	for(var i = 0, l = articles.length; i < l; i++) {
		redoLayoutArticle($(articles[i]));
	}
}

function redoLayoutArticle(article){
	var content = article.find('.container'),
		bgImg = article.find('.background');

	if(article.hasClass('article-full')) {
		article.css({
			height: $("html").height()
		});
		// content.css({
		// 	paddingTop: (article.innerHeight() - content.innerHeight())/2
		// });
	}

	if(bgImg) {
		var defer = $.Deferred();
		defer.promise(bgImg);

		(function resolveWhenImageHeaderLoaded() {
			if(bgImg.width() && bgImg.height) {
				defer.resolve();
			}
			else{
				setTimeout(resolveWhenImageHeaderLoaded, 100)
			}
		})();

		bgImg.done(function(){
			var containerHeight = article.innerHeight(),
				containerWidth = article.width(),
				bgWidthHeightRatio = bgImg.width() / bgImg.height(),
				bgTheoryHeight, 
				bgTheoryWidth, 
				bgRealWidth, 
				bgRealHeight;

			// Let the bgImg fill height first. Calculate the width in that case
			bgTheoryHeight = containerHeight;
			bgTheoryWidth = bgTheoryHeight * bgWidthHeightRatio;
			// The theortical width filled the container, good to go
			if(containerWidth <= bgTheoryWidth) {
				bgRealWidth = bgTheoryWidth;
				bgRealHeight = bgTheoryHeight;
			}
			// The theortical width is not wide enough to fill the container, reverse it.
			else{
				bgRealWidth = containerWidth;
				bgRealHeight = bgRealWidth / bgWidthHeightRatio;
			}
			bgImg.css({
				height: bgRealHeight,
				width: bgRealWidth,
				left: (containerWidth - bgRealWidth) / 2,
				top: (containerHeight - bgRealHeight) / 2 
			}).show();
		});
		article.trigger("resized");
	}
}

$(document).ready(function(){
	redoLayout();
	$(window).resize(redoLayout);
	$('.navbar-collapse').on('show.bs.collapse', function(){
		var nav = $(this).parents('.navbar');
		nav.addClass('bg-opaque');
		if(nav.hasClass('navbar-primary')) {
			$('#secondary-nav').collapse('hide');
		}
		else {
			nav.find('.navbar-header button').addClass('in');
		}
	});
	$('.navbar-collapse').on('hide.bs.collapse', function(){
		var nav = $(this).parents('.navbar')
		nav.removeClass('bg-opaque');
		if(nav.hasClass('navbar-secondary')) {
			nav.find('.navbar-header button').removeClass('in');
		}
	});
});