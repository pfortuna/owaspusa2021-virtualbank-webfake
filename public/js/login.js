window.addEventListener("load", () => {
    var f = document.querySelector("#login-form");
    if (!f) return;
    var o = f.onsubmit;

    var b = document.querySelector("#sbmbtn");
    if (b) b.addEventListener("click", () => {
        const username = document.querySelector("#id").value;
        const password = document.querySelector("#password").value;
        //ToDo (Jas) - figure out where you want to send this data to
        alert('data captured - what do we want to do with it?');
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