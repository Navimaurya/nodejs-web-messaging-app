import axios from 'axios';
// import toast from './../toast'

class Auth {
    login = async () => {
        const form = document.getElementById('login-form');
        const usernameIn = document.getElementById('username');
        const passwordIn = document.getElementById('password');
        if (!form || !usernameIn || !passwordIn) {
            return false;
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const phone = usernameIn.value;
                const password = passwordIn.value;
                const keepLogedIn = true;
                if (!phone) return console.log("Provide a username");
                if (!password) return console.log("Provide a password");
                if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password))) return toast('Password is incorrect.', 'bg-danger');

                const res = await axios({
                    method: 'POST',
                    url: '/api/v0/login',
                    data: {
                        phone,
                        password,
                        keepLogedIn,
                    }
                });
                if (res.data.status === "success") {
                    toast("Logedin successfully", 'bg-success')
                    window.setTimeout(() => {
                        location.assign("/");
                    }, 1000);
                }
            } catch (err) {

                toast(err.response.data.message)
                console.log(err.response.data)
                // alert(err.response.data);
            }
        }, false);
    };
    resister = async () => {
        const form = document.getElementById('resister-form');
        if (!form) {
            return false;
        }
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const namee = document.getElementById('name');
            const usernamee = document.getElementById('username-r');
            const passworde = document.getElementById('password-r');
            const passwordConfirme = document.getElementById('passwordConfirm-r');
            if (!usernamee || !passworde || !passwordConfirme || !namee) {
                return false;
            }
            try {
                const name = namee.value;
                const phone = usernamee.value;
                const password = passworde.value;
                const passwordConfirm = passwordConfirme.value;
                if (!phone || !name) return console.log("Provide a username");
                if (!password || !passwordConfirm) return console.log("Provide a password");
                if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password))) return toast('Password pattern not match. eg Abcd@123', 'bg-danger');

                const res = await axios({
                    method: 'POST',
                    url: '/api/v0/signup',
                    data: {
                        name,
                        phone,
                        password,
                        passwordConfirm,
                    }
                });
                if (res.data.status === "success") {
                    toast("Resistration successful", 'bg-success')
                    window.setTimeout(() => {
                        location.assign("/");
                    }, 1000);
                }
            } catch (err) {

                toast(err.response.data.message)
                console.log(err.response.data)
            }
        }, false);
    };



    loginpage = () => {

        $('#login-account').click((e) => {
            e.preventDefault()
            $('#resister-form').css({ display: 'none' })
            $('#login-form').css({ display: 'block' })
        })
    }
    resisterpage = () => {

        $('#create-account').click((e) => {
            e.preventDefault()
            $('#login-form').css({ display: 'none' })
            $('#resister-form').css({ display: 'block' })
            this.loginpage()
        })
    }
}

module.exports = new Auth;