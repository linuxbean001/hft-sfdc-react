import jQuery from 'jquery';
jQuery(document).ready(function($) {
	
	/*var slider = document.getElementById("myRange");
	var output = document.getElementById("question_of_time");
	output.innerHTML = slider.value;

	slider.oninput = function() {
	  output.innerHTML = this.value;
	}*/

	var question = {
	  "desQuestions": [
		{
		  "question": "I make it through the day without distressing recollections of past events."
		},
		{
		  "question": "I sleep free from nightmares."
		},
		{
		  "question": "I am able to stay in control when I think of difficult memories."
		},
		{
		  "question": "I do the things that I used to avoid (e.g., daily activities, social activities, thoughts of events and people cowiected with past events)."
		},
		{
		  "question": "I am safe."
		},
		{
		  "question": "I feel safe."
		},
		{
		  "question": "I have supportive relationships in my life."
		},
		{
		  "question": "I find that I can now safely feel a full range of emotions."
		},
		{
		  "question": "I can allow things to happen in my surroundings without needing to control them."
		},
		{
		  "question": "I am able to concentrate on thoughts of my choice."
		},
		{
		  "question": "I have a sense of hope about the future."
		},
	  ]
	};
	

	var length = question.desQuestions.length;
	var percent_one = 100/length;
	
	
	jQuery('.question p').html(question.desQuestions[0].question);
	jQuery('.length').html(length);
	
	jQuery(".next-question").click(function(){
		var rel = $('input[name="rel"]').val();
		if(rel < length){
			jQuery('.question p').html(question.desQuestions[rel].question);
			
			rel = parseFloat(rel) + 1;
			jQuery('.progress-current').html(rel);
			jQuery('.progress-bar').removeClass('active');
			jQuery('.progress-bar:nth-child(1)').addClass('active');
			
			$('input[name="rel"]').val(rel);
			$('.question-bar button').removeClass('active');
			$(this).addClass('active');
			
			$('input[id="myRange"]').val('0');
			$('#question_of_time').html('0');
    
			$('input[id="myRange"]').css('background-image',
				'-webkit-gradient(linear, left top, right top, '
				+ 'color-stop(0, #4f00b0), '
				+ 'color-stop(0, #d3d3d3)'
				+ ')'
			);
		}
		else{
			alert('Please, this is maximum!');
		}
	});
	jQuery(".previous-question").click(function(){
		var rel = $('input[name="rel"]').val();
		if(rel > 1){
			
			rel = parseFloat(rel) - 1;
			jQuery('.question p').html(question.desQuestions[parseFloat(rel) - 1].question);
			
			jQuery('.progress-current').html(rel);
			jQuery('.progress-bar').removeClass('active');
			jQuery('.progress-bar:nth-child(1)').addClass('active');
			$('input[name="rel"]').val(rel);
			$('.question-bar button').removeClass('active');
			$(this).addClass('active');
			
			$('input[id="myRange"]').val('0');
			$('#question_of_time').html('0');
    
			$('input[id="myRange"]').css('background-image',
				'-webkit-gradient(linear, left top, right top, '
				+ 'color-stop(0, #4f00b0), '
				+ 'color-stop(0, #d3d3d3)'
				+ ')'
			);
		}
		else{
			alert('Please, this is minimum!');
		}
	});
	
	$('input[type="range"]').change(function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    // console.log(val);
    $(this).css('background-image',
		'-webkit-gradient(linear, left top, right top, '
		+ 'color-stop(' + val + ', #4f00b0), '
		+ 'color-stop(' + val + ', #d3d3d3)'
		+ ')'
		);
	});
});


