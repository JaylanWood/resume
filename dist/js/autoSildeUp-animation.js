"use strict";

// 上滚动画和高亮
!function () {
  // specialTags 的 view 是一个数组，我们暂时跳过它吧。
  var specialTags = document.querySelectorAll('[data-x]');
  addOffset();
  headRemoveOffset();
  listenToScroll();

  function addOffset() {
    for (var i = 0; i < specialTags.length; i++) {
      specialTags[i].classList.add('offset');
    }
  }

  function headRemoveOffset() {
    if (!window.scrollY > 0) {
      window.setTimeout(function () {
        findClosestAndRemoveOffset();
      }, 500);
    }
  }

  function listenToScroll() {
    window.addEventListener('scroll', function () {
      findClosestAndRemoveOffset();
    });
  }

  function findClosestAndRemoveOffset() {
    //1.根据窗口与目标div距离，找出需要高亮的[data-x]标签
    var currentTop = window.scrollY;
    var minIndex = 0;

    for (var i = 1; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - currentTop) < Math.abs(specialTags[minIndex].offsetTop - currentTop)) {
        minIndex = i;
      }
    } //2.根据[data-x]的id找出a，a找出li


    var id = specialTags[minIndex].id;
    var a = document.querySelector('a[href="#' + id + '"]');
    var li = a.parentNode;
    var liBros = li.parentNode.children; // 下划线高亮

    for (var _i = 0; _i < liBros.length; _i++) {
      liBros[_i].classList.remove('heighLight');
    }

    li.classList.add('heighLight'); // 上滚动画

    specialTags[minIndex].classList.remove('offset');
  }
}.call();