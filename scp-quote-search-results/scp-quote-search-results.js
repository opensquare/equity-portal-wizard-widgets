function Widget_scp_quote_search_results() {

	this.channel = null;
    this.filterIndex = null;
    this.filterString = null;
    this.showUrl = null;

	this.initExtend = function() {
		this.channel = this.$widgetDiv.attr("channel");
		pw.addListenerToChannel(this, this.channel);
        this.filterIndex = this.$widgetDiv.parentsUntil("[filterIndex]").parent().attr("filterIndex");
        this.filterString = this.$widgetDiv.parentsUntil("[filterIndex]").parent().attr("filterString");
        this.showUrl = this.$widgetDiv.parentsUntil("[showUrl]").parent().attr("showUrl");
        if(this.showUrl == null){
            this.showUrl = "#quote/show/";
        }
	}
	
	this.handleEvent = function(channel, event) {
		//this.loadHTMLWithParams("searchValue=" + event.searchValue +"%25");
		//alert('here!');
		//this.loadHTMLWithParams("searchValue=" + encodeURIComponent('%25'+ event.searchValue +'%25'));
		this.napierSearch(event.searchValue);
	}

	this.napierSearch = function(terms) {
		if(typeof(terms) != 'undefined') {
			// quick check if just calcrefs
			var calcref = parseInt(terms,10);

			var $searchResultsContainer = $('[channel="quoteSearch"]').parent().find('.search-results');
			$searchResultsContainer.html('<ul></ul>');

			if(isNaN(calcref)){
				// Do a general quicksearch
				this.napierQuickSearch(terms);
			} else {
				var calcref = terms.split(',');

				for (var i=0;i<calcref.length;i++){ 
					// Iterate through numbers
					var calc = +calcref[i];
					if(isNaN(calc)){
						var calc = calcref[i].split('-');
						if(calc.length == 2){
							if (Math.max(calc[0],calc[1]) - Math.min(calc[0],calc[1]) > 50) {alert(calcref[i] + ' number range is too large')} else {;
								for (var x=Math.min(calc[0],calc[1]);x<=Math.max(calc[0],calc[1]);x++){
									this.napierSearchCalc(x);
								}
							}
						};
					} else {
						// Get a single calc
						this.napierSearchCalc(calc);
			  		};
				};
			};
		} else {
			//napierSearchClear();
		};
	}
	
	this.napierQuickSearch = function(terms){
        var $this = this;
		var endpoint = 'proxy/napier/';
		var $searchResultsContainer = $('[channel="quoteSearch"]').parent().find('.search-results ul');

		$searchResultsContainer.load(endpoint+'search/quickSearch='+terms+' calc', function(){
			// Turn xml into LIs
			var data = $(this).html();
			data = data.replace(/<calc><calcref>/g,'<li calcref="');
			data = data.replace(/<\/calcref>/g,'">');
			data = data.replace(/<source>/g,'<span>');
			data = data.replace(/<\/calc>/g,'<\/span><a class="button">show<\/a><\/li>');
			$(this).html(data);
			// Find some interesting data and display it
			$(this).find('quickSearch').each(function(){
				var qsTerms = $(this).text();
				qsTerms = qsTerms.split(',');
                var include = true;
                if($this.filterIndex!=null){
                    include = qsTerms[$this.filterIndex] == $this.filterString;
                }
                if(!include){
                    $(this).parent().remove();
                }else{
                    $(this).before('<span>'+$.trim(qsTerms[0])+'</span><span>'+$.trim(qsTerms[1])+'</span><span>'+$.trim(qsTerms[2])+'</span><span>'+$.trim(qsTerms[3])+'</span>');
                }
			});
			$(this).find('li[calcref]').each(function(){
				var ref= $(this).attr('calcref');
				$(this).children('a.button').attr('href',$this.showUrl+ref);
			});
		});
	}
	
	this.napierSearchCalc = function(calc){
        var $this = this;
		var endpoint = 'proxy/napier/'
		var $searchResultsContainer = $('[channel="quoteSearch"]').parent().find('.search-results ul');

		$searchResultsContainer.append('<li calcref="'+calc+'"><span class="loading"></span></li>');
		$('li[calcref="'+calc+'"]').load(endpoint+calc, function(){
			// Find some interesting data and display it
			var xml = $.parseXML($(this).find('calcdata').text());
			$(this).append('<span>'+$(xml).find('title').first().text()+' '+$(xml).find('firstName').first().text()+' '+$(xml).find('surname').first().text()+'</span>');
			$(this).append('<span>'+$(xml).find('postcode').first().text()+'</span>');
			$(this).append('<span>'+$(xml).find('vehDesc').first().text()+'</span>');
			$(this).append('<span class="reg">'+$(xml).find('reg').first().text()+'</span>');
			var xml = $.parseXML($(this).find('calcResponse').text());
			$(this).append('<span class="currency">'+$(xml).find('annualPremium').first().text()+'</span>');

			$(this).append('<a class="button" href="' + $this.showUrl + calc + '">show</a>');}
		);
	}
	
	function napierSearchClear(el) {
	}

}