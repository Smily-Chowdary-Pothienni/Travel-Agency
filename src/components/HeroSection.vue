<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import allPackages from '../data/packages.json'

const router = useRouter()

const destination = ref('')
const startDate = ref('')
const endDate = ref('')

const today = computed(() => new Date().toISOString().slice(0, 10))
const endMin = computed(() => (startDate.value ? startDate.value : today.value))

const normalizedQuery = computed(() => destination.value.trim().toLowerCase())

const matchingPackages = computed(() => {
  if (!normalizedQuery.value) return allPackages
  return allPackages.filter((p) =>
    String(p.destination).toLowerCase().includes(normalizedQuery.value),
  )
})

const matchCount = computed(() => matchingPackages.value.length)
const topMatches = computed(() => matchingPackages.value.slice(0, 4))

function goToPackages() {
  router.push({
    path: '/packages',
    query: {
      q: destination.value.trim() || undefined,
      start: startDate.value || undefined,
      end: endDate.value || undefined,
    },
  })
}
</script>

<template>
  <section
    id="hero"
    class="relative overflow-hidden border-b border-slate-800/80 bg-slate-950"
  >
    <!-- Background image & overlay -->
    <div
      class="absolute inset-0 bg-[url('https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/75 to-slate-950/95" />
    <div class="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-emerald-400/10 mix-blend-soft-light" />

    <!-- Content -->
    <div class="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
      <p class="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-200/90 ring-1 ring-white/10">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-300" />
        Escape · Unwind · Explore
      </p>

      <h1
        class="mt-6 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-amber-50 sm:text-4xl lg:text-5xl"
      >
        Plan Your
        <span class="bg-gradient-to-r from-amber-300 via-rose-200 to-emerald-200 bg-clip-text text-transparent">
          Perfect Getaway
        </span>
      </h1>

      <p class="mt-4 max-w-2xl text-sm leading-relaxed text-amber-100/80 sm:text-base">
        Handcrafted journeys to sun‑kissed shores, misty mountains, and everything in between.
        Relax, we’ll take care of the details—your only job is to show up and exhale.
      </p>

      <!-- CTAs -->
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="#packages"
          class="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/40 transition hover:bg-amber-200"
        >
          Explore Packages
        </a>
        <a
          href="#contact"
          class="inline-flex items-center justify-center rounded-full bg-slate-950/70 px-6 py-2.5 text-sm font-semibold text-amber-50 ring-1 ring-white/15 transition hover:bg-slate-900/80 hover:ring-amber-200/60"
        >
          Book Now
        </a>
      </div>

      <!-- Optional search bar -->
      <form
        class="mt-8 w-full max-w-xl rounded-2xl bg-slate-950/80 p-3 shadow-xl shadow-black/40 ring-1 ring-white/10 backdrop-blur"
        @submit.prevent="goToPackages"
      >
        <div class="grid gap-3">
          <div class="space-y-1.5 text-left">
            <label for="destination" class="text-[11px] font-medium uppercase tracking-[0.14em] text-amber-100/80">
              Destination
            </label>
            <input
              id="destination"
              v-model="destination"
              type="text"
              placeholder="Bali, Santorini, Swiss Alps…"
              class="block w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-amber-50 outline-none ring-0 transition placeholder:text-amber-100/60 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/50"
            />
          </div>
        </div>
        <button
          type="submit"
          class="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-300"
        >
          Search trips
        </button>
      </form>

      <p class="mt-4 text-[11px] text-amber-100/70">
        No payment required to explore options. We’ll tailor recommendations just for you.
      </p>
    </div>
  </section>
</template>

