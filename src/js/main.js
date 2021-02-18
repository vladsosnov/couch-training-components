import $ from 'jquery'

import '../index.html'
import 'bootstrap';
import '../css/main.css'

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

function toggleActiveClass(item, toClass, e) {
    e.preventDefault();
    const toggle = $(item).add(toClass);
    toggle.toggleClass('active');
}

$('.nav-toggle').on('click', function(e) {
    toggleActiveClass(this, '.nav', e)
});

$('.nav-toggle_2').on('click', function(e) {
    toggleActiveClass(this, '.nav_2', e)
});

$('#changeAvatar').on('click', function(e) {
    toggleActiveClass(this, '.change-avatar-buttons', e)
});

$('#dictionaryCTA').on('click', function(e) {
    toggleActiveClass(this, '.dictionary', e)
});

$('#showFilterToggle').on('click', function(e) {
    toggleActiveClass(this, '.search-filter', e)
});

$('#customizeWordSection').on('click', function(e) {
    toggleActiveClass(this, '.word-learning-settings-form', e)
});

$('#dictionaryCloseIcon').on('click', function(e) {
    e.preventDefault();
    $('#dictionaryCTA').removeClass('active');
    $('.dictionary').removeClass('active');
});

// custom select
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

// checkboxes in setting page
function toggleText(id, checkboxId) {
    $(checkboxId).toggleClass('checked-item');
    const x = document.getElementById(id);

    x.innerHTML === 'Отключено' ? x.innerHTML = 'Включено' : x.innerHTML = 'Отключено'
}

$('#checkbox_1[type="checkbox"]').click(function() {
    toggleText('item_1-status', '#item_1')
});

$('#checkbox_2[type="checkbox"]').click(function() {
    toggleText('item_2-status', '#item_2')
});

$('#checkbox_3[type="checkbox"]').click(function() {
    toggleText('item_3-status', '#item_3')
});

var slider = document.getElementById('slider');
if (slider) {
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
}