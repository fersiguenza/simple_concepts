// Force browser to refresh CSS cache
document.addEventListener('DOMContentLoaded', function() {
  // Add a timestamp to force cache refresh
  const links = document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) {
    if (links[i].rel === 'stylesheet') {
      links[i].href = links[i].href + '?v=' + new Date().getTime();
    }
  }
});
