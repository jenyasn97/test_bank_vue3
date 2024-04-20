import {useField, useForm} from "vee-validate";
import {computed, watch} from "vue";
import * as yup from "yup";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useLoginForm () {
    const store = useStore();
    const router = useRouter();
    const {handleSubmit, isSubmitting, submitCount} = useForm();
    const PASSWORD_MIN_LENGTH = 8;

    const isTooManyAttempts = computed(() => submitCount.value >= 3);
    watch(isTooManyAttempts, value => {
        if (value) {
            setTimeout(() => {
                submitCount.value = 0
            }, 2000)
        }
    })

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField("email", yup
    .string()
    .trim()
    .required('Это поле обязательно для заполнения')
    .email('Необходимательно ввести корректный email'));

    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values);
            await router.push('/');
        } catch (e) {
        }

    });

    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField("password", yup
    .string()
    .trim()
    .required('Это поле обязательно для заполнения')
    .min(PASSWORD_MIN_LENGTH, `Пароль должен быть не менее ${PASSWORD_MIN_LENGTH} символов`));


    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts
    }
}