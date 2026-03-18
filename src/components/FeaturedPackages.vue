<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'packages',
  },
  title: {
    type: String,
    default: 'Featured travel packages',
  },
  subtitle: {
    type: String,
    default:
      'Hand‑curated escapes with stays, experiences, and flows designed for modern travelers.',
  },
  packages: {
    type: Array,
    required: true,
    default: () => [],
  },
  limit: {
    type: Number,
    default: null,
  },
  showViewMore: {
    type: Boolean,
    default: false,
  },
  viewMoreHref: {
    type: String,
    default: '',
  },
})

const displayedPackages = computed(() =>
  typeof props.limit === 'number' && props.limit > 0
    ? props.packages.slice(0, props.limit)
    : props.packages,
)
</script>

<template>
  <section :id="id" class="border-b border-slate-800/80 bg-slate-950">
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            {{ title }}
          </h2>
          <p class="mt-2 max-w-xl text-sm text-slate-400 sm:text-[15px]">
            {{ subtitle }}
          </p>
        </div>
        <p class="text-xs text-slate-500 sm:text-[13px]">
          Browse ideas below, then fine‑tune everything with your travel designer.
        </p>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="pkg in displayedPackages"
          :key="pkg.id"
          class="group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-sm transition-transform transition-shadow duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/40"
        >
          <!-- Image -->
          <div class="relative h-40 w-full overflow-hidden sm:h-44">
            <img
              :src="pkg.image"
              :alt="pkg.destination"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <div class="absolute bottom-3 left-3 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-200/40">
              {{ pkg.duration }}
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col gap-3 p-4 sm:p-5">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
                  {{ pkg.tag }}
                </p>
                <h3 class="mt-1 text-sm font-semibold text-slate-50 sm:text-base">
                  {{ pkg.destination }}
                </h3>
              </div>
              <div class="text-right">
                <p class="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  From
                </p>
                <p class="text-sm font-semibold text-emerald-300">
                  {{ pkg.price }}
                </p>
              </div>
            </div>

            <p class="text-xs leading-relaxed text-slate-300 sm:text-[13px]">
              {{ pkg.description }}
            </p>

            <div class="mt-auto flex items-center justify-between pt-1 text-[11px] text-slate-400">
              <p>{{ pkg.included }}</p>
              <p class="flex items-center gap-1">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {{ pkg.rating }} rating
              </p>
            </div>

            <RouterLink
              :to="`/packages/${pkg.id}`"
              class="mt-3 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              View Details
            </RouterLink>
          </div>
        </article>
      </div>

      <div v-if="showViewMore && viewMoreHref" class="mt-8 flex justify-center">
        <a
          :href="viewMoreHref"
          class="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-sm font-medium text-slate-100 transition hover:border-emerald-400 hover:text-emerald-200"
        >
          View more packages
        </a>
      </div>
    </div>
  </section>
</template>
