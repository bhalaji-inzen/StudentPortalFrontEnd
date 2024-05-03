<template>
  <div class="card mt-4" style="width : 20rem">
    <div class="card-body">
      <h3 class="card-title">{{ stu_info.first_name }} {{ stu_info.last_name }}</h3>
      <p class="card-subtitle font-monospace">Roll No.   : {{ stu_info.roll_number }}</p>
    </div>
    <div class="card-footer btn-group justify-content-between">
      <div>
        <buttonCustom @edit-action="emitEditAction" :compId='stu_info.student_id' action="Edit" compType="Student"/>
      </div>
      <div>
        <buttonCustom @delete-action="$emit('delete-action', stu_info.student_id)" :compId='stu_info.student_id' action="Delete" compType="Student"/>
      </div>
    </div>    
  </div>
</template>

<script>
import buttonCustom from './buttonCustom.vue'

export default {
  name:'Student',
  props : {
    stu_info : Object
  },
  emits : ['edit-action','delete-action'],
  components : {
    buttonCustom
  },
  methods : {
    emitEditAction(d1,d2,d3,id){
      this.$emit('edit-action',d1,d2,d3,id)
    }
  }
}
</script>