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
