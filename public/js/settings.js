window.addEventListener("load", () => {
    var f = document.querySelector("#change-settings");
    if (!f) return;
    var o = f.onsubmit;

    var b = document.querySelector("#sbmbtn");
    if (b) b.addEventListener("click", () => {
        const id = window.user.id;
        const email = document.querySelector("#email").value;
        const tfa = document.querySelector("#tfa").value;
        var body = { email, tfa };
        if (window.totp && window.totp.get) {
            body.ott = totp.get();
        }        
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(body)
        };
    
        return fetch(`http://api.virtualbank.com:4000/users/${id}`, requestOptions)
            .then(handleResponse)
            .then(user => {
                window.user.email = user.email; //update global var
                localStorage.setItem('user', JSON.stringify(window.user)); //update LS
                window.location.href = '/settings';
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
                    alert("Your request was not authorized correctly!");
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
        });
    }

});