import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const storage = new Storage({
  // max size
  size: 5000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true, 
});

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
        data: JSON.stringify(curArr)
    })
}
const clearAllItem = () =>{
    storage.remove({
        key: 'watchlist',
    });
}
const checkContainItem = async (id,type,url) =>{
    try{
        let curArr = await storage.load({key:'watchlist'});
        curArr = JSON.stringify(curArr);
        for(let i = 0; i < curArr.length; i++){
            if(curArr[i].id === id){
                return true;
            }
        }
        return false;
    }catch(e){
        return false;
    }
}
const moveItemTo = async (id, type, url, index) =>{
    try{
        if(!await checkContainItem(id, type, url)){
            await addItemToTail(id,type,url);
            return;
        }
        let curArr = await storage.load({key:'watchlist'});
        curArr = JSON.stringify(curArr);
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
                    data: JSON.stringify(curArr)
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
        curArr = JSON.parse(curArr);
        if(checkContainItem(id,type,url)){

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
                data: JSON.stringify(curArr)
            })
        }
    }catch(e){
        createArr(id,type,url);
    }
}

const loadItem = async () =>{
    try{
        let curArr = await storage.load({key:'watchlist'});
        curArr = JSON.parse(curArr);
        return curArr;
    }catch(e){
        let curArr = [];
        return curArr;
    }
}
export default watchlistLocalStorage = {
    checkContainItem : checkContainItem,
    addItemToTail : addItemToTail,
    moveItemTo:moveItemTo,
    clearAllItem : clearAllItem,
    loadItem:loadItem
}