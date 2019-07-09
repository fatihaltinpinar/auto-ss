/* For injection javascript library use */

scriptPath = "https://html2canvas.hertzen.com/dist/html2canvas.js";
var script = document.createElement('script');
script.src = scriptPath;
document.getElementsByTagName('head')[0].appendChild(script);

scriptPath = "https://cdn.rawgit.com/eligrey/FileSaver.js/5ed507ef8aa53d8ecfea96d96bc7214cd2476fd2/FileSaver.min.js";
var script = document.createElement('script');
script.src = scriptPath;
document.getElementsByTagName('head')[0].appendChild(script);

scriptPath = "https://combinatronics.com/Stuk/jszip/master/dist/jszip.js";
var script = document.createElement('script');
script.src = scriptPath;
document.getElementsByTagName('head')[0].appendChild(script);
var zip = new JSZip();
var promises = [];
setTimeout(function(){
	
	function screenshot(element, name){
		const htlmpromise = html2canvas(element)
		promises.push(htlmpromise);
		htlmpromise.then(function(canvas){
			canvas.toBlob(function(blob){
				//saveAs(blob, name+"png");
			      	//zip.file(name+"png").async("blob").then(function(){console.log("Taken a screenshot of " + name);
				//promises.push(zip.file(name+".jpg", "blob"));

				zip.file(name+".jpg", blob);
				promises.push(zip.file(name+".jpg").async("blob"));




				//zip.forEach(function(relativePath, file){console.log("on: ", relativePath)});



				//console.log("Taken a screenshot of " + name);
				//});				
			}, "image/jpeg");
		});
	}



	questions = document.getElementsByClassName('simplequiz_question_result');

	for (var i = 0; i < questions.length; i++){
		var innertext = questions[i].innerText;
		var questionCount = questions[i].firstElementChild.firstElementChild.innerText;	
		console.log("Checking " + questionCount);
		if(innertext.includes("YANLIŞ") || innertext.includes("BOŞ"))
			screenshot(questions[i], "soru_"+i);				
	}

	Promise.all(promises).then(function(){
		console.log(promises);
		zip.generateAsync({type:"blob"}).then(function(content){
			saveAs(content, "yanlisVeBosSorular.zip");
		});
	});

	
},5000);



// it works
















// // // // window.open('', document.getElementById('the_canvas_element_id').toDataURL());


// // // // html2canvas(element).then(function(canvas){
// // // // 	var base64 = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
// // // // });

// // // // html2canvas(elem).then(function(canvas){
// // // // 	canvas.toBlob(function(blob){
// // // // saveAs(blob, "ananartikyeter.png")
// // // // });


// // // // function screenshot(element){
// // // // 	html2canvas(element).then(function(canvas){
// // // // 		var blob = new Blob
// // // // 		var blob = new Blob([canvas], {
// // // // 		type: "image/png"
// // // // 		});
// // // // 	saveAs(blob, "artikcalis.png");
// // // // 	});
// // // // }
