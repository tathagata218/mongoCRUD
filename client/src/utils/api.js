import axios from "axios";
import { error } from "util";

export default {

    saveData : function (infoData) {
        return axios.post("/data",infoData).catch((error)=> console.log(error));
    },

    getInfo : function () {
        return axios.get("/getData").catch((error)=> console.log(error));
    },

    removeInfo : function (id) {
        return axios.delete("/delData/"+id).catch((err)=>{console.log(err)});
    },

     updateInfo : function (id,updateInfo) {
         return axios.put('/upData/'+id,updateInfo).catch(err=>console.log(err));
     }



}