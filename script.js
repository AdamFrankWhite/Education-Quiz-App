$(document).ready(function () {

// ==== Questions ==== // put in separate script file
var correctAnswers = 0; // create correct guess counter
var questionNumber = 0;

// ===== Functions ===== //

function questionSet () {
	const $quiz_selection = $('.choice').val();
	if ($quiz_selection == "punctuation_questions") {
		return punctuation_questions
	} else if ($quiz_selection == "grammar_questions") {
		return grammar_questions
	} else if ($quiz_selection == "comprehension_questions") {
		return comprehension_questions
	}
}

function createQuestion(questionNumber) {
	let q_set = questionSet()[questionNumber];
	$('.quiz').append('<h3>' + q_set.question + '</h3>') //create question heading
	$('.quiz').append(`<h4>${questionNumber+1} / ${questionSet().length}</h4>`) // dynamic scorer
	$('.quiz').append('<div class="choices"></div>') // creating div vital, to make sure only one click allowed for each question attempt
	for (let i=0; i<q_set.choices.length; i += 1) {
		$('.quiz .choices').append('<p>' + q_set.choices[i] + '</p>')
	}
}

function checkAnswer(questionNumber){
	return questionSet()[questionNumber].answer
}

function guessAttempt () {
	$('.choices').one('click', 'p', function(event) { // targets choices div which includes all answers, selecting p in each one
		var answerChoices = $('.quiz p');
		var answer = (event.target).textContent;
		// if the correct answer chosen, highlighted green and wrong answers highlighted red
		if (answer == checkAnswer(questionNumber)) {
			(event.target).setAttribute('class', 'correct')
			$(event.target).append('<img class="mark" src="images/correct.jpg">')
			correctAnswers += 1;
			// if incorrect answer, all wrong answers selected red, correct answer shown in green
		} else {
			$('.quiz p').effect('shake', { direction: "right", times: 3, distance: 10}, 300);
			(event.target).setAttribute('class', 'wrong')
			for (let i=0; i<answerChoices.length; i+=1) {
				if (answerChoices[i].textContent == checkAnswer(questionNumber)) {
					$(answerChoices[i]).attr('class', 'correct')
					$(answerChoices[i]).append('<img class="mark" src="images/correct.jpg">')
			} else {
					$(answerChoices[i]).attr('class', 'wrong')
					$(answerChoices[i]).append('<img class="mark" src="images/incorrect.jpg">')
			}
		}
}
		
		
		// == Append Button ==
		if (questionNumber < questionSet().length) {
			$('.quiz').append('<button class="next-btn">NEXT QUESTION</button>') // better design for button to appear after you select answer, not automatically

		} else {
			$('.quiz').append('<button class="next-btn">Score</button>') // shows results button after final question
		}
		
		//Increment question count
		questionNumber += 1;
		
	});
}

// ==== Event Listeners ====
 
$('#go').on('click', function () {
		$('.quiz').css({"border": "1px black solid", "background-color": "white", "border-radius": "15px", "box-shadow": "7px 7px 5px"}) // must set border in JavaScript, else empty border div before script loads
		$('.quiz').empty();

		questionNumber = 0; //reset question count
		correctAnswers = 0; // reset score
		createQuestion(questionNumber);
		guessAttempt();
	});


$('.quiz').on('click', '.next-btn', function () {  // You have to bind .on() to a container of your dynamically added element that is already on the page when you load it, which is why $('.next-btn').on('click', function () {}) doesn't work 
  let scorePercentage = Math.floor(correctAnswers/questionSet().length * 100);
  console.log(scorePercentage)
	if (questionNumber != questionSet().length) {
	
		$('.quiz').empty()
		createQuestion(questionNumber);
	
		guessAttempt(); 
	} else {
      $('.quiz').empty();
      if (scorePercentage >80) {
        $('.quiz').append('<h2>Well Done!!!</h2>')
        $('.quiz').append('<img class="trophy" src="images/gold.jpg" width="200px">')
      } else if (scorePercentage >= 50) {
        $('.quiz').append('<h2>Not bad!</h2>')
        $('.quiz').append('<img class="trophy" src="images/silver.jpg" width="200px">')
      } else {
        $('.quiz').append('<h2>Nice try!!!</h2>')
        $('.quiz').append('<img class="trophy" src="images/bronze.jpg" width="200px">')
      }
      $('.quiz').append(`<h2>Score: ${correctAnswers} / ${questionSet().length}</h2`) 
    }		
	}
); // end of .quiz event listener
  



}); //  end ready


// DONE - fix bug when selecting same quiz twice in a row - bug hunting, clicking through all the way to score, and there is no problem. clicking different quizes before finishing, no problem. selecting same quiz twice BEFORE clicking answer , PROBLEM, thus, the problem is with the click function - bug FIXED - instead of p selector, for some reason you were using document, which triggered the guessAttempt function everytime you clicked on the document


