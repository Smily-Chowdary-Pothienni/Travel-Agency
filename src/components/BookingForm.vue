<script setup>
import { computed, reactive, ref } from 'vue'
import allPackages from '../data/packages.json'

const props = defineProps({
  mode: {
    type: String,
    default: 'inquiry', // 'inquiry' | 'booking'
  },
  selectedPackageId: {
    type: Number,
    default: null,
  },
})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  startDate: '',
  endDate: '',
  people: '',
  packageId: props.selectedPackageId ?? null,
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  startDate: '',
  endDate: '',
  people: '',
  packageId: '',
})

const isBooking = computed(() => props.mode === 'booking')

const today = computed(() => new Date().toISOString().slice(0, 10))
const endMin = computed(() => (form.startDate ? form.startDate : today.value))

const showThankYou = ref(false)

const packageOptions = computed(() =>
  allPackages.map((p) => ({
    id: p.id,
    label: p.destination,
  })),
)

function resetForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.startDate = ''
  form.endDate = ''
  form.people = ''
  form.packageId = null
  form.message = ''

  errors.name = ''
  errors.email = ''
  errors.startDate = ''
  errors.endDate = ''
  errors.people = ''
  errors.packageId = ''
}

function validate() {
  errors.name = form.name.trim() ? '' : 'Name is required.'
  errors.email = form.email.trim() ? '' : 'Email is required.'
  errors.startDate = form.startDate ? '' : 'Start date is required.'
  errors.endDate = form.endDate ? '' : 'End date is required.'
  const peopleValue =
    typeof form.people === 'number'
      ? form.people
      : Number(String(form.people ?? '').trim() || '0')
  errors.people = peopleValue > 0 ? '' : 'Number of people is required.'

  if (isBooking.value) {
    errors.packageId = form.packageId ? '' : 'Please select a package.'
  } else {
    errors.packageId = ''
  }

  return (
    !errors.name &&
    !errors.email &&
    !errors.startDate &&
    !errors.endDate &&
    !errors.people &&
    !errors.packageId
  )
}

function handleSubmit() {
  if (!validate()) return
  const submission = {
    ...form,
    mode: props.mode,
    packageLabel:
      form.packageId && packageOptions.value.find((p) => p.id === form.packageId)?.label,
    submittedAt: new Date().toISOString(),
  }

  try {
    const key = 'travel-agency-submissions'
    const existingRaw = window.localStorage.getItem(key)
    const existing = existingRaw ? JSON.parse(existingRaw) : []
    existing.push(submission)
    window.localStorage.setItem(key, JSON.stringify(existing))
  } catch (err) {
    console.error('Failed to persist submission', err)
  }

  resetForm()
  showThankYou.value = true
}
</script>

<template>
  <form
    class="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-4 shadow-xl shadow-black/40 sm:p-5"
    @submit.prevent="handleSubmit"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="space-y-1.5">
        <label for="name" class="text-xs font-medium text-slate-200">Name *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="block w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
          placeholder="Alex Rivera"
        />
        <p v-if="errors.name" class="text-xs text-rose-400">{{ errors.name }}</p>
      </div>
      <div class="space-y-1.5">
        <label for="email" class="text-xs font-medium text-slate-200">Email *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="block w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
          placeholder="you@example.com"
        />
        <p v-if="errors.email" class="text-xs text-rose-400">{{ errors.email }}</p>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="space-y-1.5">
        <label for="phone" class="text-xs font-medium text-slate-200">
          Phone
          <span class="text-[10px] text-slate-500">(optional)</span>
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="block w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
          placeholder="+1 555 123 4567"
        />
      </div>
      <div class="space-y-1.5">
        <label for="people" class="text-xs font-medium text-slate-200">Number of people *</label>
        <input
          id="people"
          v-model.number="form.people"
          type="number"
          min="1"
          class="block w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
          placeholder="2"
        />
        <p v-if="errors.people" class="text-xs text-rose-400">{{ errors.people }}</p>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="space-y-1.5">
        <label for="startDate" class="text-xs font-medium text-slate-200">Start date *</label>
        <input
          id="startDate"
          v-model="form.startDate"
          type="date"
          :min="today"
          class="block w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
        />
        <p v-if="errors.startDate" class="text-xs text-rose-400">{{ errors.startDate }}</p>
      </div>

      <div class="space-y-1.5">
        <label for="endDate" class="text-xs font-medium text-slate-200">End date *</label>
        <input
          id="endDate"
          v-model="form.endDate"
          type="date"
          :min="endMin"
          class="block w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
        />
        <p v-if="errors.endDate" class="text-xs text-rose-400">{{ errors.endDate }}</p>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="space-y-1.5">
        <label for="package" class="text-xs font-medium text-slate-200">
          {{ isBooking ? 'Selected package *' : 'Interested in package' }}
        </label>
        <select
          id="package"
          v-model="form.packageId"
          class="block w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
        >
          <option :value="null">No specific package yet</option>
          <option
            v-for="option in packageOptions"
            :key="option.id"
            :value="option.id"
          >
            {{ option.label }}
          </option>
        </select>
        <p v-if="errors.packageId" class="text-xs text-rose-400">{{ errors.packageId }}</p>
      </div>
      <div class="hidden sm:block" />
    </div>

    <div class="space-y-1.5">
      <label for="message" class="text-xs font-medium text-slate-200">
        {{ isBooking ? 'Trip preferences & details' : 'How would you like to travel?' }}
      </label>
      <textarea
        id="message"
        v-model="form.message"
        rows="3"
        class="block w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 outline-none ring-0 transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
        :placeholder="
          isBooking
            ? 'Share anything that will help us design this specific trip for you.'
            : 'Share a bit about your ideal pace, interests, and any destinations you have in mind.'
        "
      />
    </div>

    <button
      type="submit"
      class="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
    >
      {{ isBooking ? 'Submit booking request' : 'Send inquiry' }}
    </button>
    <p class="text-[11px] text-slate-500">
      By submitting, you agree to be contacted about trip planning. We’ll never share your details.
    </p>
  </form>

  <!-- Thank-you modal -->
  <div
    v-if="showThankYou"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    role="dialog"
    aria-modal="true"
    aria-label="Submission confirmation"
    @click.self="showThankYou = false"
  >
    <div class="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-2xl shadow-black/50">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
            Submitted
          </p>
          <h3 class="mt-2 text-lg font-semibold text-slate-50">
            Thanks! Our team will contact you with availability and final pricing.
          </h3>
          <p class="mt-2 text-sm text-slate-400">
            We typically respond within 24–48 hours.
          </p>
        </div>
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 transition hover:border-slate-600 hover:text-slate-50"
          aria-label="Close"
          @click="showThankYou = false"
        >
          ✕
        </button>
      </div>
      <div class="mt-5 flex justify-end">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/30 transition hover:bg-emerald-300"
          @click="showThankYou = false"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

