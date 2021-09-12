import axios from "axios";
import Items from "./pageItems";
import trim from "validator/es/lib/trim";

const getParentNode = (element, target)=>{
    for(; element && element !== document; element = element.parentNode){
        if(element.matches('.'+target))    return element;
    }
    return null
}

const messageSetter = {
    Message: {
        add: function (message, type) {
            let chat_body = $('.layout .content .chat .chat-body');
            if (chat_body.length > 0) {

                // type = type ? type : '';
                // message = message ? message : 'I did not understand what you said!';

                $('.layout .content .chat .chat-body .messages').append(`<div class="message-item ` + type + `">
                        <div class="message-avatar">
                            <div>
                                <div class="time">14:50 PM ` + (type === 'outgoing-message' ? '<i class="ti-check"></i>' : '') + `</div>
                            </div>
                        </div>
                        <div class="message-content">
                            ` + message + `
                        </div>
                    </div>`);

                setTimeout(function () {
                    chat_body.scrollTop(chat_body.get(0).scrollHeight, -1).niceScroll({
                        cursorcolor: 'rgba(66, 66, 66, 0.20)',
                        cursorwidth: "4px",
                        cursorborder: '0px'
                    }).resize();
                }, 200);
            }
        }
    }
};

const postMessageToBody = ()=>{
    for (let i=0; document.messageApp.newMessages.length > i; i++){
        if (document.messageApp.newMessages[i].sender._id !== document.messageApp.openFriend._id) return true;
        if((document.messageApp.newMessages[i].receiver === document.messageApp.profile._id)){
            messageSetter.Message.add(document.messageApp.newMessages[i].message)
        }else {
            messageSetter.Message.add(document.messageApp.newMessages[i].message, 'outgoing-message');
        }
    }
    document.messageApp.newMessages = null;
}

exports.getSetProfile = async () =>{
    //Get the profile content of user
    try{
        const res = await axios({
            method : 'GET',
            url:'/api/v0/me'
        });
        console.log(res)
        if (res.data.status === 'success'){
            document.messageApp.profile = res.data.data;
            const profileImage = document.getElementById('profileImage');
            const profileName = document.getElementById('profileName');
            const profileNumber = document.getElementById('profileNumber');
            const profileAbout = document.getElementById('profileAbout');
            const profileCity = document.getElementById('profileCity');
            const profileWebsite = document.getElementById('profileUserWebsite');
            // if (!profileImage || ! profileAbout || !profileCity || !profileName || !profileNumber || !profileWebsite) return false;
            profileImage.src = res.data.data.image;
            console.log(res.data.data.image)
            profileName.innerHTML = res.data.data.name;
            profileNumber.innerHTML = `+${res.data.data.code} ${res.data.data.phone}`;
            profileAbout.innerHTML = res.data.data.about;
            profileCity.innerHTML = res.data.data.city;
            profileWebsite.innerHTML = res.data.data.website;
            profileWebsite.href = res.data.data.website;
        }
        return true;
    }catch (err){
        console.log(err)
        return  false;
    }
}

exports.getSetFriendList = async ()=>{
    try{
        const res = await axios({
            method:"GET",
            url : '/api/v0/getfriends'
        });
        console.log(res)
        if (res.data.status === 'success'){

            const friendListContainer = document.getElementById('friendListContainer');
            if (!friendListContainer){
                return false;
            }
            if (typeof  res.data.data !== `object`){
                return true;
            }
            let html = Items.friendListItem();
            document.messageApp.friendList = {};
            if (!res.data.total) return true;
            res.data.data.forEach((item, i)=>{
                console.log(i);
                document.messageApp.friendList[res.data.data[i].number] = res.data.data[i];
                html = html.replace('%NAME%', item.name);
                html = html.replace('%NUMBER%', item.number);
                html = html.replaceAll('%FRIENDID%', item._id);
                html = html.replace('%IMAGE%', item.image);
            });
            friendListContainer.innerHTML = html;
            return true
        }
    }catch (err){
        console.log(err)
        return false
    }
}

exports.getSetChats = async ()=>{
    try{
        const res = await axios({
            method: 'get',
            url: '/api/v0/chatlist'
        });
        console.log(res)
        if (res.data.status === 'success'){
            const chatListContainer = document.getElementById('chatListContainer');
            if (chatListContainer === 'undefined'){
                return false;
            }
            if (typeof  res.data.data !== `object`){
                return true;
            }
            document.messageApp.chatList = {};
            for(let i = 0; res.data.data.length > i; i++){
                const fid = res.data.data[i].friend._id;
                const fphone = res.data.data[i].friend.phone;
                document.messageApp.chatList[fid] = res.data.data[i];
                // Setting chat list nam
                if(typeof document.messageApp.friendList[fphone] !== 'undefined' ) {
                    document.messageApp.chatList[res.data.data[i].friend._id].friend.name = document.messageApp.friendList[res.data.data[i].friend.phone].name;
                }
            }
            let html = '';
            console.log(document.messageApp.chatList);
            Object.entries(document.messageApp.chatList).forEach(obj=>{
                const [key, item] = obj;
                console.log(item);
                let str= '';
                if (item.unseen){
                    str = Items.chatListItemUnseen();
                    str = str.replace('%UNSEEN%', item.unseen);
                } else {
                    str = Items.chatListItemseen();
                }
                 str = str.replace('%MESSAGE%', item.message);
                 str = str.replace('%IMAGE%', item.friend.image);
                 str = str.replaceAll('%FRIENDID%', item.friend._id);
                if (typeof item.friend.name != "undefined") {
                     str = str.replace('%NAME%', item.friend.name);
                }else{
                    str = str.replace('%NAME%', item.friend.phone);
                }
                html += str;
            });
            chatListContainer.innerHTML = html;
            return true
        }
    }catch (err){
        console.log(err)
        return false
    }
}

