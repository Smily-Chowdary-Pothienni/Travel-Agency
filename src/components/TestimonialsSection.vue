<script setup>
const testimonials = [
  {
    name: 'Amelia Hart',
    role: 'Bali & Kyoto traveler',
    rating: 5,
    avatarInitials: 'AH',
    quote:
      'Every transfer, check‑in, and experience felt effortless. We could just enjoy being present instead of managing logistics.',
  },
  {
    name: 'David Chen',
    role: 'Amalfi Coast & Paris',
    rating: 5,
    avatarInitials: 'DC',
    quote:
      'The pacing was perfect—enough structure to feel taken care of, with free time to wander and find our own favorites.',
  },
  {
    name: 'Sophia Martinez',
    role: 'Patagonia adventure',
    rating: 4.8,
    avatarInitials: 'SM',
    quote:
      'They understood exactly how we like to travel: light on crowds, heavy on memorable details. The itinerary felt made just for us.',
  },
  {
    name: 'Liam O’Connor',
    role: 'Family road trip in NZ',
    rating: 4.9,
    avatarInitials: 'LO',
    quote:
      'Every stay was child‑friendly without sacrificing design. The kids still talk about the glow‑worm caves and farm stays.',
  },
]
</script>

<template>
  <section class="border-b border-slate-800/80 bg-slate-950">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
            Traveler stories
          </p>
          <h2 class="mt-2 text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            What our guests are saying
          </h2>
          <p class="mt-2 max-w-xl text-sm text-slate-400 sm:text-[15px]">
            Real journeys, real feedback—from honeymoon escapes to multi‑stop family adventures.
          </p>
        </div>
      </div>

      <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="t in testimonials"
          :key="t.name"
          class="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-md shadow-slate-950/40 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/40 sm:p-5"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-amber-300 text-xs font-semibold text-slate-950 shadow-md shadow-emerald-500/40"
            >
              {{ t.avatarInitials }}
            </div>
            <div class="flex flex-col">
              <p class="text-sm font-semibold text-slate-50">
                {{ t.name }}
              </p>
              <p class="text-[11px] text-slate-400">
                {{ t.role }}
              </p>
            </div>
          </div>

          <div class="mt-3 flex items-center gap-1 text-xs text-amber-300">
            <span v-for="star in 5" :key="star">
              <span v-if="star <= Math.round(t.rating)" class="text-amber-300">★</span>
              <span v-else class="text-slate-600">★</span>
            </span>
            <span class="ml-1 text-[11px] text-slate-400">
              {{ t.rating.toFixed(1) }} / 5.0
            </span>
          </div>

          <p class="mt-3 flex-1 text-xs leading-relaxed text-slate-300 sm:text-[13px]">
            “{{ t.quote }}”
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

