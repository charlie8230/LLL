/* 	
	A lazy load script with no jQuery dependencies
	Script by Carlos Moran
	License MIT
*/

var ll = function(document, window, soffset, imgs){
	
	var imgs, 					// DOM Elements
	i, 							// counter for DOM
	j; 							// counter for img data array 
	var imgsData = [];  		// Array of img pointers and state
	var innerHeight = window.innerHeight;

	//imgs = document.querySelectorAll("img[data-lsrc]");
	console.log("Running script")
	if(imgs) {
		for(i=0; i < imgs.length; i++) {

			var pos = imgs[i].getBoundingClientRect();

			/* if image is visible already then exclude from images to load later */
			/* if its not loaded then save its position in the imgs array, its vertical position, its load status and src attribute*/
			pos.top < innerHeight ? imgs[i].src = imgs[i].getAttribute("data-lsrc") : imgsData.push({i: i, y:pos.top, loaded: false, dsrc: imgs[i].getAttribute("data-lsrc")});

		}
	}
	
	function checkElements(elems) {

		
		var offset = soffset || 0;

		/*elems refers to imgsData */
		for(j=0; j<elems.length; j++) {
			
			if(!elems[j].loaded && (elems[j].y < innerHeight+document.body.scrollTop+offset)) {
				imgs[elems[j].i].src = elems[j].dsrc;
				elems[j].loaded = true;
				console.log('Img '+ elems[j].i + ' loaded.');
			} 
		}

	}

	document.onscroll = function(){

			checkElements(imgsData);

	};

	checkElements(imgsData); 


	return {count: imgsData.length};


};
