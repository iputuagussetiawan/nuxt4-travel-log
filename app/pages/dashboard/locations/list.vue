<script setup lang="ts">
//1.modules import
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { FetchError } from 'ofetch'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { InsertLocationSchema } from '~/db/schema'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'

//2.modules init
const { $csrfFetch } = useNuxtApp()
definePageMeta({
    layout: 'dashboard'
})

const router = useRouter()
const submitError = ref('')
const loading = ref(false)
const submitted = ref(false)
const formSchema = toTypedSchema(InsertLocationSchema)
const { isFieldDirty, handleSubmit, meta } = useForm({
    validationSchema: formSchema
})

//3.methods
const onSubmit = handleSubmit(async (values) => {
    try {
        submitError.value = ''
        loading.value = true
        await $csrfFetch('/api/locations', {
            method: 'POST',
            body: values
        })
        submitted.value = true
        navigateTo(`/dashboard/locations`)
    } catch (e) {
        const error = e as FetchError
        console.log(error.data.data)
        console.error(error.statusMessage)
        submitError.value =
            error.data?.statusMessage ||
            error.statusMessage ||
            'An unknown error occurred'
    } finally {
        loading.value = false
    }
})

//4.events
onBeforeRouteLeave(() => {
    if (!submitted.value && meta.value.dirty) {
        const confirm = window.confirm('Are you sure you want to leave?')
        if (!confirm) {
            return false
        }
    }
    return true
})
</script>

<template>
    <section>
        <div class="mt-4 px-4">
            <h1 class="text-lg font-bold">List Location</h1>
            <Button
                :disabled="loading"
                type="button"
                variant="outline"
                @click="router.back()"
            >
                Back
            </Button>
            <p class="text-sm text-muted-foreground">Add a new location here</p>
        </div>
    </section>
</template>
