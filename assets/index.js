import "@babel/polyfill";
import axios from "axios";

import SynceFromServer from './messageapp/SynceFromServer'
import UiLocalDb from './messageapp/UILocalDb';
import StartUI from './messageapp/StartUI';
import Auth from './user/auth';
import toBoolean from "validator/es/lib/toBoolean";

// import AppControll from './messageapp/appControll'
const loginpage = async () => {


    await Auth.login();
    await Auth.resister();
    Auth.resisterpage();
}
// const startApp = async ()=>{
//     try {
//         //Loading user content first time or regreshing contentd
//         await SynceFromServer.start();
//         await UiLocalDb.friendList();
//         await UiLocalDb.chatList();
//         await UiLocalDb._updateMessage();
//         StartUI.openChat();
//         return true;
//     }catch (err){
//         console.log(err);
//         return false;
//     }
// }

//Loading index page
const index = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/web'
        });
        if (res.status === 200) {
            let main = document.getElementById('main');
            if (!main) {
                main = document.createElement("div");
                main.id = 'main';
                document.body.insertBefore(main, document.body.firstChild)
            }
            main.innerHTML = res.data;
            if (toBoolean(res.headers.auth)) {
                await StartUI.startApp();
            }
            await loginpage();
            return true;
        }
    } catch (err) {
        console.log(err.response.data, "From index")
        return false;
    }
}

//Main funtion for the Page
const main = async () => {
    if (await index()) {
        console.log('start')
    }
}

//When document is loaded
document.onreadystatechange = async () => {
    if (document.readyState === 'interactive') {
        window.user = null;
        await main();
        toast('This app is a Node Js personal project', 'bg-success')
    }
}
