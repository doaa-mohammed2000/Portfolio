;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});

	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};






	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
			

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		stickyFunction();
		owlCrouselFeatureSlide();
	});

	
}());

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.nav-link');
    const projects = document.querySelectorAll('.animate-box');

    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to the clicked button
            this.classList.add('active');
            
            // Get the filter category
            const filter = this.getAttribute('data-filter');
            
            // Show/Hide projects based on filter
            projects.forEach(project => {
                const projectCategory = project.getAttribute('data-category');
                
                if (filter === 'all' || projectCategory === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});






function playVideo(element) {
    var project = element.closest('.project');
    var videoContainer = project.querySelector('.video-container');
    var video = videoContainer.querySelector('.card-video');

    if (project.classList.contains('playing')) {
        video.pause();
        project.classList.remove('playing');
    } else {
        video.play();
        project.classList.add('playing');
    }

    video.onended = function() {
        project.classList.remove('playing');
    };
}

function closeVideo(element) {
    var project = element.closest('.project');
    var videoContainer = project.querySelector('.video-container');
    var video = videoContainer.querySelector('.card-video');

    video.pause();
    project.classList.remove('playing');
}


function showOverlay(element) {
    var overlay = document.getElementById('image-overlay');
    var img = element.style.backgroundImage.slice(5, -2); 
    document.getElementById('enlarged-image').src = img;
    overlay.style.display = "flex";
}

function closeOverlay() {
    document.getElementById('image-overlay').style.display = "none";
}



