rf.onEveryFormLoad(function(){
	var filter = $('.quote-forms');
	$("div.field", filter).first().addClass("on");

	$('form input, form select', filter).focus(function() {
		$("div.field").removeClass("on");
		$(this).closest("div.field").addClass("on")
	});

	$('form input[type="radio"], form input[type="checkbox"]', filter).change(function() {
		$("div.field").removeClass("on");
		$(this).closest("div.field").addClass("on")
	});

	$("input[type='radio'], input[type='text'], input[type='checkbox'], input[type='email'], input[type='password'], select", filter).change( function() {
		$(this).siblings('.invalid-message', filter).remove();
	});

	/* Default HTML date tag */
	$('#input_date').attr("value", moment().format("YYYY-MM-DD"));
	$('form select', filter).change( function(){
			$(this).addClass('changed');
	})
});

