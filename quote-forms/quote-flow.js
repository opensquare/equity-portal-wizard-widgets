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
						url: "{{$napier-url}}/calcs/{{//calcref}}",
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
										quickSearch1: "xpath://brokerCode",
										quickSearch2: "xpath://customer/address/postcode",
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
			{ id: "quote", url: "3-quote.html", actions: [ "back:vehicle", "finish", "sorry:sorry" ] },
			{ id: "sorry", url: "sorry.html" , actions: [ "restart:customer" ]}
		]
	}
}