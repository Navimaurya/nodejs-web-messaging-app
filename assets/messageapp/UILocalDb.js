import Items from './Items';
import DB from './DataBase';
import SyncFromServer from './SynceFromServer';
import axios from "axios";


class UILocalDb{
    OPENEDFRIEND = null;
    // cleareAllData = async ()=>{
    //     console.log('cleare all called');
    //     await DB.clareAllObjectStore();
    // }
    friendList = async ()=>{
        try {
            const data = await DB.readAll('friendList', 'friendList');
            console.log(data)
            if (!(data.length > 0)) return false;
            data.forEach((item, i) =>{
                Items.addFriendList(item);
            });
        } catch (err){
            console.log(err)
            return false
        }
    }
    chatList = async ()=>{
        try {
            const data = await DB.readAll('chatList', 'chatList');
            if (!(data.length > 0)) return false;
            await Promise.all(data.map(async (item, i)=>{
                let fnd = await DB.read('friendList', 'friendList', data[i].friend._id);
                if (fnd) data[i].friend.name = fnd.name;
                fnd = null
            }));
            data.forEach((item, i) =>{
                Items.addChatlist(item);
            });
        } catch (err){
            console.log(err)
            return false
        }
    }
    openChat = async (friendId = null) => {
        try {
            let data, friend;
            if (!friendId) return false;
            // if (friendId == this.OPENEDFRIEND) return true;
            data = await DB.read('chatList', 'chatList', friendId);
            friend = await DB.read('friendList', 'friendList', friendId);
            if (data){
                if (friend) data.friend.name = friend.name;
                data.unseen = 0;
                await DB.update('chatList', 'chatList', data);
            } else {
                friend.friend.name = friend.name
                data = friend;
            }
            this.OPENEDFRIEND = friendId;
            await Items.openChat(data);
            let messages = await DB.read('messages', 'messages', friendId);
            if (!messages) messages = await SyncFromServer.messageOfFriend(friendId);
            if (!messages) return true;
            messages.data.forEach((item, i)=>{
                if(item.sender._id == friendId){
                    Items.addMessage(item, null, true);
                }else{
                    Items.addMessage(item, 'outgoing-message' , true);
                }
            });
        } catch (err){
            console.log(err)
            return false
        }
    }
    me =  ()=>{
        // about: "Hey I am using chatX."
        // active: "2021-03-06T09:00:02.072Z"
        // city: null
        // code: 91
        // createdAt: "2021-02-22T15:42:41.170Z"
        // image: "http://localhost:3000/users/profile/default.jpg"
        // name: "Mr. User"
        // phone: 7054468089
        // role: "user"
        // website: null
        // __v: 0
        // _id: "6033d2ef03ff005fb0b8b759"
        Items.me(window.user);
    }
    sendMessage = async (data) =>{
        if (typeof data != 'object') return false;
        try{
            const res = await SyncFromServer.sendMessage(data);
            let me = await DB.read('messages', 'messages', data.receiver);
            // console.log(me);
            if (me){
                me.data.push(res)
            } else {
                me = {_id: data.receiver, data : [res]}
            }
            // console.log(me)
            await DB.update('messages', 'messages', me);
            return res;
        } catch (err){console.log(err);}
    }
    addToChat = async (friendId, message, unseen = null)=> {

        let data = await DB.read('chatList', 'chatList', friendId);
        const d = {friend : {}};
        if (!data){
            const fnd = await DB.read('friendList', 'friendList', friendId);
            if (!fnd) return false;
            d.friend.name = fnd.name;
            d.friend.image = fnd.friend.image;
            d.friend.phone = fnd.friend.phone;
            d.friend._id = fnd.friend._id;
            d.message = message;
            d._id = fnd.friend._id;
            d.sender = fnd.user;
            d.receiver = friendId;
            data = d;
        } else {
                let fnd = await DB.read('friendList', 'friendList', data.friend._id);
                if (fnd) data.friend.name = fnd.name;
        }
        data.message = message;
        await DB.update('chatList', 'chatList', data);
        if (unseen) data.unseen = unseen;
        Items.addToChat(data);
    }

