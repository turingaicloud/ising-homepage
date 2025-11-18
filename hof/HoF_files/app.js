/* ui.js */
// console.log('Hello, ui.js');
$(function () {

    /* align menu with image in homepage */
    var alignHomeMenu = function() {
        var imageHeight = $('#home-page .carousel').height();
        var titleHeight = $('#home-page .page-title').outerHeight(true);
        var menuTotal = $('#home-page .quick-links li').length;
        var menuHeight = (imageHeight - titleHeight) / menuTotal;
        $('#home-page .quick-links li').css('line-height', menuHeight+'px');
    }
    alignHomeMenu();

    /* compress harder when window scroll up */
    /* Remove function because HKUST header is not supported */
    /*
    var lastScrollTop = 0;
    var scroll = 0;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > 60 && st > lastScrollTop) {
            scroll--;
            if (scroll < -5) {
                scroll = 0;
                $('#header').removeClass('scroll-up').addClass('scroll-down');
            }
        } else {
            scroll++;
            if (scroll > 5 || window.scrollY === 0) {
                scroll = 0;
                $('#header').removeClass('scroll-down').addClass('scroll-up');
            }
        }
        lastScrollTop = st;
    });
    */

    /* Adjust the height of mobile menu */
    var adjustMobileMenuHeight = function () {
        var h = $(window).innerHeight() - $('#header .top').height() - $('#header>.container').height();
        $('#header-menu').css('max-height', h + 'px');
        // console.log('Adjust  #header-menu.max-height:', h+'px');
    };
    $(window).resize(function () {
        adjustMobileMenuHeight();
    });
    adjustMobileMenuHeight();

    /* Adjust dropdown menu position when there is not enough space to show */
    var adjustDropdownMenu = function () {
        $m = $('.dropdown.last-menu .dropdown-menu');
        // console.log($m);
        if ($m.length > 0) {
            // console.log($m.offset());
            if ($m.offset().left + $m.width() > $(window).innerWidth()) {
                $m.offset({
                    left: $(window).innerWidth() - $m.width()
                });
            } else {
                $m.css('left', '');
            }
        }
    }
    $('.dropdown.last-menu').on('click', function () {
        setTimeout(function () {
            adjustDropdownMenu();
        }, 50);
    });

    /* Adjust header-img height by screen width change */
    var adjustHeaderHeight = function () {
        $el = $('#page-section .header-img');
        var h = $(window).innerWidth() * 0.4;
/*
        if (h > 420) {
            h = 420;
        }
*/
        if (h < 180) {
            h = 180;
        } else {
         var h2 = $(window).innerHeight() * 0.4;
         if (h2 < 320) {
             h = 320;
         }
        }

        // update .header-img height
        $el.height(h < 420 ? h : 420);

        // update #page-section stick to menu bottom
        // $('#page-section').css('margin-top', $('#header').height() + 'px');
    }
    $(window).resize(function () {
        adjustHeaderHeight();
        alignHomeMenu();
    });
    adjustHeaderHeight();


    /* Add active class to bootstrap collapse header */
    $('#accordion a').on('mouseover', function(e) {
        $(e.target).parent().parent().addClass('active');
    });
    $('#accordion a').on('mouseout', function(e) {
        if ($(e.target).hasClass('collapsed')) {
            $(e.target).parent().parent().removeClass('active');
        }
    });
    $('#accordion').on('show.bs.collapse', function (e) {
        $('#accordion .panel-heading').removeClass('active');
        $('.panel-heading', $(e.target).parent()).addClass('active');
    });

    // Open Quicklink menu when mobile menu open
    $('#header-menu').on('shown.bs.collapse', function(){
        $('.dropdown-toggle.quick-links').dropdown('toggle');
    });

/*
    ///
    $(window).on('resize scroll orientationchange', function() {
        var scrollTop = $(this).scrollTop();
        var height = $("#header").outerHeight();

        if (scrollTop > 0) {

            $("#header").addClass("navbar-fixed-top");
            // $("#header").parent().css("padding-top", height);
            $('#page-section').css('margin-top', height);
        }
        else {
  
            $("#header").removeClass("navbar-fixed-top");
            $('#page-section').css("margin-top", 0);
        }

        // logoLines();
    });
*/

    $(".drawer-toggle").bind("click", function() {
        var offset = $('#header').offset().top;
        var container = $('#more-hkust');
    
        var drawer = container.find(".drawer-wrapper");
        var height = drawer.children().outerHeight(true);
        container.toggleClass("drawer-shown");
        $('#header').toggleClass("icon-animation");
        if (container.hasClass("drawer-shown")) {
            container.removeClass('drawer-holder');
            drawer.animate({
                height: height,
            }, 150);
        }
        else {
            drawer.animate({
                height: 0,
            }, 150);
        }
       
    });
    

   

});

/* nav-menu.js */
// console.log('Hello, nav-menu.js');

