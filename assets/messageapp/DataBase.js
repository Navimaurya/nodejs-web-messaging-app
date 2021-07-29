class DataBase{
    DB = null;
    connect = ()=>{
            return new Promise(function(resolve, reject) {
                const con = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                const version = 1;
                if (con){
                    const req = con.open("App", version);
                    req.onerror = function(event) {
                        reject(Error(event));
                    };
                    req.onupgradeneeded = async function(event) {

                        console.log('OnUpgrade Call')
                        // Save the IDBDatabase interface
                        let db = event.target.result;
                        // Create an objectStore for this database
                        db.createObjectStore("profile", { keyPath: "_id" });
                        // db.createObjectStore("openedChat", { keyPath: "friend._id" });

                        const chl = db.createObjectStore("chatList", { keyPath: "_id" });
                        chl.createIndex('phone', 'friend.phone', {unique : true});

                        const fnd = db.createObjectStore("friendList", { keyPath: "friend._id" });
                        fnd.createIndex('phone', 'friend.phone', {unique : true});

                        db.createObjectStore("messages", { keyPath: "_id" });
                        db.createObjectStore("newMessages", { keyPath: "_id" });

                        resolve(db);
                    };
                    req.onsuccess = () =>{
                        console.log("OnSuccess call")
                        let dataBase = req.result;
                        dataBase.onversionchange = function() {dataBase.close();alert("Please reload the App") };
                        resolve(dataBase);
                    }
                }
            })
    }
    start = async () => {
        try{
            return await this.connect()
        }catch (err){
            console.log(err);
        }
    }
    add = async (transaction, objectStore, data)=>{
        try{
            if(typeof data != 'object') return Error('Data should be Array.');
            if (typeof this.DB != 'undefined')  this.DB = await this.start();
            for (let i = 0; i < data.length; i++) {
                let req = this.DB.transaction([transaction], "readwrite")
                    .objectStore(objectStore)
                    .add(data[i]);
                req.onerror = () => {
                    return Error("faild");
                }
            }
            return true;
        } catch (err){
            return 0 ;
        }

    }
    read = async (transaction, objectStore, key, index = null)=>{
        try{
            return new Promise (async (res, rej) =>{
                if (!this.DB)  this.DB = await this.start();
                let req;
                if (index){
                    req = this.DB.transaction([transaction]).objectStore(objectStore).index(index).get(key);
                }else {
                    req = this.DB.transaction([transaction]).objectStore(objectStore).get(key);
                }
                req.onerror = function(event) {
                    return rej(Error('Unable to find data in database'));
                };
                req.onsuccess = function(event) {
                    if (!req.result) return res(null);
                    return res(req.result);
                };
            });
        }catch (e) {
            return 0;
        }
    }
    readAll = async (transaction, objectStore)=>{
        try {
            return new Promise(async (resolve, reject)=>{
                if (!this.DB)  this.DB = await this.start();
                const req = this.DB.transaction(transaction).objectStore(objectStore);
                let data = [];
                req.openCursor().onsuccess = function(event) {
                    const cursor = event.target.result;
                    if (cursor) {
                        data.push(cursor.value)
                        cursor.continue();
                    } else {
                        return resolve(data);
                    }
                }
            });
        }catch (e) {
            return 0;
        }
    }
    update = async(transaction, objectStore, data) =>{
        try{
            if(typeof data != 'object') return Error('Data should be Array.');
            console.log(data)
            if (typeof this.DB != 'undefined')  this.DB = await this.start();
            let req = this.DB.transaction([transaction], "readwrite")
                .objectStore(objectStore)
                .put(data);
            req.onerror = () => {
                return Error("faild");
            }
            // req.onsuccess(()=>{
            //     return true;
            // });
        }catch (e) {
            console.log(e)
            return 0;
        }

    }
    updateMany = async(transaction, objectStore, data ) =>{
        if(typeof data != 'object') return Error('Data should be Array.');
        console.log(data)
        if (typeof this.DB != 'undefined')  this.DB = await this.start();
        for (let i = 0; i < data.length; i++) {
            const res = this.DB.transaction([transaction], "readwrite")
                .objectStore(objectStore)
                .put(data[i]);
            res.onerror = () => {
                return Error("faild");
            }
        }
        return true;
    }
    remove = async (transaction, objectStore, key) => {
        return new Promise(async (res, rej) =>{
            if (!this.DB)  this.DB = await this.start();
            const req = this.DB.transaction([transaction], "readwrite")
                .objectStore(objectStore)
                .delete(key);

            req.onsuccess = function(event) {
                return res(true);
            };
            req.onerror = function (evnt){
                return rej(false);
            }
        });
    }
    clear = async (transaction, objectStore,) => {
        console.log('clear is called');
        return new Promise(async (res, rej) =>{
            if (!this.DB)  this.DB = await this.start();
            const req = this.DB.transaction([transaction], "readwrite")
                .objectStore(objectStore)
                .clear();
            req.onsuccess = function(event) {
                return res(true);
            };
            req.onerror = function (evnt){
                return rej(false);
            }
        });
    }

    clearAllObjectStore = async ()=>{
        return new Promise(async (res, rej) =>{
            if (!this.DB)  this.DB = await this.start();
            let req = this.DB.transaction(['profile'], "readwrite").objectStore("profile").clear();
            req = this.DB.transaction(['chatList'], "readwrite").objectStore("chatList").clear();
            req = this.DB.transaction(['friendList'], "readwrite").objectStore("friendList").clear();
            req = this.DB.transaction(['messages'], "readwrite").objectStore("messages").clear();
            req = this.DB.transaction(['newMessages'], "readwrite").objectStore("newMessages").clear();
            req.onsuccess = function (){
                return res(req);
            }
            req.onerror = function (){
                return rej(false);
            }
        });
    }
}
module.exports = new DataBase;