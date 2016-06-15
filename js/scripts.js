/*-------------------------------------
| Document Ready
-------------------------------------*/
$(document).ready(function(){
/*-------------------------------------
| Gallery Image Hovers
-------------------------------------*/
function manage_galleries() {
	$('#gallery img')
		.animate({'opacity':'.5'}, 1000)
		.hover(
		function(){
			$(this).stop().animate({'opacity':'1'}, 500);
		},
		function() {
			$(this).stop().animate({'opacity':'.5'}, 500);
		}
	);
}
manage_galleries();

/*-------------------------------------
| AJAX Kill Links
-------------------------------------*/
function kill_link(event) {
	event.preventDefault();
}

$('.folio a').click(kill_link);
function chosen_manage() {
				$('.folio a').removeClass('selected');
				$(this).addClass('selected');
			}
			$('.folio a').click(chosen_manage);

/*-------------------------------------
| AJAX Load Web
-------------------------------------*/
function initializeSlideshow() {
	manage_galleries();
	$('#gallery .slides img:gt(0)').css({'left':'600px'});
	/*-------------------------------------
	| Left
	-------------------------------------*/
	function slide_left() {
		stop_behaviors();
		$('#gallery .slides img:eq(0)').animate({'left':'-600px'}, 1000, leftDone);
		$('#gallery .slides img:eq(1)').animate({'left':'0px'}, 1000);
	}
	function leftDone() {
		$('#gallery .slides img:eq(0)')
			.css({'left':'600px'})
			.appendTo('#gallery .slides');
		assign_behaviors();
	}
	/*-------------------------------------
	| Right
	-------------------------------------*/
	function slide_right() {
		stop_behaviors();
		$('#gallery .slides img:eq(0)').animate({'left':'600px'}, 1000);
		$('#gallery .slides img:last').css({'left':'-600px'}).animate({'left':'0px'}, 1000, rightDone);
	}
	function rightDone() {
		$('#gallery .slides img:last')
			.prependTo('#gallery .slides');
		assign_behaviors();
	}
	function assign_behaviors() {
		$('#gallery .arrows div.left').click(slide_left);
		$('#gallery .arrows div.right').click(slide_right);
	}
	function stop_behaviors() {
		$('#gallery .arrows div.left').unbind('click');
		$('#gallery .arrows div.right').unbind('click');
	}

	assign_behaviors();
}

function load_sketches() {
	$('.target').load('slideShow.html #gallery', initializeSlideshow);

}

$('.folio a:eq(0)').click(load_sketches);

load_sketches();

/*-------------------------------------
| AJAX Load Sketches
-------------------------------------*/
function lightBox() {
	manage_galleries();
	function light_on() {
		// grab details
		var theSrc = $(this).attr('src');
		var theText = $(this).attr('data-text');
		// populate lbox
		$('#lbox .light img').attr('src', theSrc);
		$('#lbox .light .text').html(theText);
		// show lbox
		$('#lbox .light')
			.css({'top':'-600px', 'opacity':'0'})
			.show()
			.animate({'top':'0px', 'opacity':'1'}, 500);
		$('#lbox').show();
	}
	function light_off() {
		$('#lbox').hide();
	}
	$('#gallery img').click(light_on);
	$('#lbox .light .close').click(light_off);
	$('#lbox').click(light_off);
}

function load_web() {
	$('.target').load('lightBox.html #lightGallery', lightBox);
}

$('.folio a:eq(1)').click(load_web);

function funcSwap() {
	function swap_over() {
		console.log(this);

		// variables - container for a value
		// grab new image path
		var newPath = $(this).attr('data-timbuktu');

		// update large image src
		$('.large').attr('src', newPath);
	}

	$('.thumb img').mouseover(swap_over);
}
function loadSwap() {
	$('.target').load('swap.html #swap', funcSwap);
}

$('.folio a:eq(2)').click(loadSwap);
/*-------------------------------------
| Nav pinned
-------------------------------------*/
$('body').removeClass('nav-pinned');

function pinned_scroll() {
	var howFar = $(window).scrollTop();

	console.log(howFar);

	if (howFar >= 240)
	{
		$('body').addClass('nav-pinned');
	}
	else
	{
		$('body').removeClass('nav-pinned');
	}

}
$(window).scroll(pinned_scroll);


/*-------------------------------------
| Animate Scroll
-------------------------------------*/
function mainNav_click(event) {

	event.preventDefault();

	var theSect = $(this).attr('href');

	var howFarFromTop = $(theSect).offset().top;

	$('html, body').animate({'scrollTop':(howFarFromTop - 90)}, 1000);

}

$('#mainmenu a').click(mainNav_click);
function killLinks(event) {
	event.preventDefault();
}
$('#tabbed .tabs a').click(killLinks);

/*-------------------------------------
| Hide all but the first section
-------------------------------------*/
// $('#tabbed section').hide();
// $('#tabbed section:eq(2)').hide();
$('#tabbed section:gt(0)').hide();

// -------------------------------------
// | Chosen One manager



function chosenManage() {
	// e.preventDefault();
	$('#tabbed .tabs a').removeClass('theChosenOne');
	$(this).addClass('theChosenOne');
}
$('#tabbed .tabs a').click(chosenManage);

// -------------------------------------
// | Show and Hide Sections
// -------------------------------------
function showHide() {
	var getSectionID = $(this).attr('href');
	$('#tabbed section').hide();
	$(getSectionID).show();

}
$('#tabbed .tabs a').click(showHide);

}); //here is where doc ready ends====
