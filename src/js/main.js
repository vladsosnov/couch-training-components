import $ from 'jquery'

import '../index.html'
import 'bootstrap';
import '../css/main.css'

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

$('.nav-toggle').on('click', function(e) {
    e.preventDefault();
    const toggle = $(this).add('.nav');
    toggle.toggleClass('active');
});

$('.nav-toggle_2').on('click', function(e) {
    e.preventDefault();
    const toggle = $(this).add('.nav_2');
    toggle.toggleClass('active');
});

$('#changeAvatar').on('click', function(e) {
    e.preventDefault();
    const toggle = $(this).add('.change-avatar-buttons');
    toggle.toggleClass('active');
});

$('#dictionaryCTA').on('click', function(e) {
    e.preventDefault();
    const toggle = $(this).add('.dictionary');
    toggle.toggleClass('active');
});

$('#dictionaryCloseIcon').on('click', function(e) {
    e.preventDefault();
    $('#dictionaryCTA').removeClass('active');
    $('.dictionary').removeClass('active');
});

$('#showFilterToggle').on('click', function(e) {
    e.preventDefault();
    const toggle = $(this).add('.search-filter');
    toggle.toggleClass('active');
});

$('#customizeWordSection').on('click', function(e) {
    e.preventDefault();
    const toggle = $(this).add('.word-learning-settings-form');
    toggle.toggleClass('active');
});

// select

$('.jRadioDropdown').change(function() {
    const dropdown = $(this).closest('.dropdown');
    const thislabel = $(this).closest('label');
    const pcUserStatus = $('#pcUserStatus')

    dropdown.find('label').removeClass('active');
    if( $(this).is(':checked') ) {
        thislabel.addClass('active');
        dropdown.find('ins').html( thislabel.text() );
        pcUserStatus.removeClass().addClass(`user-status user-status--${thislabel.data('user-class')}`);
    }

    });    

    $('label.dropdown-item').each(function (index, value){
        $(this).attr('tabindex', 0 );
        $(this).find('input').attr('tabindex', -1 );
    });

    $('label.dropdown-item').keypress(function(e){
        if((e.keyCode ? e.keyCode : e.which) == 13){
        $(this).trigger('click');
    }
});

$('#btnDelFromContacts').on('click', function(e) {
    e.preventDefault();
    const toggle = $(this).add('.search-filter');
    toggle.toggleClass('active');
});


// upload file
$(function(){
    $('input[type=file]').each(function() {
      var $input = $(this),
          $label = $input.next('.js-labelFile'),
          labelVal = $label.html();

      $input.hide();
      $input.on('change', function(element) {
          var fileName = '';
          if (element.target.value) fileName = element.target.value.split('\\').pop();
          fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
      });
    });
});

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    },
    tooltips: true,
    direction: 'rtl',
    orientation: 'vertical',
});