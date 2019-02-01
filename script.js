$(document).ready(function () {

// ==== Questions ==== // put in separate script file
var correctAnswers = 0; // create correct guess counter#
var questionNumber = 0;
var punctuation_questions = [ //array of objects as easier to maintain

	{
		question: "What is the purpose of a comma?",
		choices: ["to separate clauses", "to indicate a pause", "to separate items in a list", "All of the above"],
		answer: "All of the above"
	},
	{
		question: "Select the subordinate clause",
		choices: ["Although it was raining,", "I am very happy", "a blue car", "up and down"],
		answer: "Although it was raining,"
	},

	{
		question: "Select the correctly punctuated sentence",
		choices: ["I want to get a skateboard a puppy and some ice cream.", "Why bother learning punctuation.", "Should I eat this strange-looking thing I found on the floor?", "Alice is a nice person although she smells like elderberries."],
		answer: "Should I eat this strange-looking thing I found on the floor?"
	},

	{
		question: "What is an ellipsis?",
		choices: ["&", "*", "...", "^"],
		answer: "..."
	},

	{
		question: "What can we use a colon (:) for?",
		choices: ["To introduce a list", "To introduce an explanation", "To introduce a quote", "All of the above"],
		answer: "All of the above"
	}
]

const grammar_questions = [ //array of objects as easier to maintain

	{
		question: "Select the adverb",
		choices: ["quickly", "running", "hitchiker", "be"],
		answer: "quickly"
	},
	{
		question: "Select the subordinate clause",
		choices: ["Although it was raining,", "I am very happy", "a blue car", "up and down"],
		answer: "Although it was raining,"
	},

	{
		question: "Select the correctly punctuated sentence",
		choices: ["I want to get a skateboard a puppy and some ice cream.", "Why bother learning punctuation.", "Should I eat this strange-looking thing I found on the floor?", "Alice is a nice person although she smells like elderberries."],
		answer: "Should I eat this strange-looking thing I found on the floor?"
	},

	{
		question: "What is an ellipsis?",
		choices: ["&", "*", "...", "^"],
		answer: "..."
	},

	{
		question: "What can we use a colon (:) for?",
		choices: ["To introduce a list", "To introduce an explanation", "To introduce a quote", "All of the above"],
		answer: "All of the above"
	}
]

const comprehension_questions = [ //array of objects as easier to maintain

	{
		question: "What is the flight speed of the swallow?",
		choices: ["10mph", "100mph", "1000mph", "Is that an African or European swallow?"],
		answer: "Is that an African or European swallow?"
	},
	{
		question: "Select the subordinate clause",
		choices: ["Although it was raining,", "I am very happy", "a blue car", "up and down"],
		answer: "Although it was raining,"
	},

	{
		question: "Select the correctly punctuated sentence",
		choices: ["I want to get a skateboard a puppy and some ice cream.", "Why bother learning punctuation.", "Should I eat this strange-looking thing I found on the floor?", "Alice is a nice person although she smells like elderberries."],
		answer: "Should I eat this strange-looking thing I found on the floor?"
	},

	{
		question: "What is an ellipsis?",
		choices: ["&", "*", "...", "^"],
		answer: "..."
	},

	{
		question: "What can we use a colon (:) for?",
		choices: ["To introduce a list", "To introduce an explanation", "To introduce a quote", "All of the above"],
		answer: "All of the above"
	}
]


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
	$('.quiz').append('<h4>' + (questionNumber+1) + ' / 5</h4>')
	$('.quiz').append('<div class="choices"></div>') // creating div vital, to make sure only one click allowed for each question attempt
	for (let i=0; i<q_set.choices.length; i += 1) {
		$('.quiz .choices').append('<p class=' + i +'>' + q_set.choices[i] + '</p>')
	}
}

function getAnswer(q_num){
	return questionSet()[q_num].answer
}

function checkAnswer () {
	$('.choices').one('click', 'p', function(event) { // targets choices div which includes all answers, selecting p in each one
		var answer_choices = $('.quiz p');
		var answer = (event.target).textContent;
		// if the correct answer chosen, highlighted green and wrong answers highlighted red
		if (answer == getAnswer(questionNumber)) {
			(event.target).setAttribute('class', 'correct')
			$(event.target).append('<img class="mark" src="images/correct.jpg">')
			correctAnswers += 1;
			// if incorrect answer, all wrong answers selected red, correct answer shown in green
		} else {
			$('.quiz p').effect('shake', { direction: "right", times: 3, distance: 10}, 300);
			(event.target).setAttribute('class', 'wrong')
			for (i=0; i<answer_choices.length; i+=1) {
				if (answer_choices[i].textContent == getAnswer(questionNumber)) {
					answer_choices[i].setAttribute('class', 'correct')
					$(answer_choices[i]).append('<img class="mark" src="images/correct.jpg">')
			} else {
					answer_choices[i].setAttribute('class', 'wrong')
					$(answer_choices[i]).append('<img class="mark" src="images/incorrect.jpg">')
			}




		}
}
		questionNumber += 1;
		if (questionNumber < questionSet().length) {
			$('.quiz').append('<button class="next-btn">NEXT QUESTION</button>') // better design for button to appear after you select answer, not automatically

		} else {
			$('.quiz').append('<button class="next-btn">Score</button>') // shows results button on final answer select
		}
	});
}



// Click functions - use .one() for single click use, to avoid bug
$('#go').on('click', function () {
		$('.quiz').css({"border": "3px black dotted"})
		$('.quiz').empty();

		questionNumber = 0; //reset question count
		correctAnswers = 0; // reset score
		createQuestion(questionNumber);
		checkAnswer();
	});




$(document).on('click', '.next-btn', function () {

	if (questionNumber != punctuation_questions.length) {
		$('.quiz').empty();
		createQuestion(questionNumber);

		checkAnswer(); // need to change to part of main function, with an option only allowing it to be clicked, once answer selected, currently it is simply refreshing the box contents, with the same questions
	} else {
		$('.quiz').empty();
		$('.quiz').append('<h2>Well Done!!!</h2')
		$('.quiz').append('<img class="trophy" src="images/trophy.jpg" width="200px">') // add conditional to include different ranks
		$('.quiz').append('<h2>You achieved a score of ' + correctAnswers + '</h2')
	}

});
// TO DO: sort out final score screen DONE
//media queries, mobile first DONE


// change answer valuable to dynamic variable DONE
// DONE - fix bug when selecting same quiz twice in a row - bug hunting, clicking through all the way to score, and there is no problem. clicking different quizes before finishing, no problem. selecting same quiz twice BEFORE clicking answer , PROBLEM, thus, the problem is with the click function - bug FIXED - instead of p selector, for some reason you were using document, which triggered the checkanswer function everytime you clicked on the document

}) //  end ready
