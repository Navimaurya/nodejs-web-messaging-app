const friendListItem = `<li class="list-group-item active" data-navigation-target="chats" data-friendId="%FRIENDID%">
                                <div>
                                    <figure class="avatar">
                                        <img src="http://slek.laborasyon.com/demos/default/dist/media/img/women_avatar5.jpg" class="rounded-circle" alt="image">
                                    </figure>
                                </div>
                                <div class="users-list-body">
                                    <div data-id="%FRIENID%">
                                        <h5>%NAME%</h5>
                                        <p class="font-italic">%NUMBER%</p>
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
                                </div>
                            </li>`;

const chatListItemSeen = ` <li class="list-group-item" data-friendId="%FRIENDID%">
                                <figure class="avatar" data-friendid="%FRIENDID%">
                                    <img src="%IMAGE%" class="rounded-circle" alt="image">
                                </figure>
                                <div class="users-list-body">
                                    <div class="friend-message" data-friendid="%FRIENDID%">
                                        <h5>%NAME%</h5>
                                        <p class="text-truncate font-italic">%MESSAGE%</p>
                                    </div>
                                    <div class="users-list-action">
                                        <small class="text-muted">03:41 PM</small>
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
                            </li>`;

const  chatListItemUnseen = `<li class="list-group-item chatListItem-class" data-friendId="%FRIENDID%">
                                <figure class="avatar avatar-state-success friend-profile-img" data-friendid="%FRIENDID%">
                                    <img src="%IMAGE%" class="rounded-circle" alt="image">
                                </figure>
                                <div class="users-list-body sender-message" data-friendid="%FRIENDID%">
                                    <div>
                                        <h5 class="text-primary">%NAME%</h5>
                                        <p>%MESSAGE%</p>
                                    </div>
                                    <div class="users-list-action">
                                        <div class="new-message-count">%UNSEEN%</div>
                                        <small class="text-primary">03:41 PM</small>
                                    </div>
                                </div>
                            </li>`

const chatBoxNoMessage = `<div class="no-message-container">
                        <div class="row mb-5">
                            <div class="col-md-4 offset-4">
                                <img src="http://slek.laborasyon.com/demos/default/dist/media/svg/undraw_empty_xct9.svg" class="img-fluid" alt="image">
                            </div>
                        </div>
                        <p class="lead">Select a chat to read messages</p>
                    </div>`;

const chatBoxHeader = `<div class="chat-header">
        <div class="chat-header-user">
            <figure class="avatar">
                <img src="%IMAGE%" class="rounded-circle" alt="image">
            </figure>
            <div>
                <h5>%NAME%</h5>
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
    </div>`;

const chatBoxBody = `<div class="chat-body" tabindex="1" style="overflow: hidden; outline: none; touch-action: none;"> 
                    <div class="messages" id="messages">
                        
                    </div>
                </div>`;

const unreadLable = '<div class="message-item messages-divider" data-label="1 message unread"></div>';

const chatBoxFooter = `<div class="chat-footer">
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
                </div>`;

const chatBoxCommingMessage = `<div class="message-item">
                            <div class="message-avatar">
                                <figure class="avatar">
                                    <img src="%IMAGE%" class="rounded-circle" alt="image">
                                </figure>
                                <div>
                                    <h5>%NAME%</h5>
                                    <div class="time">07:15 AM</div>
                                </div>
                            </div>
                            <div class="message-content">
                                %MESSAGE%
                            </div>
                        </div>`;

exports.chatBoxOutgoingMessage = `<div class="message-item outgoing-message">
                            <div class="message-avatar">
                                <figure class="avatar">
                                    <img src="%IMAGE%" class="rounded-circle" alt="image">
                                </figure>
                                <div>
                                    <h5>%NAME%</h5>
                                    <div class="time">10:50 AM <i class="ti-double-check text-info"></i></div>
                                </div>
                            </div>
                            <div class="message-content">
                                %MESSAGE%
                            </div>
                        </div>`;

class PageItems{
    friendListItem (){
        return friendListItem;
    }
    chatListItemseen(){
        return chatListItemSeen;
    }

    chatListItemUnseen() {
        return chatListItemUnseen;
    }
    chatBoxHeader(){
        return chatBoxHeader;
    }
    chatBoxBody(){
        return chatBoxBody;
    }
    chatBoxFooter(){
        return chatBoxFooter;
    }
    unreadLable(){
        return unreadLable;
    }
    chatBoxCommingMessage(){
        return chatBoxCommingMessage;
    }
}
module.exports = new PageItems();