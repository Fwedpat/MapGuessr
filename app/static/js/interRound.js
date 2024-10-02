function returnToHomepage() {
    console.log('Returning to homepage...');
    window.location.href = '/';
}

function next_round() {
    fetch('/game')
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        })
        .catch(error => console.error('Error:', error));
}

