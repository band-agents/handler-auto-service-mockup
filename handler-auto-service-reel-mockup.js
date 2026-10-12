
  function sizeGrid() {
    var grid = document.getElementById('grid');
    var wrap = document.getElementById('gridWrap');
    var w = grid.getBoundingClientRect().width;
    var colW = w / 3;
    var rowH = colW * (853/640);
    wrap.style.height = (rowH * 2 + rowH * 0.30) + 'px';
  }
  window.addEventListener('resize', sizeGrid);
  window.addEventListener('load', sizeGrid);
  sizeGrid();

  var currentTab = 'posts';
  var tabSwitching = false;
  var gridEl = document.getElementById('grid');
  var reelsGridEl = document.getElementById('reelsGrid');
  var gridWrapEl = document.getElementById('gridWrap');
  var tabIndicatorEl = document.getElementById('tabIndicator');

  function switchTab(tab) {
    if (tab === currentTab || tabSwitching) return;
    tabSwitching = true;

    var fromEl = currentTab === 'posts' ? gridEl : reelsGridEl;
    var toEl = tab === 'posts' ? gridEl : reelsGridEl;
    var dir = (tab === 'reels') ? -1 : 1;
    currentTab = tab;

    document.getElementById('tabPosts').classList.toggle('active', tab === 'posts');
    document.getElementById('tabReels').classList.toggle('active', tab === 'reels');
    tabIndicatorEl.style.transform = 'translateX(' + (tab === 'posts' ? '0%' : '100%') + ')';

    fromEl.style.transition = 'opacity .26s ease, transform .26s cubic-bezier(.4,0,1,1)';
    fromEl.style.opacity = '0';
    fromEl.style.transform = 'translateY(' + (dir * -10) + 'px) scale(.97)';

    setTimeout(function() {
      fromEl.style.display = 'none';
      toEl.style.display = 'grid';
      toEl.style.transition = 'none';
      toEl.style.opacity = '0';
      toEl.style.transform = 'translateY(' + (dir * 10) + 'px) scale(.97)';
      void toEl.offsetWidth;
      toEl.style.transition = 'opacity .34s ease, transform .34s cubic-bezier(.22,.8,.36,1)';
      toEl.style.opacity = '1';
      toEl.style.transform = 'translateY(0) scale(1)';
      gridWrapEl.scrollTop = 0;
      setTimeout(function() { tabSwitching = false; }, 340);
    }, 260);
  }

  setInterval(function() {
    var overlay = document.getElementById('overlay');
    var reelOverlay = document.getElementById('reelOverlay');
    if (tabSwitching || overlay.classList.contains('show') || reelOverlay.classList.contains('show')) return;
    switchTab(currentTab === 'posts' ? 'reels' : 'posts');
  }, 10000);

  var POSTS_DATA = [
  { slides: ["assets/p1_cover_full.jpg"], caption: "Access granted. Your BMW knows its driver \u2014 smart key technology, checked and calibrated." },
  { slides: ["assets/p2_cover_full.jpg"], caption: "One push, full confidence. Every ignition system inspected to factory standard." },
  { slides: ["assets/p3_cover_full.jpg"], caption: "Redline ready. Engine tuning and performance checks by certified specialists." },
  { slides: ["assets/p4_cover_full.jpg"], caption: "Precision in every detail \u2014 genuine BMW M5 care, inside and out." },
  { slides: ["assets/p5_cover_full.jpg"], caption: "Where icons meet. Mercedes & BMW mechanical engineers, under one roof." },
  { slides: ["assets/p6_cover_full.jpg"], caption: "Headlight to grille \u2014 full exterior diagnostics for your Mercedes-AMG." },
  { slides: ["assets/p7_cover_full.jpg"], caption: "Every detail matters, down to the taillight. MINI Cooper specialists on call." },
  { slides: ["assets/p8_cover_full.jpg"], caption: "Flawless finish, every time. Premium detailing that respects the paint." },
  { slides: ["assets/p9_cover_full.jpg"], caption: "Pure fluid, pure performance \u2014 only manufacturer-grade oils and fluids used." },
  { slides: ["assets/p10_cover_full.jpg"], caption: "The expert eye catches what others miss. That's the Handler difference." },
  { slides: ["assets/p11_cover_full.jpg"], caption: "Full scan diagnostics \u2014 every system checked, nothing left to guesswork." },
  { slides: ["assets/p12_cover_full.jpg"], caption: "Ramadan Kareem from the Handler family. May your journeys always be safe." },
  { slides: ["assets/p13_cover_full.jpg"], caption: "Built for the icons. Your Mercedes-AMG G-Class, handled with precision." },
  { slides: ["assets/p14_cover_full.jpg"], caption: "One specialization, four legendary marques: BMW, Mercedes, Range Rover & MINI Cooper." },
  { slides: ["assets/p15_cover_full.jpg"], caption: "Premium materials deserve premium care \u2014 interior detailing done right." },
  { slides: ["assets/p16_cover_full.jpg"], caption: "Mercedes-Maybach standards, Handler precision. Every finish, factory-perfect." },
  { slides: ["assets/p17_cover_full.jpg"], caption: "Your car knows us. Two icons, one trusted service center." },
  { slides: ["assets/p18_cover_full.jpg"], caption: "Driven by expertise \u2014 BMW M-series care from certified specialists." },
  { slides: ["assets/p19_cover_full.jpg"], caption: "Factory standards, every visit. Range Rover care done the right way." },
  { slides: ["assets/p20_cover_full.jpg"], caption: "100% warranty on all parts \u2014 our commitment to every customer, guaranteed." },
  { slides: ["assets/p21_cover_full.jpg"], caption: "Engineering precision, down to the smallest detail. That's the Handler standard." },
];

  var curPost = 0, curSlide = 0;
  var track = document.getElementById('ovTrack');
  var dotsWrap = document.getElementById('ovDots');
  var mediaEl = document.getElementById('ovMedia');

  function openExpanded(idx) {
    curPost = idx;
    curSlide = 0;
    renderPost();
    document.getElementById('overlay').classList.add('show');
  }
  function closeExpanded(e) {
    e.stopPropagation();
    document.getElementById('overlay').classList.remove('show');
  }

  function renderPost() {
    var data = POSTS_DATA[curPost];
    track.style.transition = 'none';
    track.innerHTML = data.slides.map(function(s) {
      return '<img class="ov-slide" src="' + s + '" draggable="false">';
    }).join('');
    track.style.transform = 'translateX(0%)';
    void track.offsetWidth;
    track.style.transition = '';

    if (data.slides.length > 1) {
      dotsWrap.style.display = 'flex';
      dotsWrap.innerHTML = data.slides.map(function(_, i) {
        return '<span class="dot' + (i === 0 ? ' active' : '') + '" data-i="' + i + '"></span>';
      }).join('');
    } else {
      dotsWrap.style.display = 'none';
      dotsWrap.innerHTML = '';
    }
    document.getElementById('ovCaptionText').textContent = ' ' + data.caption;
    document.getElementById('ovHeart').classList.remove('liked');
    updateNavButtons();
  }

  function updateNavButtons() {
    document.getElementById('navUp').classList.toggle('disabled', curPost === 0);
    document.getElementById('navDown').classList.toggle('disabled', curPost === POSTS_DATA.length - 1);
  }

  function updateSlidePosition() {
    track.style.transform = 'translateX(' + (-curSlide * 100) + '%)';
    var dots = dotsWrap.querySelectorAll('.dot');
    dots.forEach(function(d, i) { d.classList.toggle('active', i === curSlide); });
  }

  function goToSlide(i) {
    var n = POSTS_DATA[curPost].slides.length;
    if (i < 0) i = 0;
    if (i > n - 1) i = n - 1;
    curSlide = i;
    updateSlidePosition();
  }

  dotsWrap.addEventListener('click', function(e) {
    var dot = e.target.closest('.dot');
    if (!dot) return;
    goToSlide(parseInt(dot.getAttribute('data-i'), 10));
  });

  var ovCard = document.getElementById('ovCard');
  var isAnimating = false;

  function switchPost(newIdx, dir) {
    if (isAnimating) return;
    if (newIdx < 0 || newIdx > POSTS_DATA.length - 1) {
      ovCard.style.transition = 'transform .18s ease';
      ovCard.style.transform = 'translateY(0)';
      return;
    }
    isAnimating = true;
    var outClass = dir === 'next' ? 'anim-out-up' : 'anim-out-down';
    var prepClass = dir === 'next' ? 'anim-prep-up' : 'anim-prep-down';
    ovCard.style.transition = '';
    ovCard.style.transform = '';
    ovCard.classList.add(outClass);
    setTimeout(function() {
      curPost = newIdx;
      curSlide = 0;
      renderPost();
      ovCard.classList.remove(outClass);
      ovCard.classList.add(prepClass);
      void ovCard.offsetWidth;
      ovCard.classList.remove(prepClass);
      setTimeout(function() { isAnimating = false; }, 260);
    }, 230);
  }

  var dragging = false, axis = null;
  var dragStartX = 0, dragStartY = 0, dragDeltaX = 0, dragDeltaY = 0;
  var AXIS_LOCK_PX = 6;

  mediaEl.addEventListener('pointerdown', function(e) {
    if (isAnimating) return;
    dragging = true;
    axis = null;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragDeltaX = 0; dragDeltaY = 0;
    track.style.transition = 'none';
    ovCard.style.transition = 'none';
    mediaEl.setPointerCapture(e.pointerId);
  });

  mediaEl.addEventListener('pointermove', function(e) {
    if (!dragging) return;
    dragDeltaX = e.clientX - dragStartX;
    dragDeltaY = e.clientY - dragStartY;

    if (!axis) {
      if (Math.abs(dragDeltaX) > AXIS_LOCK_PX || Math.abs(dragDeltaY) > AXIS_LOCK_PX) {
        axis = Math.abs(dragDeltaX) > Math.abs(dragDeltaY) ? 'x' : 'y';
      } else {
        return;
      }
    }

    if (axis === 'x') {
      if (POSTS_DATA[curPost].slides.length < 2) return;
      var pct = (dragDeltaX / mediaEl.clientWidth) * 100;
      track.style.transform = 'translateX(' + (-curSlide * 100 + pct) + '%)';
    } else {
      ovCard.style.transform = 'translateY(' + dragDeltaY + 'px)';
    }
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    ovCard.style.transition = '';

    if (axis === 'x') {
      var threshX = mediaEl.clientWidth * 0.16;
      if (dragDeltaX < -threshX) goToSlide(curSlide + 1);
      else if (dragDeltaX > threshX) goToSlide(curSlide - 1);
      else updateSlidePosition();
    } else if (axis === 'y') {
      var threshY = ovCard.clientHeight * 0.12;
      if (dragDeltaY < -threshY) switchPost(curPost + 1, 'next');
      else if (dragDeltaY > threshY) switchPost(curPost - 1, 'prev');
      else {
        ovCard.style.transform = 'translateY(0)';
      }
    }
    axis = null;
    dragDeltaX = 0; dragDeltaY = 0;
  }
  mediaEl.addEventListener('pointerup', endDrag);
  mediaEl.addEventListener('pointercancel', endDrag);
  mediaEl.addEventListener('pointerleave', function(e) { if (dragging) endDrag(); });

  document.addEventListener('keydown', function(e) {
    var overlay = document.getElementById('overlay');
    var reelOverlay = document.getElementById('reelOverlay');
    if (overlay.classList.contains('show')) {
      if (e.key === 'ArrowRight') { goToSlide(curSlide + 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { goToSlide(curSlide - 1); e.preventDefault(); }
      else if (e.key === 'ArrowDown') { switchPost(curPost + 1, 'next'); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { switchPost(curPost - 1, 'prev'); e.preventDefault(); }
      else if (e.key === 'Escape') { overlay.classList.remove('show'); }
    } else if (reelOverlay.classList.contains('show')) {
      if (e.key === 'ArrowDown') { switchReel(curReel + 1); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { switchReel(curReel - 1); e.preventDefault(); }
      else if (e.key === 'Escape') { reelOverlay.classList.remove('show'); }
    }
  });

  document.getElementById('ovHeart').addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('liked');
  });

  /* ---------- Reels viewer ---------- */
  var REELS_DATA = [
  { full: "assets/r1_full.jpg", caption: "Three branches, one standard of care. Abu Rawash, El Nozha & Katameya \u2014 find us near you.", likes: "820", comments: "24" },
  { full: "assets/r2_full.jpg", caption: "Beyond the surface \u2014 restoration as an art. Every dent, every scratch, handled with precision.", likes: "540", comments: "18" },
  { full: "assets/r3_full.jpg", caption: "One small mistake costs a lot. Don't risk your BMW with the wrong hands.", likes: "1.4K", comments: "63" },
  { full: "assets/r4_full.jpg", caption: "Fixed & ready. Nothing beats the feeling of hitting the road with total confidence.", likes: "980", comments: "31" },
  { full: "assets/r5_full.jpg", caption: "Future ready \u2014 22kW EV charging, powered by Raya Auto. Handler keeps up with tomorrow.", likes: "410", comments: "15" },
  { full: "assets/r6_full.jpg", caption: "Why clients return, in his own words. Mohamed Khalaf, our Kattameya Branch Manager.", likes: "690", comments: "22" },
  { full: "assets/r7_full.jpg", caption: "Genuine care \u2014 it's not just a slogan, it's our philosophy in every service bay.", likes: "355", comments: "11" },
  { full: "assets/r8_full.jpg", caption: "Team spirit. Every car gets more than one set of expert eyes on it.", likes: "480", comments: "17" },
  { full: "assets/r9_full.jpg", caption: "New generation diagnostics \u2014 precision tools for precision engineering.", likes: "760", comments: "26" },
  { full: "assets/r10_full.jpg", caption: "Experts, not guesses. Shenouda Fawzy, our Kattameya Workshop Foreman.", likes: "890", comments: "29" },
  { full: "assets/r11_full.jpg", caption: "This is the Handler difference \u2014 walk through our workshop and see it for yourself.", likes: "1.1K", comments: "35" },
  { full: "assets/r12_full.jpg", caption: "Look up next time you drive by \u2014 the Handler sign means you're in good hands.", likes: "610", comments: "20" },
  { full: "assets/r13_full.jpg", caption: "10 years of paint protection on every job. That's how much we trust our own work.", likes: "1.2K", comments: "38" },
  { full: "assets/r14_full.jpg", caption: "Now open \u2014 Abu Rawash, 6th of October, beside Dandy Mall. Our 4th location for your convenience.", likes: "1.9K", comments: "74" },
  { full: "assets/r15_full.jpg", caption: "BMW, Mercedes-Benz, Mini Cooper & Range Rover \u2014 all under one roof, all at Handler standard.", likes: "950", comments: "27" },
  { full: "assets/r16_full.jpg", caption: "Something new is coming. Stay tuned \u2014 Handler's next chapter is almost here.", likes: "1.6K", comments: "58" },
  { full: "assets/r17_full.jpg", caption: "No limits. Precision detailing that brings out the best in every build.", likes: "1.3K", comments: "45" },
  { full: "assets/r18_full.jpg", caption: "Trust & integrity, in his own words. Ebram Rashad, our El Nozha Branch Manager.", likes: "740", comments: "23" },
  { full: "assets/r19_full.jpg", caption: "Handler confidence, Nozha branch. Two sets of hands, one standard of precision.", likes: "470", comments: "16" },
  { full: "assets/r20_full.jpg", caption: "BMW precision checks \u2014 because excellence is not optional at Handler.", likes: "830", comments: "24" },
  { full: "assets/r21_full.jpg", caption: "Inside the B58 \u2014 turbocharger assembly, mapped down to the last bolt. This is how we know your engine.", likes: "610", comments: "19" },
  { full: "assets/r22_full.jpg", caption: "Abu Rawash is ready. Every lift bay set, every tool in place \u2014 waiting for you.", likes: "1.0K", comments: "33" },
  { full: "assets/r23_full.jpg", caption: "Every part matters. From pistons to brake discs, we know your BMW inside and out.", likes: "690", comments: "21" },
  { full: "assets/r24_full.jpg", caption: "Soft opening 23.08 \u2014 Abu Rawash. Level up your car care with Handler.", likes: "2.2K", comments: "89" },
  { full: "assets/r25_full.jpg", caption: "Next chapter: Abu Rawash. We're growing because of you \u2014 coming soon.", likes: "1.7K", comments: "62" },
  { full: "assets/r26_full.jpg", caption: "Automotive science \u2014 every diagnosis backed by data, not guesswork.", likes: "520", comments: "17" },
  { full: "assets/r27_full.jpg", caption: "Teamwork, built on trust. Every fist bump means another car done right.", likes: "780", comments: "25" },
  { full: "assets/r28_full.jpg", caption: "No delay. When you book with Handler, your time matters as much as your car.", likes: "440", comments: "14" },
  { full: "assets/r29_full.jpg", caption: "Legacy reborn. Decades of trust, rebuilt for a new generation of drivers.", likes: "1.1K", comments: "40" },
  { full: "assets/r30_full.jpg", caption: "Every headlight polished to perfection \u2014 the small details make the difference.", likes: "310", comments: "9" },
  { full: "assets/r31_full.jpg", caption: "Art of performance. M Power, tuned and maintained by people who love it as much as you do.", likes: "1.5K", comments: "55" },
  { full: "assets/r32_full.jpg", caption: "Unsung heroes \u2014 the hands behind every fix, every tune, every satisfied client.", likes: "640", comments: "21" },
  { full: "assets/r33_full.jpg", caption: "A Handler masterpiece, always in progress. Excellence is never really finished.", likes: "910", comments: "30" },
  { full: "assets/r34_full.jpg", caption: "Repainting in Malachite \u2014 gloss metallic, paint code 205. Color-matched to perfection.", likes: "1.3K", comments: "47" },
  { full: "assets/r35_full.jpg", caption: "Engineered respect. Every marque we service gets the same precision and care.", likes: "850", comments: "28" },
  { full: "assets/r36_full.jpg", caption: "Beyond repair, we feel. It's not just metal to us \u2014 it's your daily drive.", likes: "1.0K", comments: "36" },
  { full: "assets/r37_full.jpg", caption: "Master hands. Every detail matters \u2014 down to the smallest spark plug.", likes: "580", comments: "18" },
  { full: "assets/r38_full.jpg", caption: "The icons, your second home. BMW & Mercedes \u2014 welcomed like family at every branch.", likes: "1.4K", comments: "49" },
  { full: "assets/r39_full.jpg", caption: "Small things are everything. One bolt, torqued right, makes all the difference.", likes: "390", comments: "12" },
  { full: "assets/r40_full.jpg", caption: "Rare breed. Mastered in Egypt \u2014 precision performance care for the cars that demand it.", likes: "1.8K", comments: "68" },
  { full: "assets/r41_full.jpg", caption: "A vision executed. Every badge on that grille backed by our word.", likes: "720", comments: "23" },
  { full: "assets/r42_full.jpg", caption: "Sculpting perfection, from underneath. The work you don't see is the work that matters most.", likes: "650", comments: "20" },
];
  var curReel = 0;
  var reelOverlay = document.getElementById('reelOverlay');
  var reelMediaEl = document.getElementById('reelMedia');
  var reelImg = document.getElementById('reelImg');
  var reelAnimating = false;

  function openReel(idx) {
    curReel = idx;
    renderReel();
    reelOverlay.classList.add('show');
  }
  function closeReel(e) {
    e.stopPropagation();
    reelOverlay.classList.remove('show');
  }
  function renderReel() {
    var d = REELS_DATA[curReel];
    reelImg.src = d.full;
    document.getElementById('reelCaption').textContent = d.caption;
    document.getElementById('reelLikeCount').textContent = d.likes;
    document.getElementById('reelCommentCount').textContent = d.comments;
    document.getElementById('reelHeart').classList.remove('liked');
    updateReelNav();
  }
  function updateReelNav() {
    document.getElementById('reelNavUp').classList.toggle('disabled', curReel === 0);
    document.getElementById('reelNavDown').classList.toggle('disabled', curReel === REELS_DATA.length - 1);
  }
  function switchReel(newIdx) {
    if (reelAnimating) return;
    if (newIdx < 0 || newIdx > REELS_DATA.length - 1) return;
    reelAnimating = true;
    reelImg.style.opacity = '0';
    setTimeout(function() {
      curReel = newIdx;
      renderReel();
      reelImg.style.opacity = '1';
      setTimeout(function() { reelAnimating = false; }, 200);
    }, 180);
  }

  document.getElementById('reelHeart').addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('liked');
  });

  var reelPlayIcon = document.getElementById('reelPlay');
  var reelPaused = true;
  reelImg.addEventListener('click', function() {
    reelPaused = !reelPaused;
    reelPlayIcon.classList.toggle('show', reelPaused);
  });

  var reelDragging = false, reelStartY = 0, reelDeltaY = 0;
  reelMediaEl.addEventListener('pointerdown', function(e) {
    if (reelAnimating) return;
    if (e.target.closest('.reel-actions, .rb-follow')) return;
    reelDragging = true;
    reelStartY = e.clientY;
    reelDeltaY = 0;
    reelMediaEl.setPointerCapture(e.pointerId);
  });
  reelMediaEl.addEventListener('pointermove', function(e) {
    if (!reelDragging) return;
    reelDeltaY = e.clientY - reelStartY;
  });
  function endReelDrag() {
    if (!reelDragging) return;
    reelDragging = false;
    var thresh = reelMediaEl.clientHeight * 0.12;
    if (reelDeltaY < -thresh) switchReel(curReel + 1);
    else if (reelDeltaY > thresh) switchReel(curReel - 1);
    reelDeltaY = 0;
  }
  reelMediaEl.addEventListener('pointerup', endReelDrag);
  reelMediaEl.addEventListener('pointercancel', endReelDrag);
  reelMediaEl.addEventListener('pointerleave', function(e) { if (reelDragging) endReelDrag(); });

  var isFollowing = false;
  var mainFollowBtn = document.getElementById('followBtn');
  var reelFollowBtn = document.getElementById('reelFollowBtn');

  function setFollowing(state) {
    isFollowing = state;
    mainFollowBtn.classList.toggle('following', state);
    mainFollowBtn.textContent = state ? 'Following' : 'Follow';
    mainFollowBtn.classList.remove('pulse');
    void mainFollowBtn.offsetWidth;
    mainFollowBtn.classList.add('pulse');

    reelFollowBtn.classList.toggle('following', state);
    reelFollowBtn.textContent = state ? 'Following' : 'Follow';
  }

  mainFollowBtn.addEventListener('click', function() {
    setFollowing(!isFollowing);
  });

  reelFollowBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    setFollowing(!isFollowing);
  });
