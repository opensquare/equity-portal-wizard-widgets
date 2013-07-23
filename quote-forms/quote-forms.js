function Widget_quote_forms() {
	var _this = this;

	this.onReadyExtend = function() {
		// also need broker code
		var params = getCalcParams(this);
		var cr;
        var br;
		if (params !== null){
            if (typeof params.ref != 'undefined' && params.ref != null && params.ref != "null" && params.ref.indexOf("{") == -1) {
                cr = params.ref;
            }
            br = params.brokerNumber;
		}

		var broker = '<brokerCode>' + br + '</brokerCode>';

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
			return paramsObj;
		}
		return null;
	}

	
}

var docWaitTime = 0;

function createDocLink(){
    var flowId = $("input[name='rf.flowId']").val();
    var url = $("#mm_job_proxy").attr('rf.source') + '?rf.flowId=' + flowId;
    $.getJSON(url, function(data) {
        var resolved = data["resolved"];
        if(pw.defined(resolved)){
            var status = data["status"];
            if(status == "FINISHED_SUCCESSFULLY"){
                var docUrl = $("#mm_doc_proxy").val();
                $("#docLink").html("<a target='new' href=\'" + docUrl + "\'>Click here to download your Application Form.</a>");
            }else{
                docFailed();
            }
        }else{
            docWaitTime = docWaitTime + 3000;
            if(docWaitTime >= 120000){
                docFailed();
            }else{
                setTimeout(createDocLink, 3000);
            }
        }
    });
}

function docFailed(){
    $("#docLink").html("<h5 class='errorMessage'>An error has occurred generating the application form. Please contact the service center on 0800 123 123</h5>");
}