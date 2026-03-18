<script setup>
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import FeaturedPackages from '../components/FeaturedPackages.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import BookingForm from '../components/BookingForm.vue'
import allPackages from '../data/packages.json'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-50">
    <Navbar />

    <main class="flex-1">
      <HeroSection />

      <FeaturedPackages
        id="packages"
        title="Featured travel packages"
        subtitle="Hand‑picked trips to spark ideas for your next escape."
        :packages="allPackages"
        :limit="3"
        :show-view-more="true"
        view-more-href="/packages"
      />

      <!-- About -->
      <section id="about" class="border-b border-slate-800/80 bg-slate-950">
        <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div class="grid gap-8 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
            <div>
              <h2 class="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Thoughtful planning, from first idea to final landing.
              </h2>
              <p class="mt-3 max-w-xl text-sm text-slate-400 sm:text-[15px]">
                We act as your dedicated travel design studio—learning how you like to move, the
                pace you prefer, and the details that feel like you. Every journey is built from
                scratch with a focus on balance, flow, and a sense of place.
              </p>
              <div class="mt-6 grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
                <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Before you go
                  </p>
                  <p class="mt-2 text-[13px] text-slate-300">
                    Expert route design, accommodation research, and restaurant shortlists—delivered
                    in a clean digital itinerary.
                  </p>
                </div>
                <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    While you travel
                  </p>
                  <p class="mt-2 text-[13px] text-slate-300">
                    Real‑time support, local partners on the ground, and gentle adjustments when you
                    want to linger a little longer.
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-4 text-sm text-slate-300">
              <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  For modern travelers
                </p>
                <p class="mt-2 text-[13px] text-slate-300">
                  We design with flexibility in mind—remote work, extended stays, and slow travel
                  are baked into our approach.
                </p>
              </div>
              <div class="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  Transparent pricing
                </p>
                <p class="mt-2 text-[13px] text-slate-300">
                  Clear line‑item breakdowns and no hidden mark‑ups. We recommend what we’d book for
                  ourselves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <!-- Contact -->
      <section id="contact" class="bg-slate-950">
        <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <h2 class="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
                Ready to start planning?
              </h2>
              <p class="mt-3 max-w-xl text-sm text-slate-400 sm:text-[15px]">
                Share a few details about how you like to travel and we’ll follow up with a
                first‑draft itinerary and pricing outline within 24–48 hours.
              </p>
              <ul class="mt-5 space-y-2 text-sm text-slate-300">
                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  No obligation, no spam—just ideas.
                </li>
                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Ideal for trips 3+ months out.
                </li>
              </ul>
            </div>
            <BookingForm mode="inquiry" />
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-slate-800/80 bg-slate-950">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <p>&copy; {{ new Date().getFullYear() }} Skyline Travels. All rights reserved.</p>
        <div class="flex flex-wrap gap-3">
          <a href="#hero" class="transition hover:text-emerald-300">Back to top</a>
          <span class="hidden text-slate-700 sm:inline">·</span>
          <a href="#contact" class="transition hover:text-emerald-300">Plan your next escape</a>
        </div>
      </div>
    </footer>
  </div>
</template>

