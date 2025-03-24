import { defineStore } from "pinia";
import axios from "axios";





export const usebootcamp = defineStore('bootcamp', {
    state: () => ({
        boot_campList:[],
        boot_camp_curry:[]


    }),
    actions: {
        async getBootcamp() {
            const response = await axios.get(`/api/course/boocampinfo`);
            this.boot_campList = response.data.data;

            console.log(response.data);
        } ,
        async getBootcampcurry() {
            const response = await axios.get(`/api/course/bootcampinfo`);
            this.boot_camp_curry = response.data.data.curriculumList;

            console.log(response.data.data.curriculumList);
        } 
    }
    
});