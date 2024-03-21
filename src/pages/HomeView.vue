<template>
    <button class="btn btn-create" @click="handleDialog(true)" type="button">Nuevo Usuario</button>
    <UserTable />
    <Dialog @close-dialog="handleDialog(false)" v-show="state.dialog" />
</template>

<script setup>
import UserTable from '../components/UserTable.vue';
import Dialog from '../components/Dialog.vue';
import { useStore } from 'vuex';

const { dispatch, state } = useStore();

const handleDialog = (value) => {
    dispatch('dialogAction', value);
}

</script>

<style lang="scss" scoped></style>