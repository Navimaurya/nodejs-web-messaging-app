class Items{
    gatTime = (date) =>{
        try{
            date = new Date(date);
            const tDate = new Date()
            if (date.getFullYear() != tDate.getFullYear()) return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
            if (date.getMonth() != tDate.getMonth()) return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
            if(date.getDate() != tDate.getDate() && date.getDate() == tDate.getDate()-1) return "Yesterday";
            if (date.getDate() == tDate.getDate()) return date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
            return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
        } catch (err) {
            let x = new Date()
            return  x.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        }
    }
    // ${this.gatTime(data.delivered)}">${data.time}
    addFriendList = (data, type = null)=> {
        const friendBody = $('.sidebar-body #friendListContainer');
        if (!friendBody) return false;
        type = type ? 'avatar-state-success' : null;
        friendBody.append(`<li class="list-group-item chatListItem-class" data-navigation-target="chats" data-friend-id="${data.friend._id}">
                                <div>
                                    <figure class="avatar ${type}">
                                        <img src="${data.friend.image}" class="rounded-circle" alt="image">
                                    </figure>
                                </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>${data.name}</h5>
                                    <p>${data.friend.phone}</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
<!--                                        <div class="dropdown">-->
<!--                                            <a data-toggle="dropdown" href="#">-->
<!--                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>-->
<!--                                            </a>-->
<!--                                            <div class="dropdown-menu dropdown-menu-right">-->
<!--                                                <a href="#" class="dropdown-item">New chat</a>-->
<!--                                                <a href="#" data-navigation-target="contact-information" class="dropdown-item">Profile</a>-->
<!--                                                <div class="dropdown-divider"></div>-->
<!--                                                <a href="#" class="dropdown-item text-danger">Block</a>-->
<!--                                            </div>-->
<!--                                        </div>-->
                                    </div>
                                </div>
                            </div>
                        </li>`);
    }
    addChatlist = (data, type = null)=> {
        if (typeof data !== "object") return false;
        const chatBody = $('.sidebar-body #chatListContainer');
        if (!chatBody) return false;
        if (data.friend._id == data.receiver) {
            data.time = this.gatTime(data.sent);
        } else {
            data.time = this.gatTime(data.delivered);
        }

        if (data.friend.name == undefined) data.friend.name = data.friend.phone;
        chatBody.append(`<li class="list-group-item chatListItem-class" data-friend-id="${data.friend._id}">
                            <div>
                                <figure class="avatar">
                                    <img src="${data.friend.image}" class="rounded-circle" alt="image">
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>${data.friend.name}</h5>
                                    <p>${data.message}</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">${data.time}</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
<!--                                            <a data-toggle="dropdown" href="#">-->
<!--                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>-->
<!--                                            </a>-->
<!--                                            <div class="dropdown-menu dropdown-menu-right">-->
<!--                                                <a href="#" class="dropdown-item">Add to archive</a>-->
<!--                                                <div class="dropdown-divider"></div>-->
<!--                                                <a href="#" class="dropdown-item text-danger">Block</a>-->
<!--                                                <a href="#" class="dropdown-item text-danger">Delete</a>-->
<!--                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>`);
    }
    addToChat = (data, type = null)=> {
        if (typeof data !== "object") return false;
        const chatBody = $('.sidebar-body #chatListContainer');
        if (!chatBody) return false;
        const add = () => {
            data.time = this.gatTime(new Date());
            if (data.friend.name == undefined) data.friend.name = data.friend.phone;
            if (data.unseen){
                chatBody.prepend(`<li class="list-group-item chatListItem-class" data-friend-id="${data.friend._id}">
                                <div>
                                    <figure class="avatar">
                                        <img src="${data.friend.image}" class="rounded-circle" alt="image">
                                    </figure>
                                </div>
                            <div class="users-list-body">
                                <div>
                                    <h5 class="text-primary">${data.friend.name}</h5>
                                    <p>${data.message}</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="new-message-count">${data.unseen}</div>
                                    <small class="text-primary">${data.time}</small>
                                </div>
                            </div>
                        </li>`);
            }else {
                chatBody.prepend(`<li class="list-group-item chatListItem-class open-chat" data-friend-id="${data.friend._id}">
                            <div>
                                <figure class="avatar">
                                    <img src="${data.friend.image}" class="rounded-circle" alt="image">
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>${data.friend.name}</h5>
                                    <p>${data.message}</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">${data.time}</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information" class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>`);
            }
            return true;
        }
        for (let i=0; i < chatBody.children().length; i++){
            const child = chatBody.children()[i];
            if(child.dataset.frienId == data.friend._id){
                child.remove();
                return add();
            }
        }
        return add();
    }
    openChat = (data)=> {
        if (typeof data !== "object") return false;
        const chatBody = $('.content #chatBoxContainer');
        if (!chatBody) return false;
        // console.log(data)
        if (!data.friend.name) data.friend.name = data.friend.phone;
        chatBody.html('')
        //Head
        chatBody.append(`<div class="chat-header" style=" background: #ffffff;">
                <div class="chat-header-user">
                    <figure class="avatar">
                        <img src="${data.friend.image}" class="rounded-circle" alt="image">
                    </figure>
                    <div>
                        <h5>${data.friend.name}</h5>
                        <small class="text-success">
                            <i>writing...</i>
                        </small>
                    </div>
                </div>
                <div class="chat-header-action">
                    <ul class="list-inline">
                        <li class="list-inline-item d-xl-none d-inline">
                            <a href="#" class="btn btn-outline-light mobile-navigation-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </a>
                        </li>
                        <li class="list-inline-item" data-toggle="tooltip" title="" data-original-title="Voice call">
                            <a href="#" class="btn btn-outline-light text-success" data-toggle="modal" data-target="#call">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </a>
                        </li>
                        <li class="list-inline-item" data-toggle="tooltip" title="" data-original-title="Video call">
                            <a href="#" class="btn btn-outline-light text-warning" data-toggle="modal" data-target="#videoCall">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a href="#" class="btn btn-outline-light" data-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a href="#" data-navigation-target="contact-information" class="dropdown-item">Profile</a>
                                <a href="#" class="dropdown-item">Add to archive</a>
                                <a href="#" class="dropdown-item">Delete</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item text-danger">Block</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>`)
        //Body
        chatBody.append(`<div class="chat-body" style="position: relative">
                  <div class="dropHover" style="">
                    <div class="dropTextContainer"><h3 style="color: #283954b3;">Drag &amp; Drop</h3>
                    </div>
                  </div> 
                <div class="messages">
                </div>
            </div>`);
        //Footer
        chatBody.append(`<div class="chat-footer">
                <form>
                    <div>
                        <button class="btn btn-light mr-3" data-toggle="tooltip" title="" type="button" data-original-title="Emoji">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                        </button>
                    </div>
                    <input type="text" class="form-control" placeholder="Write a message.">
                    <div class="form-buttons">
                        <button class="btn btn-light" data-toggle="tooltip" title="" type="button" data-original-title="Add files">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                        </button>
                        <button class="btn btn-light d-sm-none d-block" data-toggle="tooltip" title="" type="button" data-original-title="Send a voice record">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        </button>
                        <button class="btn btn-primary" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </form>
            </div>`)
    }
    addMessage = (data, type=null, b=null)=>{
                const chat_body = $('.layout .content .chat .chat-body');
                if (chat_body.length > 0) {
                    $('.layout .content .chat .chat-body .messages').append(`<div class="message-item ` + type + `">
                        <div class="message-avatar">
                            <div>
                                <div class="time">14:50 PM  ${type == 'outgoing-message' ? '<i class="ti-check"></i>' : ''}  </div>
                            </div>
                        </div>
                        <div class="message-content">
                            ` + data.message + `
                        </div>
                    </div>`);
                    if (!b){
                        setTimeout(async function () {
                            chat_body.scrollTop(chat_body.get(0).scrollHeight, -1).niceScroll({
                                cursorcolor: 'rgba(66, 66, 66, 0.20)',
                                cursorwidth: "4px",
                                cursorborder: '0px'
                            }).resize();
                        }, 200);
                    }else{
                        setTimeout(async function () {
                            chat_body.scrollTop(chat_body.get(0).scrollHeight, -1).niceScroll({
                                cursorcolor: 'rgba(66, 66, 66, 0.20)',
                                cursorwidth: "4px",
                                cursorborder: '0px'
                            }).resize();
                        }, 5);
                    }
                //    Update messagein chat list;
                    let chatItem = $('.open-chat .users-list-body p');
                    if (chatItem.length){
                        chatItem[0].innerText = data.message;
                    }
                }
            }
    addContact = (data)=>{
        const friendBody = document.querySelector('.sidebar-body #friendListContainer');
        if (!friendBody) return false;
        const node = `<div class="profile">
                                <figure class="avatar">
                                    <img src="${data.friend.image}" class="rounded-circle" alt="image">
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>${data.name}</h5>
                                    <p>${data.friend.phone}</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information" class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        const li = document.createElement('li')
        li.setAttribute('class' ,"list-group-item chatListItem-class");
        li.setAttribute('data-navigation-target', 'chats');
        li.setAttribute('data-friend-id',`${data.friend._id}`);
        li.innerHTML = node;
        const fnd = document.querySelector(`#friendListContainer [data-friend-id~='${data.friend._id}']`);
        if (fnd) {fnd.remove();}
        let i = 0;
        do {
            const chield = friendBody.children[i];
            if (chield){
                    console.log(' I am executed');
                    if (chield.innerText >= data.name ){
                        friendBody.insertBefore(li, chield);
                        break;
                    }
                }else {
                friendBody.append(li);
                break;
            }
            i++
        }while (friendBody.children.length+1 > i);
        const chatFnd = document.querySelector(`#chatListContainer [data-friend-id~='${data.friend._id}']`);
        if (chatFnd){
            chatFnd.querySelector('h5').innerText = data.name;
        }
        return true;
    }
    profile = (data)=>{
        const contactInformation = document.getElementById('contact-information');
        if (!data || !contactInformation) return false;
        // data = {email: "ncmaurya99@gmail.com",
        // friend:{
        //     about: "Hey I am using chatX.",
        //      active: "2021-02-26T12:18:44.675Z",
        //      city: null,
        //      image: "http://localhost:3000/users/profile/default.jpg",
        //      phone: 7054468089,
        //      website: null,
        //     code : 91,
        //      _id: "6033d2ef03ff005fb0b8b759",
        // },
        // id: "6038d3f628fcf7c0744a1c20",
        // name: "Navneet Chandra Maurya",
        // user: "6033d2d403ff005fb0b8b758",
        // __v: 0,
        // _id: "6038d3f628fcf7c0744a1c20"
        //  };
        const node = `<header>
                        <span>Profile</span>
                        <ul class="list-inline">
                            <li class="list-inline-item">
                                <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </a>
                            </li>
                        </ul>
                    </header>
                    <div class="sidebar-body" style="overflow: hidden; outline: none; touch-action: none;" tabindex="6">
                        <div class="pl-4 pr-4">
                            <div class="text-center">
                                <figure class="avatar avatar-xl mb-4">
                                    <img src="${data.friend.image}" id="profileImage" class="rounded-circle" alt="image">
                                </figure>
                                <h5 class="mb-1" id="profileName">${data.name}</h5>
                                <small class="text-muted font-italic">Last seen: ${data.friend.active}</small>
                                <ul class="nav nav-tabs justify-content-center mt-5" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Media</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <p class="text-muted" id="profileAbout"></p>
                                    <div class="mt-4 mb-4">
                                        <h6>Phone</h6>
                                        <p class="text-muted" id="profileNumber">(+${data.friend.code}) ${data.friend.phone}</p>
                                    </div>
             ${data.friend.city ? `<div class="mt-4 mb-4">
                                        <h6>City</h6>
                                        <p class="text-muted" id="profileCity">${data.friend.city}</p>
                                    </div>`
                                : '<div></div>'}
             ${data.friend.city ? `<div class="mt-4 mb-4">
                                        <h6>Website</h6>
                                        <p class="text-muted" id="profileCity">${data.friend.website}</p>
                                    </div>`
                                : '<div></div>'}
<!--                                    <div class="mt-4 mb-4">-->
<!--                                        <h6 class="mb-3">Social media accounts</h6>-->
<!--                                        <ul class="list-inline social-links">-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-facebook" data-toggle="tooltip" title="" data-original-title="Facebook">-->
<!--                                                    <i class="fa fa-facebook"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-twitter" data-toggle="tooltip" title="" data-original-title="Twitter">-->
<!--                                                    <i class="fa fa-twitter"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-dribbble" data-toggle="tooltip" title="" data-original-title="Dribbble">-->
<!--                                                    <i class="fa fa-dribbble"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-whatsapp" data-toggle="tooltip" title="" data-original-title="Whatsapp">-->
<!--                                                    <i class="fa fa-whatsapp"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-linkedin" data-toggle="tooltip" title="" data-original-title="Linkedin">-->
<!--                                                    <i class="fa fa-linkedin"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-google" data-toggle="tooltip" title="" data-original-title="Google">-->
<!--                                                    <i class="fa fa-google"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-behance" data-toggle="tooltip" title="" data-original-title="Behance">-->
<!--                                                    <i class="fa fa-behance"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-instagram" data-toggle="tooltip" title="" data-original-title="Instagram">-->
<!--                                                    <i class="fa fa-instagram"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                        </ul>-->
<!--                                    </div>-->
<!--                                    <div class="mt-4 mb-4">-->
<!--                                        <h6 class="mb-3">Settings</h6>-->
<!--                                        <div class="form-group">-->
<!--                                            <div class="form-item custom-control custom-switch">-->
<!--                                                <input type="checkbox" class="custom-control-input" id="customSwitch11">-->
<!--                                                <label class="custom-control-label" for="customSwitch11">Block</label>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="form-group">-->
<!--                                            <div class="form-item custom-control custom-switch">-->
<!--                                                <input type="checkbox" class="custom-control-input" checked="" id="customSwitch12">-->
<!--                                                <label class="custom-control-label" for="customSwitch12">Mute</label>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="form-group">-->
<!--                                            <div class="form-item custom-control custom-switch">-->
<!--                                                <input type="checkbox" class="custom-control-input" id="customSwitch13">-->
<!--                                                <label class="custom-control-label" for="customSwitch13">Get-->
<!--                                                    notification</label>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <h6 class="mb-3 d-flex align-items-center justify-content-between">
                                        <span>Recent Files</span>
                                        <a href="#" class="btn btn-link small">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> Upload
                                        </a>
                                    </h6>
                                    <div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                                <a href="#">
                                                    <i class="fa fa-file-pdf-o text-danger mr-2"></i> report4221.pdf
                                                </a>
                                            </li>
                                            <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                                <a href="#">
                                                    <i class="fa fa-image text-muted mr-2"></i> avatar_image.png
                                                </a>
                                            </li>
                                            <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                                <a href="#">
                                                    <i class="fa fa-file-excel-o text-success mr-2"></i>
                                                    excel_report_file2020.xlsx
                                                </a>
                                            </li>
                                            <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                                <a href="#">
                                                    <i class="fa fa-file-text-o text-warning mr-2"></i> articles342133.txt
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        contactInformation.innerHTML = node;
        contactInformation.classList.add('active');
        return true;
    }
    me = (data)=>{
        const contactInformation = document.getElementById('contact-information');
        if (!data || !contactInformation) return false;
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
        console.log(data)
        const node = `<header>
                        <span>Profile</span>
                        <ul class="list-inline">
                            <li class="list-inline-item">
                                <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </a>
                            </li>
                        </ul>
                    </header>
                    <div class="sidebar-body" style="overflow: hidden; outline: none; touch-action: none;" tabindex="6">
                        <div class="pl-4 pr-4">
                            <div class="text-center">
                                <figure class="avatar avatar-xl mb-4">
                                    <img src="${data.image}" id="profileImage" class="rounded-circle" alt="image">
                                </figure>
                                <h5 class="mb-1" id="profileName">${data.name}</h5>
                                <small class="text-muted font-italic">Last seen: ${data.active}</small>
                                <ul class="nav nav-tabs justify-content-center mt-5" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Media</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <p class="text-muted" id="profileAbout"></p>
                                    <div class="mt-4 mb-4">
                                        <h6>Phone</h6>
                                        <p class="text-muted" id="profileNumber">(+${data.code}) ${data.phone}</p>
                                    </div>
             ${data.city ? `<div class="mt-4 mb-4">
                                        <h6>City</h6>
                                        <p class="text-muted" id="profileCity">${data.city}</p>
                                    </div>`
                                : '<div></div>'}
             ${data.city ? `<div class="mt-4 mb-4">
                                        <h6>Website</h6>
                                        <p class="text-muted" id="profileCity">${data.website}</p>
                                    </div>`
                                : '<div></div>'}
<!--                                    <div class="mt-4 mb-4">-->
<!--                                        <h6 class="mb-3">Social media accounts</h6>-->
<!--                                        <ul class="list-inline social-links">-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-facebook" data-toggle="tooltip" title="" data-original-title="Facebook">-->
<!--                                                    <i class="fa fa-facebook"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-twitter" data-toggle="tooltip" title="" data-original-title="Twitter">-->
<!--                                                    <i class="fa fa-twitter"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-dribbble" data-toggle="tooltip" title="" data-original-title="Dribbble">-->
<!--                                                    <i class="fa fa-dribbble"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-whatsapp" data-toggle="tooltip" title="" data-original-title="Whatsapp">-->
<!--                                                    <i class="fa fa-whatsapp"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-linkedin" data-toggle="tooltip" title="" data-original-title="Linkedin">-->
<!--                                                    <i class="fa fa-linkedin"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-google" data-toggle="tooltip" title="" data-original-title="Google">-->
<!--                                                    <i class="fa fa-google"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-behance" data-toggle="tooltip" title="" data-original-title="Behance">-->
<!--                                                    <i class="fa fa-behance"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                            <li class="list-inline-item">-->
<!--                                                <a href="#" class="btn btn-sm btn-floating btn-instagram" data-toggle="tooltip" title="" data-original-title="Instagram">-->
<!--                                                    <i class="fa fa-instagram"></i>-->
<!--                                                </a>-->
<!--                                            </li>-->
<!--                                        </ul>-->
<!--                                    </div>-->
<!--                                    <div class="mt-4 mb-4">-->
<!--                                        <h6 class="mb-3">Settings</h6>-->
<!--                                        <div class="form-group">-->
<!--                                            <div class="form-item custom-control custom-switch">-->
<!--                                                <input type="checkbox" class="custom-control-input" id="customSwitch11">-->
<!--                                                <label class="custom-control-label" for="customSwitch11">Block</label>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="form-group">-->
<!--                                            <div class="form-item custom-control custom-switch">-->
<!--                                                <input type="checkbox" class="custom-control-input" checked="" id="customSwitch12">-->
<!--                                                <label class="custom-control-label" for="customSwitch12">Mute</label>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                        <div class="form-group">-->
<!--                                            <div class="form-item custom-control custom-switch">-->
<!--                                                <input type="checkbox" class="custom-control-input" id="customSwitch13">-->
<!--                                                <label class="custom-control-label" for="customSwitch13">Get-->
<!--                                                    notification</label>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <h6 class="mb-3 d-flex align-items-center justify-content-between">
                                        <span>Recent Files</span>
                                        <a href="#" class="btn btn-link small">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> Upload
                                        </a>
                                    </h6>
                                    <div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                                <a href="#">
                                                    <i class="fa fa-file-pdf-o text-danger mr-2"></i> report4221.pdf
                                                </a>
                                            </li>
                                            <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                                <a href="#">
                                                    <i class="fa fa-image text-muted mr-2"></i> avatar_image.png
                                                </a>
                                            </li>
                                            <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                                <a href="#">
                                                    <i class="fa fa-file-excel-o text-success mr-2"></i>
                                                    excel_report_file2020.xlsx
                                                </a>
                                            </li>
                                            <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                                <a href="#">
                                                    <i class="fa fa-file-text-o text-warning mr-2"></i> articles342133.txt
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        contactInformation.innerHTML = node;
        contactInformation.classList.add('active');
        return true;
    }
}
module.exports = new Items();