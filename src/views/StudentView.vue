<template>
  <h2>Students</h2>
  <div v-if="studentData !== null">
      <div v-if="studentData != []">
          <div :key="student.student_id" v-for="student in studentData">
              <Student @edit-action="editStudent" @delete-action="deleteStudent" :stu_info="student" />
          </div>
      </div>
      <div v-else>
          <h4>No Students Found.</h4>
      </div>
      <div class="mt-4">
          <buttonCustom class="AddComp" @add-action="addStudent" action="Add" compType="Student"/>
      </div>
      <div class="emptySpace"></div>
  </div>
  <div v-else>
    <p>Fetching Students info...</p>
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
import Student from '../components/Student.vue'
import buttonCustom from '../components/buttonCustom.vue'

export default{
  name:'Students',
  components : {
      Student,
      buttonCustom
  },
  data(){
      return {
          studentData : null
      }
  },
  methods : {
      async deleteStudent(id){
          if(confirm('are you sure you want to delete student data of id ' +id+'?')){
              const res = await fetch(`/api/student/${id}`,{
                  method : 'DELETE'
              })

              res.status == 200 ? (this.studentData = this.studentData.filter((student) => student.student_id !== id)) : alert('Error occured.')
              //alert(res.msg)
              //this.studentData = this.studentData.filter((student) => student.student_id !== id);
          }
      },
      async addStudent(d1,d2,d3){
          let newStud = {
              roll_number : d1,
              first_name  : d2,
              last_name   : d3
          }
          const res = await fetch('/api/student',{
              method : 'POST',
              headers : {
                  'Content-type' : 'application/json'
              },
              body : JSON.stringify(newStud)
          })

          const stdNew = await res.json()
          this.studentData = [...this.studentData, stdNew]
          console.log(this.studentData)
      },
      async editStudent(d1,d2,d3,id){
          let editStud = {
              roll_number : d1,
              first_name  : d2,
              last_name   : d3
          }

          const res = await fetch(`/api/student/${id}`,{
              method : 'PUT',
              headers : {
                  'Content-type' : 'application/json'
              },
              body : JSON.stringify(editStud)
          })

          const studEdit = await res.json()
          console.log(studEdit)

          this.studentData = this.studentData.filter((stud) => stud.student_id != id)
          this.studentData.push(studEdit)
      }
  },
  async created(){
      const res = await fetch('/api/student',{
          method : 'GET',
          headers : {
              'Content-type' : 'application/json',
          }
      })

      this.studentData = await res.json();
      console.log(this.studentData, res.status)
  }
}
</script>