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
			height: window.innerHeight
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
			bgTheoryHeight = Math.ceil(containerHeight) + 1;
			bgTheoryWidth = Math.ceil(bgTheoryHeight * bgWidthHeightRatio);
			// The theortical width filled the container, good to go
			if(containerWidth <= bgTheoryWidth) {
				bgRealWidth = bgTheoryWidth;
				bgRealHeight = bgTheoryHeight;
			}
			// The theortical width is not wide enough to fill the container, reverse it.
			else{
				bgRealWidth = Math.ceil(containerWidth);
				bgRealHeight = Math.ceil(bgRealWidth / bgWidthHeightRatio) + 1;
			}
			bgImg.css({
				height: bgRealHeight,
				width: bgRealWidth,
				left: (containerWidth - bgRealWidth) / 2,
				top: (containerHeight - bgRealHeight) / 2 
			}).show();
		});
	}
}

$(document).ready(function(){
	redoLayout();
	$(window).resize(redoLayout);
});