window.addEventListener("load", () => {
    var f = document.querySelector("#change-settings");
    if (!f) return;
    var o = f.onsubmit;

    var b = document.querySelector("#sbmbtn");
    if (b) b.addEventListener("click", () => {
        const id = window.user.id;
        const email = document.querySelector("#email").value;
        const tfa = document.querySelector("#tfa").value;
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
                    alert("401");
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
        });
    }

});