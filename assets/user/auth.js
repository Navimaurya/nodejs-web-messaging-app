import axios from 'axios';
class Auth {
    login =  async () =>{
        const form = document.getElementById('login-form');
        const usernameIn = document.getElementById('username');
        const passwordIn = document.getElementById('password');
        if (!form || !usernameIn || !passwordIn){
            return false;
        }

        form.addEventListener('submit',  async (e) => {
            e.preventDefault();
            try{
            const phone = usernameIn.value;
            const password = passwordIn.value;
            const keepLogedIn = true;
            if (!phone) return  console.log("Provide a username");
            if (!password) return console.log("Provide a password");
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)))  return console.log('Password is not correct.');
            const res = await axios({
                method : 'POST',
                url : '/api/v0/login',
                data :{
                    phone,
                    password,
                    keepLogedIn,
                }
            });
            if (res.data.status === "success") {
                window.setTimeout(() => {
                    location.assign("/");
                }, 100);
            }
            }catch(err){
                console.log(err.response.data)
                alert(err.response.data);
            }
        }, false);
    };
}

module.exports =  new Auth;