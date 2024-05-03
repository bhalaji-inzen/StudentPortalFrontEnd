<template>
<div class="card mt-4" style="width : 25rem">
    <div class="card-body">
        <h3 class="card-title">{{ course_info.course_name }}</h3>
        <p class="card-subtitile font-monospace">Course Code         : {{ course_info.course_code }}</p>
        <p class="card-text text-small">{{ course_info.course_description }}</p>
    </div>
    <div class="card-footer btn-group justify-content-between">
        <div><buttonCustom @edit-action="emitEditAction" :compId='course_info.course_id' action="Edit" compType="Course"/></div>
        <div><buttonCustom @delete-action="$emit('delete-action', course_info.course_id)" :compId='course_info.course_id' action="Delete" compType="Course"/></div>
    </div>
</div>
</template>

<script>
import buttonCustom from './buttonCustom.vue'

export default{
    name : 'Course',
    props : {
        course_info : Object
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