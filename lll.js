/* 	
	A lazy load script with no jQuery dependencies
	Script by Carlos Moran
	License MIT

	The idea is the same as other image lazy loads:
	make the request to server after the page load completes.
	On image heavy sites, this will help you get the DOM
	all nice and loaded without waiting for all the images.

	It requires a data-lsrc attribute on images with the
	uri for the image.  The src will be initally set to a blank.gif
	until the users scrolls to the image when it will be fetched.

	The offset is set to load the image x pixels before the user
	scrolls to the top of the image. 
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
