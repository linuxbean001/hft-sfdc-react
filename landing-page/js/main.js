jQuery(document).ready(function($) {
	var recommended = {
	  "desrecommended": [
		{
			"title": "Consultation Calls",
			"description": "A Level 4 Betted RR Trainer will host 12 hi-weekly one-hour video calls reviewing case studies and answering godson about practicing",
			"price" : "$297"
		},
		{
			"title": "ACT 102 - LIVE Training",
			"description": "BM. the confidence you need to use the Instinctual Trauma Response Method. with your population in your clinical setting",
			"price" : "$597"
		},
		{
			"title": "ACT 101 - Online Training",
			"description": "Build the confidence you need to use the Instinctual Trauma Res ponse Method. with your populalion in your clinical setting",
			"price" : "$497"
		},
		{
			"title": "Certified Trauma Therapist Bundle",
			"description": "The e confidence you need to use the Instinctual Trauma Response .9fhP0T' reh Pore Population in your clinical selling",
			"price" : "$1.207"
		},
		{
			"title": "Help for Trauma App - Professiorel Edition",
			"description": "Build the cont dance you need to use the Instinctual Trauma Response Method. wfth your population in your clinical setting",
			"price" : "$30000"
		},
	  ]
	};
	
	// console.log(recommended);
	var length = recommended.desrecommended.length;
	
	var i = 0;
	jQuery.each(recommended.desrecommended, function() {
		var title = recommended.desrecommended[i].title;
		var description = recommended.desrecommended[i].description;
		var price = recommended.desrecommended[i].price;
		
        jQuery("#page_block_below_checkout_content .table").append('<div class="row_table"> <div class="cell_table col-md-8"><h5>' + title + '</h5> <p>' + description + '<span> ... More</span></p></div><div class="cell_table col-md-2">' + price + '</div><div class="cell_table col-md-2">Add to Cart</div></div>');
		i = i + 1;
	});	
	
});