$(function () {
    var menu = $('#nav-menu').attr('data-menu');
    var active = $('#nav-menu').attr('data-active');
    var $navigation = $('.nav-menu-holder .title');
    var $topMenu = $('.level-1');
    var contentMinWidth = 1740;

    var checkMenuOpen = function () {
        $('.nav-menu-holder').removeClass('active');
        if (window.innerWidth > contentMinWidth) {
            $('.nav-menu-holder.open').addClass('active');
        } else {
            $('.nav-menu-holder.closed').addClass('active');
        }
    }

    var closeMenu = function(checkWidth) {
        if (window.innerWidth <= contentMinWidth || !checkWidth) {
            $('.nav-menu-holder.open').removeClass('active');
            $('.nav-menu-holder.closed').addClass('active');
        }
    }

    if (menu) {

        $.get("/assets/data/menu-" + menu + ".json", function (d) {
            // console.log('nav-menu', menu, d);

            // Create Tree menu
            $('#nav-menu').treeview({
                data: d,
                expandIcon: 'fa fa-angle-right',
                collapseIcon: 'fa fa-angle-down',
                showBorder: false,
                backColor:'#EAEAEA', /* scss $gray-1 */
                searchResultColor:'#EF7C1F', /* scss $orange-1 */
                selectedColor: '#EF7C1F',
                selectedBackColor: '#EAEAEA',
                levels: 2,
                enableLinks: true,
                onNodeSelected: function (event, data) {
                    // console.log('onNodeSelected', event, data);
                    if (data.href) {
                        location.href = data.href;
                    }
                },
                onNodeExpanded: function (e,d) {
                    // console.log('onNodeExpanded', e, d);
                    $('#nav-menu').treeview('collapseAll', {silent: true});
                    $('#nav-menu').treeview('expandNode',[ d.nodeId, {silent: true}]);
                }
            });

            // Highlight active menu
            $('#nav-menu').treeview('search', [active, {
                ignoreCase: true, // case insensitive
                exactMatch: true, // like or equals
                revealResults: true, // reveal matching nodes
            }]);
        });

        $('.nav-menu-holder.closed').on('mouseover', function() {
            $('.nav-menu-holder.closed').removeClass('active');
            $('.nav-menu-holder.open').addClass('active');
        });

        $('.nav-menu-holder.open').on('mouseleave', function() {
            closeMenu(true);
        });
        $('.nav-menu-holder.open .title').on('click', function() {
            closeMenu();
        });

        window.setTimeout(function() {
            $('#nav-menu .list-group-item').css('background-color', '#EAEAEA'); // Fix IE background color issue
        }, 500);

        $(window).resize(function (e) {
            checkMenuOpen();
        });

        checkMenuOpen();

    }
});

/* home.js */
// console.log('Hello, home.js 2');
$(function () {

    // Is home page
    if ($('#home-page').length > 0) {

        /* Top Slider */
        (function () {
            var updateLayout = function () {
                var y = $('.top-section .carousel-inner .active img').height()/2-16;
                $('.top-section .carousel-control').css('top', y+'px');
            };
            $(window).resize(function (e) {
                updateLayout();
            });
            updateLayout();
        })();

        /* events slider */
        (function () {
            var options = {
                itemNav: 'basic',
                slidee: '#event-items .slidee',
                horizontal: false,
                speed: 250
            };
            var sly = new Sly('#event-items', options).init();

            $('#event-items .control .date li').on('click', function (e) {
                var target = $(e.currentTarget);
                var index = target.attr('data-index');
                // console.log('Events index', index);
                sly.toStart(index);
                $('#event-items .control .date li').removeClass('active');
                target.addClass('active');
            });
            // console.log('Home #event-items Sly start');
        })();

        /* research slider */
        (function () {
            var options = {
                itemNav: 'basic',
                slidee: '.research-section .slidee',
                prevPage: '.slides-control.left',
                nextPage: '.slides-control.right',
                horizontal: true,
                mouseDragging: true,
                touchDragging: true,
                speed: 250
            };

            var sly = new Sly('.research-section .frame', options).init();

            var updateLayout = function () {
                var winWidth = window.innerWidth;
                if (winWidth < 768) {
                    /* xs */
                    $('.research-section .slidee li').width(window.innerWidth - 60);
                    $('.research-section .frame').height($('.research-section .slidee li').height()+10);
                } else if (winWidth < 992) {
                    /* sm */
                    $('.research-section .slidee li').width(230);
                    $('.research-section .frame').height(175);
                } else if (winWidth < 1290) {
                    /* md */
                    $('.research-section .slidee li').width(210);
                    $('.research-section .frame').height(157);
                } else {
                    $('.research-section .slidee li').width(280);
                    $('.research-section .frame').height(210);
                }
                sly.reload();
            };
            $(window).resize(function (e) {
                updateLayout();
            });
            updateLayout();
            // console.log('Home .research-section Sly start');
        })();
    }

});

/* events.js */
// console.log('Hello, events.js');
$(function() {

    /* Event Slider */
    (function() {
        if ($('#event-slides .frame').length > 0) {
            var options = {
                itemNav: 'basic',
                slidee: '#event-slides .slidee',
                prevPage: '.slides-control.left',
                nextPage: '.slides-control.right',
                horizontal: true,
                mouseDragging: true,
                touchDragging: true,
                speed: 250
            };
            var sly = new Sly('#event-slides .frame', options).init();
            // console.log('Event page #event-slides Sly start', sly);
        }

    })();
});
/* research.js */
/* for research page only */
// console.log('Hello, research.js');
$(function() {

    $('#researchModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var image = button.data('image');
        var type = button.data('type');
        var contentfile = button.data('contentfile');

        $( "#researchModal .content-loader" ).load(contentfile, function() {
            // content loaded
        });
    });

});
