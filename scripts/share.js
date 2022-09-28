window.addEventListener("load", () => {
    function share() {
        if (navigator.share) {
            const url = document.querySelector('link[rel=canonical]')?.href;
            const title = document.querySelector('meta[name=title]')?.content;
            const desciption = document.querySelector('meta[name=description]')?.content;

            navigator.share({
                title: title ?? document.title,
                text: desciption,
                url: url ?? document.location.href,
            });
        }
    }

    if (navigator.share) {
        document.body.classList.add('feature-native-share');
    }

    window.mvp = window.mvp || {};
    window.mvp.share = share;
});