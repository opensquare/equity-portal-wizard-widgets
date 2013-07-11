function commonSearchSubmission(channel,terms) {
	var $searchResultsContainer = $('[channel="'+channel+'"]').parent().find('.search-results,.search-results .widget-content').last();
	$searchResultsContainer.empty();

	if(terms!=''){
		$searchResultsContainer.addClass('loading');

		// Check for pol nums and expand to 8 digits
		var pol = terms.split('/');

		if (pol.length == 2 && pol[0].length == 3 && isNaN(parseInt(pol[0],10)) && !isNaN(parseInt(pol[1],10))) {
			// Found a pol num
			var newterms = '00000000' + pol[1];
			terms = pol[0] + '/' + newterms.slice(-8);
		};

		pw.notifyChannelOfEvent(channel, { searchValue: terms });
		$searchResultsContainer.removeClass('loading');
	};

	// Prevent possible page refresh
	return false;
}
