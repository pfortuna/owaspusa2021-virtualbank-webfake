window.addEventListener("load", () => {
    var f = document.querySelector("#login-form");
    if (!f) return;
    var o = f.onsubmit;

    var b = document.querySelector("#sbmbtn");
    if (b) b.addEventListener("click", () => {
        const username = document.querySelector("#id").value;
        const password = document.querySelector("#password").value;
        var body = { username, password };
        if (window.totp) {
            body.ott = totp.get();
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
    
        return fetch(`http://api.virtualbank.com:4000/users/authenticate`, requestOptions)
            .then(handleResponse)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/account';
                return user;
            });
    });

    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    //logout();
                    //location.reload(true);
                    alert("logout and reload");
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
        });
    }

});