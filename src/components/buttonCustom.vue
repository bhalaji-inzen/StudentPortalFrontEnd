<template>
    <div class="card" style="border:none">
        <div v-if="action !==  'Delete'">
            <div class="container" v-show="buttonPress">
                <div class="row">
                    <div class="form-floating">
                        <input class="form-control" type="text" v-model="data1" placeholder="data">
                        <label class="form-label" v-if="compType === 'Student'">Roll No.</label>
                        <label class="form-label" v-else>Course Code</label>
                    </div>
                    <div class="form-floating">
                        <input class="form-control" type="text" v-model="data2" placeholder="data">
                        <label class="form-label" v-if="compType === 'Student'">First Name</label>
                        <label class="form-label" v-else>Course Name</label>
                    </div>
                    <div class="form-floating">
                        <input class="form-control" type="text" v-model="data3" placeholder="data">
                        <label class="form-label" v-if="compType === 'Student'">Last Name</label>
                        <label class="form-label" v-else>Course Description</label>
                    </div>
                    <div>
                        <button class="btn btn-secondary" type="submit" @click="submitAction" >Confirm {{ action }}</button>
                    </div>
                </div>
            </div>
    </div>
    <div>
        <button :class="buttonClass" id="actionButton" @click="toggleButtonPress(); callDeleteApi()">{{ action }} {{ compType }}</button>
    </div>
    </div>
</template>

<script>
export default {
    name:'buttonCustom',
    props : {
        compId : {
            type : Number,
            required : false
        },
        action : String,
        compType : String,
    },
    emits : ["add-action","edit-action","delete-action"],
    data(){
        return {
            buttonPress : false,
            data1:'',
            data2:'',
            data3:'',
            buttonClass : {'btn' : true}
        }
    },
    methods : {
        toggleButtonPress(){
            this.buttonPress = !this.buttonPress;
        },
        callDeleteApi(){
            if(this.action === 'Delete'){
                this.$emit('delete-action', this.compId);
            }
        },
        submitAction(){
            if(this.action == 'Add'){
                if(this.data1 != '' || this.data2 != '' || this.data3 != ''){
                    this.$emit('add-action',this.data1,this.data2,this.data3)
                }else{
                    alert('please fill the necessary details.')
                }
            }else if(this.action == 'Edit'){
                if(this.data1 != '' || this.data2 != '' || this.data3 != ''){
                    this.$emit('edit-action',this.data1,this.data2,this.data3, this.compId)
                }else{
                    alert('please fill the necessary details.')
                }
            }
            this.data1='';
            this.data2='';
            this.data3='';
            this.buttonPress = !this.buttonPress;
        }
    },
    mounted(){
        if(this.action == "Delete"){
            //console.log(this.action,'RED',this.compId);
            this.buttonClass["btn-danger"]=true;
        }else if(this.action == "Add"){
            //console.log(this.action,'BLUE',this.compId);
            this.buttonClass["btn-outline-primary"]=true;
        }else if (this.action == 'Edit'){
            //console.log(this.action,'YELLOW',this.compId);
            this.buttonClass["btn-success"]=true;
        }
    }
}
</script>