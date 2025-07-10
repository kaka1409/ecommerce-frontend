<template>
  <Form :validation-schema="schema" @submit="onSubmit($event)">
    <div v-for="field in ['firstName','lastName','email']" :key="field" class="mb-4">
      <label :for="field">{{ field }}</label>
      <Field
        :id="field"
        :name="field"
        as="input"
        class="border p-2 rounded w-full"
      />
      <ErrorMessage :name="field" class="text-red-600 text-sm" />
    </div>

    <button type="submit" :disabled="!isValid" >Register</button>
  </Form>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';

// 1. Define a Yup schema matching your fields
const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName:  yup.string().required('Last name is required'),
  email:     yup.string().required().email('Please enter a valid email'),
});

// 2. Grab form-level meta (validity)
const { meta: formMeta } = useForm({ validationSchema: schema });
const isValid = ref(formMeta).value.valid;

// 3. Submission handler
function onSubmit(values) {
  console.log('Registered:', values);
  alert('Welcome, ' + values.firstName + '!');
}
</script>