exports.getSetMessageBySender = async ()=>{
    try{
            const friendList = document.getElementById('friendListContainer');
            const chatList = document.getElementById('chatListContainer');
            if (!friendList || !chatList){
                return false;
            }
            chatList.addEventListener('click', async (event)=>{
                const chatItem = getParentNode(event.target,'chatListItem-class');
                const friendId = chatItem.dataset.friendid;
                if (!friendId) return false;
                let openFriend = null;
                if (document.messageApp !== 'undefined' && document.messageApp.chatList[friendId] !== 'undefined'){
                    openFriend = document.messageApp.chatList[friendId];
                }
                document.messageApp['openFriend'] = openFriend;
                if(!openFriend){
                    return true;
                }
                const res = await axios({
                    method : 'POST',
                    url : '/api/v0/receive',
                    data : {sender:friendId}
                });
                console.log(res);
                if (res.data.status === 'success'){
                    // openFriend = document.messageApp.chatList[];
                    const chatBoxContainer = document.getElementById('chatBoxContainer');
                    let html = '';
                    console.log(openFriend)
                    let head = Items.chatBoxHeader().replace('%IMAGE%', openFriend.friend.image);
                    if (openFriend.friend.name !== 'undefined')openFriend.friend.name  = openFriend.friend.phone;
                    html += head.replace('%NAME%',openFriend.friend.name);
                    html += Items.chatBoxBody();
                    html += Items.chatBoxFooter();
                    chatBoxContainer.innerHTML = html;
                    const messageContainer = document.getElementById('messages');
                    if (!messageContainer) return false;
                    res.data.data.forEach((item, i)=>{
                        if((item.receiver === document.messageApp.profile._id)){
                            messageSetter.Message.add(item.message)
                        }else {
                            messageSetter.Message.add(item.message, 'outgoing-message');
                        }
                    });
                    await sendMessage();
                }
            }, false)
    }catch (err){
        console.log(err);
        return false;
    }
}

exports.getNewMessages = async ()=>{
    try {
        setInterval(async ()=>{
            const res = await axios({
                method : 'get',
                url : 'api/v0/newmessages'
            });
            // console.log(res)
            if (res.data.status === 'success'){
                if (!res.data.total) return true;
                document.messageApp.newMessages = res.data.data;
                await updateMessages();
            }
    }, 2000);
    }catch (err){
        console.log(err);
        return false;
    }
}

const  updateMessages = async ()=>{
    try{
            if (document.messageApp.newMessages !== 'undefined'){
                if (document.messageApp.openFriend){
                    for(let i = 0; document.messageApp.newMessages.length > i ; i++){
                        postMessageToBody(document.messageApp.newMessages)
                    }
                }

            }
    }catch(err){
        return false;
    }
}

const sendMessage = async () =>{
    try{
        const form = document.querySelector('.layout .content .chat .chat-footer form')
        if (!form) return false;
        console.log(form);
        form.addEventListener('submit', async (event)=>{
            event.preventDefault();
            console.log('kjhkh')
            const input = event.currentTarget.querySelector('input[type=text]');
            const message = input.value;
            if (!trim(message)) return input.focus();
            messageSetter.Message.add(message, 'outgoing-message');
            input.value  = '';
            console.log(document.messageApp.openFriend._id);
            const  res = await axios({
                method : 'POST',
                url : '/api/v0/send',
                data : { message , receiver : document.messageApp.openFriend._id}
                });
            console.log(res)
            if (res.data.status == 'success'){
                console.log('done');
            }
    }, false)
    // $(document).on('submit', '.layout .content .chat .chat-footer form', function (e) {
    //     e.preventDefault();
    //
    //     var input = $(this).find('input[type=text]');
    //     var message = input.val();
    //
    //     message = $.trim(message);
    //
    //     if (message) {
    //         SohoExamle.Message.add(message, 'outgoing-message');
    //         input.val('');
    //
    //         setTimeout(function () {
    //             SohoExamle.Message.add();
    //         }, 1000);
    //     } else {
    //         input.focus();
    //     }
    // });

    } catch (err){
        console.log(err.response.data)
        return false;
    }
}

// exports.addContact = async ()=>{
//     try{
//         const contacxtForm = document.getElementById('add-contact');
//         if (!contacxtForm) return false;
//         contacxtForm.addEventListener('submit', async (event)=>{
//             event.preventDefault();
//             const code = contacxtForm.querySelector('#code');
//             const number = contacxtForm.querySelector('#number');
//             const email = contacxtForm.querySelector('#email');
//             const name = contacxtForm.querySelector('#name');
//             if (!code ||!number || !name) return false;
//             const res = await axios({
//                 method: 'post',
//                 url : '/api/v0/addcontact',
//                 data : {
//                     code: code.value,
//                     name: name.value,
//                     number:number.value,
//                     email: email.value
//                 }
//             });
//             console.log(res);
//             if (res.data.status == 'success'){
//                 contacxtForm.innerHTML = `<div class="alert alert-info">Contact is ${res.data.operation}</div>`;
//             }
//         }, false);
//
//     } catch (err){
//         console.log(err.response.data);
//         return false;
//     }
// }

//###########################################################################
//###########################################################################
// class DataBase {
//     #profile = {};
//     #chatlist = {};
//     #newChats = [];
//
// }
// class AppManager {
//
// }