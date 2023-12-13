<script setup lang="ts">
import PodcastEmptyPlaceholder from './components/PodcastEmptyPlaceholder.vue'

// import EmptyPlaceholder from '@/components/EmptyPlaceholder.vue'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

definePageMeta({
  layout: 'app-layout',
})

const router = useRouter()
const routes = [{
  name: 'Question Bank',
  path: '/questionbank',
},
{
  name: 'Quiz Bank',
  path: '/quizbank',
}]
</script>

<template>
  <div class="block">
    <!-- <Menu /> -->
    <div class="border">
      <div class="bg-background">
        <div class="grid lg:grid-cols-5">
          <!-- <Sidebar :playlists="playlists" class="hidden lg:block" /> -->
          <div class="col-span-3 lg:col-span-12">
            <div class="h-full p-4">
              <Tabs default-value="navigation" class="h-full space-y-6">
                <div class="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="navigation" class="relative">
                      Navigation
                    </TabsTrigger>
                    <TabsTrigger value="music" class="relative">
                      Music
                    </TabsTrigger>
                    <TabsTrigger value="podcasts">
                      Podcasts
                    </TabsTrigger>
                    <!-- <TabsTrigger value="live">
                      Live
                    </TabsTrigger> -->
                  </TabsList>
                </div>
                <TabsContent
                  value="navigation"
                  class="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <h2 class="text-2xl font-semibold tracking-tight">
                        Navigation
                      </h2>
                      <p class="text-sm text-muted-foreground">
                        Quickly access all modules
                      </p>
                    </div>
                  </div>
                  <Separator class="my-4" />
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button v-for="route in routes" :key="route.name" variant="outline" size="lg" class="w-full h-24" @click="router.push({ path: route.path })">
                      {{ route.name }}
                      <Icon name="radix-icons:arrow-right" class="ms-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent
                  value="music"
                  class="border-none p-0 outline-none"
                >
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <h2 class="text-2xl font-semibold tracking-tight">
                        Listen Now
                      </h2>
                      <p class="text-sm text-muted-foreground">
                        Top picks for you. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator class="my-4" />
                  <div class="relative">
                    <!-- <ScrollArea>
                      <div class="flex space-x-4 pb-4">
                        <AlbumArtwork
                          v-for="album in listenNowAlbums"
                          :key="album.name"
                          :album="album"
                          class="w-[250px]"
                          aspect-ratio="portrait"
                          :width="250"
                          :height="330"
                        />
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea> -->
                  </div>
                  <div class="mt-6 space-y-1">
                    <h2 class="text-2xl font-semibold tracking-tight">
                      Made for You
                    </h2>
                    <p class="text-sm text-muted-foreground">
                      Your personal playlists. Updated daily.
                    </p>
                  </div>
                  <Separator class="my-4" />
                  <div class="relative">
                    <!-- <ScrollArea>
                      <div class="flex space-x-4 pb-4">
                        <AlbumArtwork
                          v-for="album in madeForYouAlbums"
                          :key="album.name"
                          :album="album"
                          class="w-[150px]"
                          aspect-ratio="square"
                          :width="150"
                          :height="150"
                        />
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea> -->
                  </div>
                </TabsContent>
                <TabsContent
                  value="podcasts"
                  class="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div class="flex items-center justify-between">
                    <div class="space-y-1">
                      <h2 class="text-2xl font-semibold tracking-tight">
                        New Episodes
                      </h2>
                      <p class="text-sm text-muted-foreground">
                        Your favorite podcasts. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator class="my-4" />
                  <PodcastEmptyPlaceholder />
                </TabsContent>
                <!-- <TabsContent
                  value="live"
                  class="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <EmptyPlaceholder icon="lucide:wifi-off" title="Network Error" text="Failed to connect, please try again later." />
                </TabsContent> -->
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
