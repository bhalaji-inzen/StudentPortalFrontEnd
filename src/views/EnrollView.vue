<template>
    <h1>Enrollments</h1>
    <div v-if="enrollData !== null" class="container">
    <table class="table table-striped" style="width : 80%">
        <thead>
        <tr>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Remove Enorllment</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr v-for="enr in enrollData">
            <td>{{ enr.student_name }}</td>
            <td>{{ enr.course_name }}</td>
            <td><button class="btn btn-sm btn-danger" @click="removeEnroll(enr.enrollment_id,enr.student_id, enr.course_id)">Withdraw Enrollment</button></td>
        </tr>
        </tbody>
    </table>
    <div class="container">
        <addEnroll @add-enroll="addEnrollment" :studentInfo="studentData" :courseInfo="courseData"  />
    </div>
    </div>
    <div v-else>
        <p>Fetching Enrollment Details...</p>
    </div>
</template>

<script>
import addEnroll from '../components/addEnroll.vue'

export default{
    name : 'EnrollView',
    components : {
        addEnroll
    },
    data(){
        return {
            enrollData : null,
            studentData : [],
            courseData : []
        }
    },
    methods : {
        addNamestoEnrollData(sd, cd, ed){
            for(let enroll of ed){
                //console.log(enroll)
                for(let course of cd){
                    //console.log(course)
                    if(course.course_id == enroll.course_id){
                        enroll.course_name = course.course_name;
                        break
                    }
                }

                for(let stud of sd){
                    //console.log(stud)
                    if(stud.student_id == enroll.student_id){
                        enroll.student_name = stud.first_name + ' ' +  stud.last_name;
                        break
                    }
                }
            }
            return ed
        },
        async removeEnroll(e_id, stu_id, course_id){
            if(confirm('are you sure?')){
                const res = await fetch(`/api/student/${stu_id}/course/${course_id}`,{
                    method : 'DELETE'
                })

                let out = await res.json();
                //console.log(out)

                this.enrollData = this.enrollData.filter((enr) => enr.enrollment_id != e_id)
                //console.log(this.enrollData)
            }
        },
        async addEnrollment(stuId,courseId){
            if(stuId != null && courseId != null){
                let newEnr = {
                    "course_id" : courseId
                };
                const res = await fetch(`/api/student/${stuId}/course`,{
                    method : 'POST',
                    headers : {
                        'Content-type' : 'application/json'
                    },
                    body : JSON.stringify(newEnr)
                })

                if(res.status == 200){
                    let out = await res.json()
                    console.log(out)

                    for(let c of this.courseData){
                        if(c.course_id == out.course_id){
                            out.course_name = c.course_name
                            break
                        }
                    }

                    for(let s of this.studentData){
                        if(s.student_id == out.student_id){
                            out.student_name = s.first_name + ' ' +  s.last_name;
                            break
                        }
                    }
                    this.enrollData.push(out);
                }else{
                    let err = await res.json()
                    alert("This student has already been enrolled to the given course.")
                }
            }else{
                alert('send necessary details.')
            }
        }
    },
    async created(){
        //STUDENTDATA FETCH
        const res1 = await fetch('/api/student',{
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
            }
        })

        this.studentData = await res1.json();
        //console.log(this.studentData, res1.status)

        //COURSEDATA FETCH
        const res2 = await fetch('/api/course',{
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
            }
        })

        this.courseData = await res2.json();

        //ENROLLMENTDATA FETCH

        const res3 = await fetch('/api/enrolldeets',{
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
            }
        })

        this.enrollData = await res3.json()
        //console.log(this.enrollData)
        this.enrollData = this.addNamestoEnrollData(this.studentData, this.courseData, this.enrollData);
    }
}
</script>