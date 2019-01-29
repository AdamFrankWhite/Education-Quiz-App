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

function createQuestion(questionSetCount) {
	let q_set = punctuation_questions[questionSetCount];
	$('.quiz').append('<h3>' + q_set.question + '</h3>') //create question heading
	for (let i=0; i<q_set.choices.length; i += 1) {
		$('.quiz').append('<p class=' + i +'>' + q_set.choices[i] + '</p>')
	}
	$('.quiz').append('<button class="next-btn">Next Question</button>')
	

}

function getAnswer(q_num){
	return punctuation_questions[q_num].answer
}

// Click functions - use .one() for single click use, to avoid bug

$('#go').one('click', function () {
	$('.quiz').css({"border": "3px black dotted"})
	const $quiz_selection = $('.choice').val();
	if ($quiz_selection === "punc") {
		createQuestion(0);
		checkAnswer();

	}

});

function checkAnswer () {
	$(document).one('click', 'p', function(event) {       // need to access document and use extra parameter in .on method to listen to dynamically created elements
		var answer = (event.target).textContent;
		
		if (answer == getAnswer(questionSetCount)) {
			(event.target).setAttribute('class', 'correct')
			correctAnswers += 1;
			
		} else {
			(event.target).setAttribute('class', 'wrong')
			// $('p').effect('shake')
			$('p:not(.3)').attr('class', 'wrong')
			$('.3').attr('class', 'correct')
		}

		questionSetCount += 1;
		console.log(correctAnswers);
	});
}



$(document).on('click', '.next-btn', function () {
	$('.quiz').empty();
	createQuestion(questionSetCount);
	checkAnswer(); // need to change to part of main function, with an option only allowing it to be clicked, once answer selected, currently it is simply refreshing the box contents, with the same questions
});


// change answer valuable to dynamic variable
// separate questions into functions?

}) //  end ready
