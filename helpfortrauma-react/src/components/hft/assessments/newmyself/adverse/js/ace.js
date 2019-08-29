import jQuery from 'jquery';
jQuery(document).ready(function($) {
	
	

	var question = {
	  "desQuestions": [
		{
		  "question": "Did a parent or other adult in the household often … Swear at you, insult you, put you down, or humiliate you? or Act in a way that made you afraid that you might be physically hurt? "
		},
		{
		  "question": "Did a parent or other adult in the household often … Push, grab, slap, or throw something at you? or Ever hit you so hard that you had marks or were injured?"
		},
		{
		  "question": "Did an adult or person at least 5 years older than you ever … Touch or fondle you or have you touch their body in a sexual way? or Try to or actually have oral, anal, or vaginal sex with you? "
		},
		{
		  "question": "Did you often feel that … No one in your family loved you or thought you were important or special? or Your family didn’t look out for each other, feel close to each other, or support each other? "
		},
		{
		  "question": " Did you often feel that … You didn’t have enough to eat, had to wear dirty clothes, and had no one to protect you? or Your parents were too drunk or high to take care of you or take you to the doctor if you needed it?"
		},
		{
		  "question": "Were your parents ever separated or divorced?"
		},
		{
		  "question": "Was your mother or stepmother: Often pushed, grabbed, slapped, or had something thrown at her? or Sometimes or often kicked, bitten, hit with a fist, or hit with something hard? or Ever repeatedly hit over at least a few minutes or threatened with a gun or knife? "
		},
		{
		  "question": "Did you live with anyone who was a problem drinker or alcoholic or who used street drugs? "
		},
		{
		  "question": "Was a household member depressed or mentally ill or did a household member attempt suicide?"
		},
		{
		  "question": "Did a household member go to prison?"
		}
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


