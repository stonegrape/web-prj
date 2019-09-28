// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');
//create an instance of a db object for us to store the open database in
let db;
//window.onload -- start
window.onload = function () {
    //open our database; it is created if it doesn't already exist
    //create a request to open version 1 of a database called notes
    //创建一个变量request 打开notes(数据库)的 1 版本
    //database operations are asynchronous
    let request = window.indexedDB.open('notes', 1);
    //返回请求失败
    request.onerror = function () {
        console.log('database filed to open');
    };
    //返回请求成功
    request.onsuccess = function () {
        console.log('database opend successfully');
        db = request.result;
        //run the displayData() function to display the notes already in the IDB
        displayData();
    };
    //1.没有设置数据库或者使用更大的版本号（比现在的数据库版本号大）
    request.onupgradeneeded = function (e) {
        let db = e.target.result;
        let objectStore = db.createObjectStore('notes', {keyPath: 'id', autoIncrement:true}); 
        objectStore.createIndex('title', 'title', {unique:false});
        objectStore.createIndex('body', 'body', {unique:false});
        console.log('Database setup complete');
        /*向数据库中添加记录，each one will be repersented as an object 
        {
            title: "Buy milk",
            body:  "Need both cows milk adn soya.",
            id: 8
        }
        */
    };
    form.onsubmit = addData;
    function addData(e) {
        //prevent default - we don't want the form to submit in the conventional way 
        e.prevetnDefault();
        let newItem = { tilte: titleInput.value, body: bodyInput.value };
        let transaction = db.transaction(['notes'], 'readwrite');
        let objectStore = transaction.objectStore('notes');
        var request = objectStore.add(newItem);
        request.onsuccess = function () {       
            titleInput.value = '';
            bodyInput.value = '';            
        };
        transaction.oncomplete = function () {
            console.log('Transaction completed: database modification finished.');
            displayData();
        };
        transaction.onerror = function () {
            console.log('transaction not opened due to error');
        };
    }
    function displayData() {
        //清空<ul>元素的内容，填充新内容
        while(list.firstChild) {
            list.removeChild(list.firstChild);
        }
        let objectStore = db.transaction('notes').objectStore('notes');
        //使用IDBObjectStore.openCursor()方法打开对游标的请求
        objectStore.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;
            if(cursor) {
                let listItem = document.createElement('li');
                let h3 = document.createElement('h3');
                let para = document.createElement('p');
                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(list);
                h3.textContent = cursor.value.title;
                para.textContent = cursor.value.body;
                listItem.setAttribute('data-note-id', cursor.value.id);
                let deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'Delete';
                deleteBtn.onclick = deleteItem;
                //if there is another record to iterate to, this causes it to be inserted into the page 
                //and the contuine is run again,and so on.
                cursor.continue();
            }else {
                if(!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'no notes stored';
                    list.appendChild(listItem);
                }
                console.log('notes all display');
            }
        };
    }

    function deleteItem(e) {
        let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));
        //open a database transaction
        let transaction = db.transaction(['notes'], 'readwrite');
        let objectStore = transaction.objectStore('notes');
        let request = objectStore.delete(noteId);
        transaction.oncomplete = function () {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            console.log('Note ' + noteId + 'deleted.');
            if (!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No notes stored.';
                list.appendChild(listItem);
            }
        };
    }
};
