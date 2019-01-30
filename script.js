$(document).ready(function () {

// ==== Questions ==== // put in separate script file
var correctAnswers = 0; // create correct guess counter#
var questionSetCount = 0;
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
function createQuestion(questionSetCount) {
	let q_set = punctuation_questions[questionSetCount];
	$('.quiz').append('<h3>' + q_set.question + '</h3>') //create question heading
	$('.quiz').append('<h4>' + (questionSetCount+1) + ' / 5</h4>')
	for (let i=0; i<q_set.choices.length; i += 1) {
		$('.quiz').append('<p class=' + i +'>' + q_set.choices[i] + '</p>')
	}




}

function getAnswer(q_num){
	return punctuation_questions[q_num].answer
}

// Click functions - use .one() for single click use, to avoid bug

$('#go').one('click', function () {
	$('.quiz').css({"border": "3px black dotted"})
	const $quiz_selection = $('.choice').val();
	if ($quiz_selection === "punctuation_questions") {
		createQuestion(0);
		checkAnswer();

	}

});

function checkAnswer () {
	var answer_choices = $('.quiz p');
	console.log(answer_choices[0])
	$(document).one('click', 'p', function(event) {       // need to access document and use extra parameter in .on method to listen to dynamically created elements
		var answer = (event.target).textContent;
		// if the correct answer chosen, highlighted green and wrong answers highlighted red
		if (answer == getAnswer(questionSetCount)) {
			(event.target).setAttribute('class', 'correct')
			$(event.target).append('<img src="images/correct.jpg" width="25px">')
			correctAnswers += 1;
			// if incorrect answer, all wrong answers selected red, correct answer shown in green
		} else {
			$('.quiz p').effect('shake', { direction: "right", times: 3, distance: 10}, 300);
			(event.target).setAttribute('class', 'wrong')
			for (i=0; i<answer_choices.length; i+=1) {
				if (answer_choices[i].textContent == getAnswer(questionSetCount)) {
					answer_choices[i].setAttribute('class', 'correct')
					$(answer_choices[i]).append('<img src="images/correct.jpg" width="25px">')
			} else {
					answer_choices[i].setAttribute('class', 'wrong')
					$(answer_choices[i]).append('<img src="images/incorrect.jpg" width="25px">')
			}




		}
}
		questionSetCount += 1;
		if (questionSetCount < punctuation_questions.length) {
			$('.quiz').append('<button class="next-btn">NEXT QUESTION</button>') // better design for button to appear after you select answer, not automatically

		} else {
			$('.quiz').append('<button class="next-btn">Score</button>') // shows results button on final answer select
		}
		// console.log(correctAnswers);
		console.log(questionSetCount);
	});
}



$(document).on('click', '.next-btn', function () {

	if (questionSetCount != punctuation_questions.length) {
		$('.quiz').empty();
		createQuestion(questionSetCount);

		checkAnswer(); // need to change to part of main function, with an option only allowing it to be clicked, once answer selected, currently it is simply refreshing the box contents, with the same questions
	} else {
		$('.quiz').empty();
		$('.quiz').append('<h2>You achieved a score of ' + correctAnswers + '</h2')
		$('.quiz').append('<img src="images/trophy.jpg" width="200px">') // add conditional to include different ranks
	}

});
// sort out final score screen



// change answer valuable to dynamic variable
// separate questions into functions?

}) //  end ready
