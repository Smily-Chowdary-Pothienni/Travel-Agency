<script setup>
import { computed, ref } from 'vue'

const isOpen = ref(false)

const links = [
  { id: 'home', label: 'Home', to: { path: '/', hash: '#hero' } },
  { id: 'packages', label: 'Packages', to: { path: '/', hash: '#packages' } },
  { id: 'about', label: 'About', to: { path: '/', hash: '#about' } },
  { id: 'contact', label: 'Contact', to: { path: '/', hash: '#contact' } },
]

const toggleLabel = computed(() => (isOpen.value ? 'Close menu' : 'Open menu'))

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <!-- Logo -->
      <RouterLink :to="{ path: '/', hash: '#hero' }" class="group flex items-center gap-2" @click="closeMenu">
        <span
          class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/10 text-lg font-semibold text-emerald-400 ring-1 ring-emerald-400/40 transition group-hover:ring-emerald-300/60"
        >
          TA
        </span>
        <span class="text-sm font-semibold tracking-tight text-slate-50 transition group-hover:text-emerald-200 sm:text-base">
          Dream Mile Travels
        </span>
      </RouterLink>

      <!-- Desktop menu (laptop and up) -->
      <div class="hidden items-center gap-8 text-sm font-medium text-slate-200 lg:flex">
        <RouterLink
          v-for="link in links"
          :key="link.id"
          :to="link.to"
          class="rounded-md px-1 py-1 transition hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <!-- Mobile hamburger (below laptop) -->
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 p-2 text-slate-200 transition hover:border-slate-600 hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 lg:hidden"
        :aria-label="toggleLabel"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu panel -->
    <div
      v-show="isOpen"
      id="mobile-menu"
      class="lg:hidden"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <div class="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div class="rounded-2xl border border-slate-800 bg-slate-950/90 p-2 shadow-xl shadow-black/30">
          <RouterLink
            v-for="link in links"
            :key="link.id"
            :to="link.to"
            class="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-900/70 hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            @click="closeMenu"
          >
            <span>{{ link.label }}</span>
            <span class="text-xs text-slate-500">↵</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
