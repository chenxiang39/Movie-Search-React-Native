import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const storage = new Storage({
  // max size
  size: 5000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true, 
});
const JSONTransfer = (command,OBJ)=>{
    if(command == 'save'){
        return JSON.stringify(OBJ);
    }
    else if(command == 'get'){
        return JSON.parse(OBJ);
    }
}
const createArr = (id,type,url) =>{
    let curArr = [];
    let curOBJ = {
        id : id,
        type : type,
        url : url
    }
    curArr.push(curOBJ);
    storage.save({
        key:'watchlist',
        data: JSONTransfer('save',curArr)
    })
}
const clearAllItem = () =>{
    storage.remove({
        key: 'watchlist',
    });
}
const clearItem = async (id,type,url) =>{
    let curArr = await storage.load({key:'watchlist'});
    curArr = JSONTransfer('get',curArr);
    for(let i = 0; i < curArr.length; i++){
        if(curArr[i].id === id && curArr[i].type === type){
            curArr.splice(i,1);
        }
    }
    await storage.save({
        key:'watchlist',
        data: JSONTransfer('save',curArr)
    })
    return;
}
const checkContainItemArr = async (dataArr) =>{
    let curArr = await storage.load({key:'watchlist'});
    curArr = JSONTransfer('get',curArr);
    let data = [];
    let flag = false; 
    if(dataArr.length !== 0 && !!curArr){
        for(let i = 0; i < dataArr.length; i++){
            for(let j = 0; j < curArr.length; j++){
                if(dataArr[i].id === curArr[j].id && dataArr[i].type === curArr[j].type){
                    data.push(true);
                    flag = true;
                    break;
                }
            } 
            if(!flag){
                data.push(false);
            }
            flag = false;
        }
    }
    return data;
}
const checkContainItem = async (id,type,url) =>{
    try{
        let curArr = await storage.load({key:'watchlist'});
        curArr = JSONTransfer('get',curArr);
        for(let i = 0; i < curArr.length; i++){
            if(curArr[i].id === id && curArr[i].type === type){
                return true;
            }
        }
        return false;
    }catch(e){
        return false;
    }
}
const checkItemInternal = (id,type,url, curArr) =>{
    for(let i = 0; i < curArr.length; i++){
        if(curArr[i].id === id && curArr[i].type === type){
            return true;
        }
    }
    return false;
}
const moveItemTo = async (id, type, url, index) =>{
    try{
        let curArr = await storage.load({key:'watchlist'});
        curArr = JSONTransfer('get',curArr);
        for(let i = 0; i < curArr.length; i++){
            if(curArr[i].id === id){
                let temp = {
                    id: curArr[index].id,
                    type: curArr[index].type,
                    url : curArr[index].url,
                }
                curArr[index].id = id;
                curArr[index].type = type;
                curArr[index].url = url;
                curArr[i] = temp;
                
                await storage.save({
                    key:'watchlist',
                    data: JSONTransfer('save',curArr)
                })
                return;
            }
        }
    }catch(e){
        createArr(id,type,url);
    }
}
const addItemToTail = async (id,type,url) => {
    try{
        let curArr = await storage.load({key:'watchlist'});
        curArr = JSONTransfer('get',curArr);
        if(checkItemInternal(id,type,url,curArr)){
            
        }
        else{
            let curOBJ = {
                id : id,
                type : type,
                url : url
            }
            curArr.push(curOBJ);
            storage.save({
                key:'watchlist',
                data: JSONTransfer('save',curArr)
            })
        }
    }catch(e){
        alert(e);
        createArr(id,type,url);
    }
}

const loadItem = async () =>{
    try{
        let curArr = await storage.load({key:'watchlist'});
        curArr = JSONTransfer('get',curArr);
        return curArr;
    }catch(e){
        let curArr = [];
        return curArr;
    }
}
export default watchlistLocalStorage = {
    checkContainItem : checkContainItem,
    checkContainItemArr : checkContainItemArr,
    addItemToTail : addItemToTail,
    moveItemTo:moveItemTo,
    clearAllItem : clearAllItem,
    clearItem:clearItem,
    loadItem:loadItem
}