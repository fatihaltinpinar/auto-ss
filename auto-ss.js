// html2canvas library: https://html2canvas.hertzen.com/
scriptPath = "https://html2canvas.hertzen.com/dist/html2canvas.js";
var script = document.createElement('script');
script.src = scriptPath;
document.getElementsByTagName('head')[0].appendChild(script);

// FileSavr library: https://github.com/eligrey/FileSaver.js/
scriptPath = "https://cdn.rawgit.com/eligrey/FileSaver.js/5ed507ef8aa53d8ecfea96d96bc7214cd2476fd2/FileSaver.min.js";
var script = document.createElement('script');
script.src = scriptPath;
document.getElementsByTagName('head')[0].appendChild(script);

setTimeout(function(){
	function screenshot(element, name){
		html2canvas(element).then(function(canvas){
			canvas.toBlob(function(blob){
				saveAs(blob, name+"png");
				console.log("Taken a screenshot of " + name);
			});
		});
	}

	questions = document.getElementsByClassName('simplequiz_question_result');

	for (var i = 0; i < questions.length; i++){
		var innertext = questions[i].innerText;
		var questionCount = questions[i].firstElementChild.firstElementChild.innerText;	
		console.log("Checking " + questionCount);
		if(innertext.includes("YANLIŞ") || innertext.includes("BOŞ"))
			screenshot(questions[i], questionCount);				
	}
},1000); // Sleeping in order to give time to loading libraries.
