import axios from "axios";
import Items from "./Items";
import UILocalDb from './UILocalDb';
import * as events from "events";
import SynceFromServer from "./SynceFromServer";
import UiLocalDb from "./UILocalDb";
class StartUI{
    startApp  = async ()=>{
        try {
            // Clear All database
            // await UILocalDb.cleareAllData();
            //Loading user content first time or regreshing contentd
            await SynceFromServer.start();
            await UiLocalDb.friendList();
            await UiLocalDb.chatList();
            this.me();
            await UiLocalDb._updateMessage();
            this.openChat();
            this.addContact();
            return true;
        }catch (err){
            console.log(err, 'From StartUI');
            return false;
        }
    }
    getParentNode = (element, target)=>{
            for(; element && element !== document; element = element.parentNode){
                if(element.matches('.'+target))   return element;
            }
            return null
    }
    //Open chat contain open profil funtion also
    openChat = () =>{
        const friendList = document.querySelector('.sidebar-body #friendListContainer');
        const chatList = document.querySelector('.sidebar-body #chatListContainer');
        if (!friendList || !chatList) return false;
        const dragDrop = ()=>{
            const container = document.querySelector('.chat-body');
            if (!container) return false;
            const newNode = document.createElement("div");
            newNode.className = 'dropHover';
            container.style.position = 'relative';
            container.append(newNode);
            // container.setAttribute('draggable', true);

            console.log('called')
            container.addEventListener('dragover', (event)=>{
                event.preventDefault()
                console.log('start');
            });
            container.addEventListener('dragenter', (event)=>{
                event.preventDefault();
                console.log('end');
            });
            container.addEventListener('dragleave', (event)=>{
                event.preventDefault()
                console.log('end');
            });
            container.addEventListener('drop', (event)=>{
                event.preventDefault();
                console.log(event.dataTransfer.files[0])
                const file = event.dataTransfer.files[0];
                if(file.type.match(/^image/)){
                    console.log("image");
                }
                if(file.type.match(/^video/)){
                    console.log("video");
                }
                if(file.type.match(/pdf$/)){
                    console.log("pdf");
                }



            });
            // const isLink = event.dataTransfer.types.includes("text/uri-list");
            // if (isLink) {
            //     event.preventDefault();
            // }
        }
        const chatOpener = async (event)=>{
            try{
                const chatItem = this.getParentNode(event.target,'chatListItem-class');
                if (!chatItem) return false;
                const friendId = chatItem.dataset.friendId;
                if (!friendId) return false;
                await UILocalDb.openChat(friendId);
                this.senMessage(friendId);
                $('.layout .content .sidebar-group').removeClass('mobile-open');
                chatItem.classList.add("open-chat");
                dragDrop();
                this.openProfile();
                return true
            }catch (err){
                console.log(err);
                return false
            }
        }

        chatList.addEventListener('click', async (event) =>{
            const res = await chatOpener(event);
            if (res){
                $("#chatListContainer").find("li.open-chat").removeClass("open-chat");
            }

        } , false);
        friendList.addEventListener('click', async (event) =>{
            // const chatItem = this.getParentNode(event.target,'chatListItem-class');
            await chatOpener(event)
        } , false);
    }
    senMessage = (receiver) =>{
        const messageInput = document.querySelector('.chat-footer form');
        if (!messageInput) return true;
        messageInput.addEventListener('submit', async (event)=>{
            event.preventDefault();
            const form = event.currentTarget;
            const message = form.querySelector('[type=text]');
            if (!message) return true;
            if (!message.value.trim()) return true;
            Items.addMessage({message : message.value}, 'outgoing-message');
            await this.addFrineToChatList(receiver, message.value);
            const  res = await UILocalDb.sendMessage({message: message.value, receiver});
            message.value = null;
        }, false);
    }
    addFrineToChatList = async (friendId, message)=>{
        const chatTags = document.querySelectorAll('#chatListContainer .chatListItem-class ');
        const chatContainer = document.querySelector('.sidebar-body #chatListContainer')
        if (!chatTags || !chatContainer) return false;
        for (let i=0; i < chatTags.length; i++){
            const profileTag = chatTags[i];
            if(profileTag.dataset.friendId == friendId){
                profileTag.remove();
                break;
            }
        }
        await UILocalDb.addToChat(friendId, message);
    }
    addContact = ()=>{
            const contacxtForm = document.getElementById('add-contact');
            if (!contacxtForm) return false;
            contacxtForm.addEventListener('submit', async (event)=>{
                event.preventDefault();
                const code = contacxtForm.querySelector('#code');
                const number = contacxtForm.querySelector('#number');
                const email = contacxtForm.querySelector('#email');
                const name = contacxtForm.querySelector('#name');
                if (!code ||!number || !name) return false;
                if (number.value.toString().length != 10){
                    const div = document.createElement('div');
                    div.setAttribute('class','alert alert-danger text-center' );
                    div.innerText = "Please provide a valid number.";
                    contacxtForm.prepend(div);
                    setTimeout(()=>{contacxtForm.children[0].remove()}, 4000);
                    return false;
                }
                const data = await UiLocalDb.addContact({code : code.value.trim(), number : number.value, name: name.value.trim(), email : email.value.trim()});
                setTimeout(()=>{document.querySelector('#addFriends .close').click()},3000);
                if (!data) return contacxtForm.innerHTML = `<div class="alert alert-danger text-center">Operation failed<div>`;
                contacxtForm.innerHTML = `<div class="alert alert-success text-center">Your friend <b>${data.data.name}</b> ${data.operation}.<div>`;
            }, false);
    }
    openProfile = ()=>{
        const user = document.querySelector('.chat-header-user');
        if (!user) return false;
        user.style.cursor = 'pointer';
        user.addEventListener('click', async (event) =>{
            console.log('clicked')
            const friend =  await UiLocalDb.openProfile();
            if (!friend) return null;
            Items.profile(friend);
            $('.layout .content .sidebar-group').removeClass('mobile-open');
            return true;
        } , false);
    }
    me = ()=> {
        const meDoc = document.getElementById('me');
        if (!meDoc) return false;
        meDoc.addEventListener('click',()=>{
            console.log("clicked")
            UiLocalDb.me();
        }, false);

    }
}
module.exports = new StartUI();