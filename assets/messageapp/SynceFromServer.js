import axios from "axios";
import DB from './DataBase';

class Serverindexdb{
    start = async ()=>{
        try{
            // this.#DB = await dataBaseInit();
            await DB.clearAllObjectStore();
            await this.profile();
            await this.setFriendList();
            await this.setChatList();
            await this.messageOfFriend();
            // await this.newMessages();
        }catch (err){console.log(err)}
    }
    profile = async ()=>{
        try{
            const res = await axios({
                method:"GET",
                url : '/api/v0/me'
            });
            if (res.data.status === 'success'){
                console.log(res)
                window.user = res.data.data;
                // await DB.add('profile', 'profile', [res.data.data]);
            }
        }catch (err){
            window.user = null;
            console.log(err)
        }
    }
    setFriendList = async ()=>{
        try{
            const res = await axios({
                method:"GET",
                url : '/api/v0/getfriends'
            });
            if (res.data.status === 'success'){
                console.log(res)
                await DB.clear('friendList', 'friendList');
                await DB.add('friendList', 'friendList', res.data.data);
            }
        }catch (err){
            console.log(err)
        }
    }
    setChatList = async ()=>{
        try{
            const res = await axios({
                method:"GET",
                url : '/api/v0/chatlist'
            });
            if (res.data.status === 'success'){
                console.log(res)
                await DB.clear('chatList', 'chatList');
                if (res.data.total) await DB.add('chatList', 'chatList', res.data.data);
            }
        }catch (err){
            console.log(err)
        }
    }
    newMessages = async ()=>{
        return new Promise(async (resolve, rej)=>{
            try{
                const res = await axios({
                    method:"GET",
                    url : '/api/v0/newmessages'
                });
                if (res.data.status === 'success'){
                    // console.log(res.data.data);
                    if (!res.data.total) return true;
                    await DB.updateMany('newMessages', 'newMessages', res.data.data);
                    return resolve(res.data);
                }
            }catch (err){
                clearInterval(window.intervalId);
                return rej(err.response.data);
            }
        });
    }
    messageOfFriend = async (sender = null)=>{
        if (!sender) return true;
        try{
            const res = await axios({
                method:"POST",
                url : '/api/v0/receive',
                data:{
                    sender
                }
            });
            if (res.data.status === 'success'){
                const data = {_id : sender, data :  res.data.data};
                await DB.add('messages', 'messages', [data]);
                return data;
            }
        }catch (err){
            console.log(err)
        }
    }
    sendMessage = async (data)=>{
        try{
            const  res = await axios({
                method : 'POST',
                url : '/api/v0/send',
                data : { message: data.message , receiver : data.receiver}
            });
            if (res.data.status == 'success'){
                return res.data.data;
            }
        }catch (e) {
            console.log(e)
            console.log(e.response.data);
            return 0;
        }

    }
    addContact = async (contact)=>{
        try {
            const res = await axios({
                method: 'post',
                url : '/api/v0/addcontact',
                data : {
                    code: contact.code,
                    name: contact.name,
                    number: contact.number,
                    email: contact.email
                }
            });
            if (res.data.status == 'success'){
                await DB.update('friendList', 'friendList', res.data.data);
                return res.data;
            }
        } catch (e) {
            return e.response.data;
        }
    }
}

module.exports  = new Serverindexdb;