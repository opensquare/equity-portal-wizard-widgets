{
	docBase: "/quote",
	libraries: ["../common-forms/js/utils.js"],
	formLists: {
		main: [
			{
				id: "initialisation",
				url: "initialisation.html",
				actions: [ "next", {
					name: "calc",
					target: "calculating",
					submission: {
						url: "{{$calc-url}}?calcRef={{//calcref}}",
						method: "get",
						postTransform: "xslt/retrieveCalc.xsl",
						resultInsertPoint: "/"
					}
				}]
			},
			{
				id: "customer",
				docBase: "/quote/customer",
				url: "1-customer.html",
				actions: [ "next" ]
			},
			{
				id: "vehicle",
				url: "2-vehicle.html",
				docBase : "/quote/cover",
				actions: [ "next", "back" ]
			},
			{
				id: "calculating",
				url: "../common-forms/calculating.html",
				actions : [
					{
						name: "next",
						submission: {
								preTransform: "xslt/toNapier.xsl",
								url: "{{$napier-url}}/calcs",
								data: {
                                        source: "xpath://brokerCode",
										quickSearch1: "xpath://brokerCode",
										quickSearch2: "xpath://customer/address/postcode",
                                        quickSearch3: "xpath://customer/contact/surname",
										calcType: "{{$product-calc}}",
										calcData: "[dataDocument]"
								},
								method: "post",
								postTransform: "xslt/fromNapier.xsl",
								resultInsertPoint: "/quote/calc"
						}
					}
				]
			},
			{ id: "quote", url: "3-quote.html", actions: [ "back:vehicle", "finish", "sorry:sorry", "single:buying" ] },
            {
				id: "buying",
				url: "buying.html",
				actions : [
					{
						name: "next",
						submission: {
								preTransform: "xslt/toMM.xsl",
								url: "{{$mm-url}}/submitjob",
								data: {
                                        username: "adam",
										description: "Equity Haulage Application",
                                        searchTerms: "xpath://brokerCode",
                                        jobType: "MERGE",
										payload: "[dataDocument]"
								},
								method: "post",
                                resultInsertPoint: "/quote/docSubmission"
						}
					}
				]
			},
            { id: "complete", url: "complete.html" , actions: [ "next" ]},
			{ id: "sorry", url: "sorry.html" , actions: [ "restart:customer" ]}
		]
	}
}