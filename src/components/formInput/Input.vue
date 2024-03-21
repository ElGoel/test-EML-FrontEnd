<template>
    <div>
        <input v-model="model" :type="type || 'text'" :placeholder="errorMessage ? errorMessage : ''" :style="errorMessage ? { backgroundColor: '#e8a7a7', border: 'solid 1px #e30707'} : {}" />
    </div>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
    name: String,
    type: String,
});

const model = defineModel()

const { value, errorMessage } = useField(() => props.name, undefined, {
    syncVModel: true,
});
</script>