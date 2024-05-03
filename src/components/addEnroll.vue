<template>
    <div class="card" style="width : 25%" v-show="buttonPress">
        <h4 class="card-header">Add New Enroll</h4>
        <div class="card-body">
            <div>
                <label for="students">Student : </label>
                <select name="students" class="form-select-sm" v-model="stuId">
                    <option v-for="stu in studentInfo" :value="stu.student_id">{{ stu.first_name }} {{ stu.last_name }}</option>
                </select>  
            </div>

            <div>
                <label for="courses">Course : </label>
                <select name="courses" class="form-select-sm"v-model="courseId">
                    <option v-for="c in courseInfo" :value="c.course_id">{{ c.course_name }}</option>
                </select>
            </div>

            <div><button class="btn btn-secondary" @click="emitAddEnroll">Confirm Enroll</button></div>
        </div>
    </div>
    <button class="btn btn-outline-primary" @click="toggleButtonPress">New Enroll</button>
</template>

<script>
export default{
    name : 'addEnroll',
    props : {
        studentInfo : Array,
        courseInfo : Array
    },
    emits : ['add-enroll'],
    data(){
        return {
            buttonPress : false,
            stuId : null,
            courseId : null
        }
    },
    methods : {
        toggleButtonPress(){
            this.buttonPress = !this.buttonPress;
        },
        emitAddEnroll(){
            this.$emit('add-enroll', this.stuId, this.courseId);
            this.toggleButtonPress()
            this.stuId = null;
            this.courseId = null;
        }
    }
}
</script>