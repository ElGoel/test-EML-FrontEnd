<template>
    <div @click.stop class="dialog__content form__container">
        <form novalidate class="form__content" @submit.prevent="onSubmit">
            <div class="form__content-wrapper">
                <div class="form__input">
                    <label for="name">Nombre</label>
                    <Input v-model="formData.name" name="name" />
                </div>
                <div class="form__input">
                    <label for="lastname">Apellido</label>
                    <Input v-model="formData.lastname" name="lastname" />
                </div>
            </div>
            <div class="form__content-wrapper">
                <div class="form__input">
                    <label for="age">Edad</label>
                    <Input v-model="formData.age" name="age" type="number" />
                </div>
                <div class="form__input">
                    <label for="size">Altura</label>
                    <Input v-model="formData.size" name="size" type="number" />
                </div>
                <div class="form__input">
                    <label for="weight">Peso</label>
                    <Input v-model="formData.weight" name="weight" type="number" />
                </div>
            </div>
            <div class="form__content-wrapper">
                <div class="form__input">
                    <label for="phone">Telefono</label>
                    <Input v-model="formData.phone" name="phone" />
                </div>
                <div class="form__input">
                    <label for="email">Email</label>
                    <Input v-model="formData.email" name="email" />
                </div>
            </div>
            <hr>
            <button @click="closeDialog" :disabled="hasErrors || isSubmitting"
                class="form__btn">Enviar</button>
        </form>
    </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import schema from '../utils/validation';
import Input from './formInput/Input.vue';
import { useForm } from 'vee-validate';

const { dispatch, state, commit } = useStore();

const formData = computed({
    get() {
        return state.formData;
    },

    set(newValue) {
        commit('setFormData', newValue);
    }
})

const { handleSubmit, setValues, errors, isSubmitting } = useForm({
    validationSchema: schema,
    initialValues: formData
});

const closeDialog = () => {
    dispatch('dialogAction', false)
}

const onSubmit = handleSubmit(() => {
    console.log('submit');
    if (state.formState === 'create') {
        dispatch('addUser');
    } else if (state.formState === 'edit') {
        console.log('editado');
        dispatch('updateUser');
    }
})

const hasErrors = computed(() => {
    if (state.formState === 'create') {
        return Object.keys(errors.value).length > 0 || Object.values(formData.value).some(value => !value);
    } else {
        return Object.keys(errors.value).length > 0
    }
});

watch(
    formData,
    newValue => {
        formData.value = newValue;
        setValues(formData.value);
    },
    { deep: true }
);

</script>