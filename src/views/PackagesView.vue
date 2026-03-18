<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import FeaturedPackages from '../components/FeaturedPackages.vue'
import allPackages from '../data/packages.json'

const route = useRoute()
const router = useRouter()

const q = computed(() => String(route.query.q || '').trim())
const start = computed(() => String(route.query.start || '').trim())
const end = computed(() => String(route.query.end || '').trim())

const filteredPackages = computed(() => {
  const query = q.value.toLowerCase()
  let list = allPackages

  if (query) {
    list = list.filter((p) => String(p.destination).toLowerCase().includes(query))
  }

  // We currently don't store availability per package, so dates act as a user filter context.
  // (You can extend packages.json later with availability windows and filter here.)
  return list
})

function clearFilters() {
  router.push({ path: '/packages' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-50">
    <Navbar />

    <main class="flex-1">
      <section class="border-b border-slate-800/80 bg-slate-950">
        <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p class="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
            Our trips
          </p>
          <h1 class="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            All travel packages
          </h1>
          <p class="mt-3 max-w-2xl text-sm text-slate-400 sm:text-[15px]">
            Explore every itinerary we currently recommend—from long weekend city breaks to
            slow-travel sabbaticals. Each trip can be tailored to your pace, preferences, and budget.
          </p>

          <div v-if="q || start || end" class="mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span class="rounded-full bg-slate-900/70 px-3 py-1 text-slate-200 ring-1 ring-slate-700">
              Destination: <span class="font-medium text-emerald-200">{{ q || 'Any' }}</span>
            </span>
            <span class="rounded-full bg-slate-900/70 px-3 py-1 text-slate-200 ring-1 ring-slate-700">
              Dates:
              <span class="font-medium text-emerald-200">
                {{ start || 'Any' }}<span v-if="end"> → {{ end }}</span>
              </span>
            </span>
            <button
              type="button"
              class="rounded-full border border-slate-700 px-3 py-1 text-slate-100 transition hover:border-emerald-400 hover:text-emerald-200"
              @click="clearFilters"
            >
              Clear filters
            </button>
          </div>
        </div>
      </section>

      <FeaturedPackages
        id="all-packages"
        title="All travel packages"
        subtitle="Browse everything in one place, then we’ll refine the details together."
        :packages="filteredPackages"
      />
    </main>

    <footer class="border-t border-slate-800/80 bg-slate-950">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <p>&copy; {{ new Date().getFullYear() }} Skyline Travels. All rights reserved.</p>
        <div class="flex flex-wrap gap-3">
          <a href="/" class="transition hover:text-emerald-300">Back to home</a>
        </div>
      </div>
    </footer>
  </div>
</template>

