<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import BookingForm from '../components/BookingForm.vue'
import allPackages from '../data/packages.json'

const route = useRoute()
const id = computed(() => Number(route.params.id))

const pkg = computed(() => allPackages.find((p) => p.id === id.value))

const galleryImages = computed(() => {
  if (!pkg.value) return []
  const gallery = Array.isArray(pkg.value.gallery) ? pkg.value.gallery : []
  const unique = Array.from(new Set([pkg.value.image, ...gallery].filter(Boolean)))
  // Return up to 4 images total (1 main + 3 thumbs)
  return unique.slice(0, 4)
})

const itinerary = computed(() => {
  if (!pkg.value) return []
  // Simple placeholder day-wise itinerary based on duration text
  return [
    {
      day: 1,
      title: 'Arrival & gentle first impressions',
      description:
        'Private transfer from the airport to your stay, time to settle in, and a relaxed first walk guided by our favorite local recommendations.',
    },
    {
      day: 2,
      title: 'Guided discovery & signature experience',
      description:
        'Morning exploration with a local guide, followed by a signature experience—think boat cruises, tastings, or hidden viewpoints.',
    },
    {
      day: 3,
      title: 'Slow day with optional activities',
      description:
        'A flexible day: linger over breakfast, explore independently, or choose from curated add-ons such as spa sessions or extra excursions.',
    },
    {
      day: 4,
      title: 'Deeper immersion',
      description:
        'Dive into a different side of the region—visiting smaller neighborhoods, nearby towns, or natural highlights away from the main crowds.',
    },
    {
      day: 5,
      title: 'Free day & special dinner',
      description:
        'Your day to follow your curiosity, with an evening table reserved at one of our tried-and-loved restaurants.',
    },
    {
      day: 6,
      title: 'Last wander & departure',
      description:
        'Unhurried morning to soak things in one last time, then private transfer back to the airport with departure support.',
    },
  ]
})

const inclusions = [
  'Handpicked boutique stays or lodges',
  'Private or small-group signature experiences',
  'On-trip support and concierge assistance',
  'All listed transfers between stays',
]

const exclusions = [
  'International flights (unless added by request)',
  'Travel insurance',
  'Personal expenses and tips',
  'Optional add-on activities not listed in the final itinerary',
]

const bookTripSection = ref(null)

const scrollToBooking = () => {
  bookTripSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-50">
    <Navbar />

    <main class="flex-1">
      <section class="border-b border-slate-800/80 bg-slate-950">
        <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p class="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
            Package details
          </p>
          <h1
            v-if="pkg"
            class="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
          >
            {{ pkg.destination }}
          </h1>
          <p v-if="pkg" class="mt-2 text-sm text-slate-400 sm:text-[15px]">
            {{ pkg.duration }} · From
            <span class="font-semibold text-emerald-300">{{ pkg.price }}</span>
            per traveler.
          </p>

          <p v-else class="mt-4 text-sm text-slate-400">
            We couldn’t find this package. Please go back to the packages list and try again.
          </p>
        </div>
      </section>

      <section v-if="pkg" class="border-b border-slate-800/80 bg-slate-950">
        <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <!-- Top layout: gallery + overview / pricing -->
          <div class="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <!-- Gallery -->
            <div class="space-y-3">
              <div class="overflow-hidden rounded-3xl border border-slate-800">
                <img
                  :src="galleryImages[0] || pkg.image"
                  :alt="pkg.destination"
                  class="h-64 w-full object-cover sm:h-80"
                />
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div
                  v-for="(img, index) in galleryImages.slice(1)"
                  :key="img + index"
                  class="overflow-hidden rounded-2xl border border-slate-800/80"
                >
                  <img :src="img" :alt="`${pkg.destination} preview ${index + 1}`" class="h-20 w-full object-cover sm:h-24" />
                </div>
              </div>
            </div>

            <!-- Overview + pricing -->
            <aside class="space-y-4">
              <div class="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
                <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Overview
                </h2>
                <p class="mt-2 text-sm text-slate-200 sm:text-[15px]">
                  {{ pkg.description }}
                </p>
                <p class="mt-3 text-xs text-slate-400">
                  Every itinerary is fully customizable. Use this as a starting point and we’ll tune
                  the pace, stays, and experiences to you.
                </p>
              </div>

              <div class="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
                <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Pricing
                </h2>
                <div class="mt-3 flex items-baseline justify-between">
                  <div>
                    <p class="text-xs uppercase tracking-[0.16em] text-slate-400">
                      From
                    </p>
                    <p class="text-2xl font-semibold text-emerald-300">
                      {{ pkg.price }}
                    </p>
                    <p class="mt-1 text-[11px] text-slate-500">
                      Per traveler, based on double occupancy.
                    </p>
                  </div>
                  <div class="text-right text-[11px] text-slate-400">
                    <p>Typical seasonality and availability may affect final pricing.</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
                  @click="scrollToBooking"
                >
                  Book this trip
                </button>
              </div>

              <div class="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
                <h3 class="text-sm font-semibold text-slate-100">Inclusions</h3>
                <ul class="mt-2 space-y-1.5 text-[13px] text-slate-300">
                  <li v-for="item in inclusions" :key="item" class="flex items-start gap-2">
                    <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
                <h3 class="mt-4 text-sm font-semibold text-slate-100">Exclusions</h3>
                <ul class="mt-2 space-y-1.5 text-[13px] text-slate-300">
                  <li v-for="item in exclusions" :key="item" class="flex items-start gap-2">
                    <span class="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <!-- Itinerary timeline -->
          <section class="mt-10">
            <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Day-by-day itinerary (example)
            </h2>
            <div class="mt-4 space-y-6">
              <div
                v-for="step in itinerary"
                :key="step.day"
                class="relative flex gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:gap-6 sm:p-5"
              >
                <div class="relative flex flex-col items-center">
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-xs font-semibold text-slate-950 shadow shadow-emerald-500/40"
                  >
                    {{ step.day }}
                  </div>
                  <div
                    v-if="step.day !== itinerary.length"
                    class="mt-1 h-full w-px flex-1 bg-gradient-to-b from-emerald-400/60 via-slate-700 to-slate-800"
                  />
                </div>
                <div class="space-y-1">
                  <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Day {{ step.day }}
                  </p>
                  <h3 class="text-sm font-semibold text-slate-50 sm:text-[15px]">
                    {{ step.title }}
                  </h3>
                  <p class="text-xs text-slate-300 sm:text-[13px]">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Booking form -->
          <section id="book-trip" ref="bookTripSection" class="mt-10">
            <h2 class="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Booking request
            </h2>
            <p class="mt-2 text-xs text-slate-400 sm:text-[13px]">
              Share your ideal dates and preferences and we’ll confirm availability and finalize the
              itinerary for
              <span class="font-medium text-slate-100">{{ pkg.destination }}</span>.
            </p>
            <div class="mt-4">
              <BookingForm mode="booking" :selected-package-id="pkg.id" />
            </div>
          </section>
        </div>
      </section>
    </main>

    <footer class="border-t border-slate-800/80 bg-slate-950">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <p>&copy; {{ new Date().getFullYear() }} Skyline Travels. All rights reserved.</p>
        <div class="flex flex-wrap gap-3">
          <RouterLink to="/packages" class="transition hover:text-emerald-300">
            Back to all packages
          </RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

