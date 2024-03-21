<template>
    <div class="table__container">
        <span class="message__success" v-if="state.success">{{ state.success }}</span>
        <span class="message__info" v-if="state.message">{{ state.message }}</span>
        <table v-if="!state.loading" class="table__content">
            <tr class="table__content-header">
                <th v-for="(userKey, index) in userKeys" :key="index">
                    {{ userKey }}
                </th>
            </tr>
            <tr class="table__content-body" v-for="user in state.users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.age }}</td>
                <td>{{ user.size }}</td>
                <td>{{ user.weight }}</td>
                <td>{{ dayjs(user.created_at).format('DD-MM-YYYY') }}</td>
                <td>{{ dayjs(user.created_at).format('DD-MM-YYYY') }}</td>
                <td>
                    <button class="btn btn-info" @click="editUser(user)">update</button>
                    <button class="btn btn-error" @click="deleteUser(user)">delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import dayjs from 'dayjs'; 
import { useStore } from 'vuex';

const { dispatch, state, commit } = useStore();

const userKeys = computed(() => state.users.length ? Object.keys(state.users[0]).slice(0, -1) : []);

const editUser = (user) => {
    commit('setDialog', true);
    commit('setFormData', user);
    commit('setFormState', 'edit'); 
}

const deleteUser = (user) => {
    dispatch('deleteUser', user.id);
}

onMounted(async () => {
    await dispatch('fetchUsers', 'users');
})

</script>
