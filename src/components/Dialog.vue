<template>
    <div @click="$emit('closeDialog')" class="dialog__container">
        <UserForm @click.stop />
    </div>
</template>

<script setup>
import UserForm from './UserForm.vue';

defineEmits(['closeDialog']);

</script>