function changeLanguage(element){

	var language = $(element).attr('class')
	var nextLanguage = (language == 'finnish') ? 'english' : 'finnish';

	$.getJSON('widgets/common-language-switcher/finnish.json', function(data) {
			$.each(data, function(key, val) {
				if(language == 'finnish'){replaceString(document.body, key, val);}
				else {replaceString(document.body, val, key);}	
			});
		});
  
    document.getElementById('currentLocale').innerHTML = '▼ ' + $(element).attr('local')
}

function replaceString(node, replaceThis, replaceWith) {
	//Target text nodes
    if (node.nodeType === 3) {
        node.nodeValue  = node.nodeValue.replace (replaceThis, replaceWith);
    }
    //Target input nodes
    else if(node.nodeName == 'INPUT'){
    	//Text held in 'value' attribute
    	if(node.type == 'button' | node.type =='submit'){
    		node.value = node.value.replace (replaceThis, replaceWith);
   		 } 
   		 //Text held in 'placeholder' attribute
   		 else if (node.placeholder != "") {
   		 	node.placeholder = node.placeholder.replace (replaceThis, replaceWith);
   		 }
    }	
  	    	
    else if (node.nodeType === 1) {
    	var numNodes = node.childNodes.length;
        for (var n = 0;  n < numNodes;  n++) {
            replaceString(node.childNodes[n], replaceThis, replaceWith);
        }
    }
}