    addToChatnew = async (friendId, message)=> {
        // let data = await DB.read('chatList', 'chatList', friendId);
        const data = {friend : {}};
        let unseen = null;
        // if (!data){
        const fnd = await DB.read('friendList', 'friendList', friendId);
        if (fnd){
            data.friend.name    = fnd.name;
            data.friend.image   = fnd.friend.image;
            data.friend.phone   = fnd.friend.phone;
            data.friend._id     = fnd.friend._id;
            data.message        = message;
            data._id            = fnd.friend._id;
            data.sender         = fnd.user;
            data.receiver       = friendId;
        }else{
            const message = await DB.read('messages', 'messages', friendId);
            if (!message)return true;
            data.friend.name    = message.data[message.data.length-1].sender.phone;
            data.friend.image   = '/users/profile/'+ message.data[message.data.length-1].sender.image;
            data.friend.phone   = message.data[message.data.length-1].sender.phone;
            data.friend._id     = message.data[message.data.length-1].sender._id;
            data.message        = message.data[message.data.length-1].message;
            data._id            = message.data[message.data.length-1].sender._id;
            data.sender         = message.data[message.data.length-1].sender._id;
            data.receiver       = message.data[message.data.length-1].receiver;
            unseen              = message.data.length;
        }
        // } else {
        //     let fnd = await DB.read('friendList', 'friendList', data.friend._id);
        //     if (fnd) data.friend.name = fnd.name;
        // }
        data.message = message;
        data.unseen = unseen;
        await DB.update('chatList', 'chatList', data);
        Items.addToChat(data);
    }
    _updateMessage = async ()=>{
        try {
            window.intervalId = setInterval(async ()=>{
                const data = await SyncFromServer.newMessages();
                if (typeof data != 'object' || !data.total) return false;
                // console.log(data)
                let newFriends = {};
                await Promise.all(data.data.map(async (item)=>{
                    let localMessage = await DB.read('messages', 'messages', item.sender._id);
                    if (localMessage){
                        localMessage.data.push(item)
                    } else {
                        localMessage = {_id: item.sender._id, data : [item]}
                    }
                    await DB.update('messages', 'messages', localMessage);
                    if (item.sender._id == this.OPENEDFRIEND) {
                        Items.addMessage(item);
                    } else {
                        if(newFriends[item.sender._id]){
                            // newFriends[localMessage._id].data.push(item);
                            newFriends[item.sender._id].message = item.message;
                            newFriends[item.sender._id].unseen += 1;
                        }else{
                            newFriends[item.sender._id] = {};
                            newFriends[item.sender._id].message = item.message;
                            newFriends[item.sender._id].unseen = 1;
                        }
                    }
                }));
                console.log(newFriends, "New chat");
                await Promise.all(Object.keys(newFriends).map(async (item, i)=>{
                    // console.log(newFriends[item].message, item);
                    const chatList = await DB.read('chatList', 'chatList', item);
                    if (chatList){
                        const chatTags = document.querySelectorAll('#chatListContainer .chatListItem-class ');
                        const chatContainer = document.querySelector('.sidebar-body #chatListContainer')
                        console.log(chatTags)
                        if (chatTags) {
                            for (let i=0; i < chatTags.length; i++){

                                const profileTag = chatTags[i];
                                if(profileTag.dataset.friendId === item){
                                    profileTag.remove();
                                    break;
                                }
                            }
                        }
                        await this.addToChat(item, newFriends[item].message, chatList.unseen);
                    } else {

                        await this.addToChatnew(item, newFriends[item].message)
                    }
                }));
            }, 2000);

        }catch (e) {
            // console.log(e)
            // console.log(e.Error.statusCode);
            return false;
        }
    }
    addContact = async (contact) =>{
        try {
            if (!contact) return false;
            const res = await SyncFromServer.addContact(contact);
            if (res.status == 'success'){
                Items.addContact(res.data);
                return res;
            }
        }catch (e){
            console.log(e)
            return null;
        }
    }

    openProfile = async (friendId = null)=> {
       return new Promise(async (res, rej)=>{
           if (!friendId) friendId = this.OPENEDFRIEND;
           try{
               const friend = await DB.read('friendList', 'friendList', friendId);
               if (friend){
                   return res(friend);
               }
               return res(null);
           }catch (e) {
               rej(e);
           }
       });
    }
}
module.exports = new UILocalDb();