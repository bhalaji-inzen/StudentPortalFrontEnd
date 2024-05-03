<template>
    <h2>Courses</h2>
    <div v-if="courseData !== null">
        <div v-if="courseData != []">
            <div :key="course.course_id" v-for="course in courseData">
                <Course @edit-action="editCourse" @delete-action="deleteCourse" :course_info="course" />
            </div>
        </div>
        <div v-else>
            <h4>No Courses Found.</h4>
        </div>
        <div class="mt-4">
            <buttonCustom class="AddComp" @add-action="addCourse" action="Add" compType="Course" />
        </div>
        <div class="emptySpace"></div>
    </div>
    <div v-else>
        <p>Fetching courses info...</p>
    </div>
</template>


<style>
    .AddComp{
        width : 20rem;
    }
    .emptySpace{
        width: 100%;
        height: 100px;
    }
</style>


<script>
import Course from '../components/Course.vue'
import buttonCustom from '../components/buttonCustom.vue'

export default{
    name : 'Courses',
    components : {
        Course,
        buttonCustom
    },
    data(){
        return {
            courseData : null
        }
    },
    methods : {
        async deleteCourse(id){
            if(confirm('are you sure you want to delete student data of id ' +id+'?')){
                const res = await fetch(`/api/course/${id}`,{
                    method : 'DELETE'
                })

                res.status == 200 ? (this.courseData = this.courseData.filter((course) => course.course_id !== id)) : alert('Error occured.')
                //alert(res.msg)
                //this.courseData = this.courseData.filter((student) => student.student_id !== id);
            }
        },
        async addCourse(d1,d2,d3){
            let newCourse = {
                course_code : d1,
                course_name  : d2,
                course_description : d3
            }
            const res = await fetch('/api/course',{
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(newCourse)
            })

            const courseNew = await res.json()
            this.courseData = [...this.courseData, courseNew]
            console.log(this.courseData)
        },
        async editCourse(d1,d2,d3,id){
            let editStud = {
                course_code : d1,
                course_name  : d2,
                course_description   : d3
            }

            const res = await fetch(`/api/course/${id}`,{
                method : 'PUT',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(editStud)
            })

            const courseEdit = await res.json()
            console.log(courseEdit)

            this.courseData = this.courseData.filter((course) => course.course_id !== id)
            this.courseData.push(courseEdit)
        }
    },
    async created(){
        const res = await fetch('/api/course',{
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
            }
        })

        this.courseData = await res.json();
        console.log(this.courseData)
    }
}
</script>