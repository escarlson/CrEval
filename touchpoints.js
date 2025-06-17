// Overlay circles for each touch point
  const touchIndicators = {};

  function showTouchIndicator(identifier, x, y) {
    let indicator = touchIndicators[identifier];
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'touchpoint-indicator';
      document.body.appendChild(indicator);
      touchIndicators[identifier] = indicator;
    }
    indicator.style.left = x + 'px';
    indicator.style.top = y + 'px';
    indicator.style.opacity = '1';
  }

  function removeTouchIndicator(identifier) {
    const indicator = touchIndicators[identifier];
    if (indicator) {
      indicator.style.opacity = '0';
      setTimeout(() => {
        if (indicator.parentNode) indicator.parentNode.removeChild(indicator);
        delete touchIndicators[identifier];
      }, 200);
    }
  }

  window.addEventListener('touchstart', function(e) {
    for (const t of e.changedTouches) {
      showTouchIndicator(t.identifier, t.clientX, t.clientY);
    }
  }, {passive: true});

  window.addEventListener('touchmove', function(e) {
    for (const t of e.changedTouches) {
      showTouchIndicator(t.identifier, t.clientX, t.clientY);
    }
  }, {passive: true});

  window.addEventListener('touchend', function(e) {
    for (const t of e.changedTouches) {
      removeTouchIndicator(t.identifier);
    }
  }, {passive: true});

  window.addEventListener('touchcancel', function(e) {
    for (const t of e.changedTouches) {
      removeTouchIndicator(t.identifier);
    }
  }, {passive: true});