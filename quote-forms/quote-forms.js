function Widget_quote_forms() {
	var _this = this;

	this.onReadyExtend = function() {
		// also need broker code
		var params = getCalcParams(this);
		var cr;
		if (params !== null){
			cr = params.ref;
		}

		// broker info temporarily hard coded
		var broker = '<brokerCode>10512</brokerCode>';

		var initialData;
		if (typeof cr != 'undefined') {
				initialData = '<quote><calcref>' + cr + '</calcref>' +  broker + '</quote>';
		} else {
			initialData = '<quote>' + broker + '</quote>';
		}
		


		rf.loadFlow('widgets/quote-forms/quote-flow.js', $('.rf-quote-form-container', this.$widgetDiv), initialData);

		var setCrumbTrail = function (){
			var thisCrumb = $('form[rhinoforms]', '.quote-forms').data('crumb');
			if (pw.defined(thisCrumb)){
				$('ul.crumbTrail li.on', '.quote-forms').removeClass('on');
				$('ul.crumbTrail li.crumb' + thisCrumb, '.quote-forms').addClass('on');
			}
		}
		rf.onEveryFormLoad(setCrumbTrail);
	}

	function getCalcParams(w){
		var params = w.$widgetDiv.data('params');
		if (typeof params != 'undefined') {
			var paramsObj = {};
			params.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
					paramsObj[key] = value;
			});
			if (typeof paramsObj.ref != 'undefined' && paramsObj.ref != null && paramsObj.ref.indexOf("{") == -1) {
				return paramsObj;
			}
		}
		return null;
	}

	
}