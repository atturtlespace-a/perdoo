    document.addEventListener('DOMContentLoaded', function () {
        var shareButtons = document.querySelectorAll('[data-btn="mail"]');
        var postTitle = document.title; // Fetches the title of the blog post
        var postUrl = window.location.href; // Fetches the current URL
        
        shareButtons.forEach(function(shareButton) {
            var mailtoLink = `mailto:?subject=Check%20out%20this%20blog%20post:%20${encodeURIComponent(postTitle)}&body=I%20thought%20you%20might%20like%20this%20post:%20${encodeURIComponent(postUrl)}`;
            shareButton.setAttribute('href', mailtoLink);
        });
    });

