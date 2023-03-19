<template>
  <button class="icon" @click="addBlockHandler">
      ADD BLOCK
  </button>
  <block-item 
    :block="block"
    :key="`${block?.$id}`" 
    v-for="block in blocks" 
    @delete="deleteBlockHandler"
    @update="updataBlockHandler"
    @select-circle="selectHandler"
  >
  </block-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BlockItem from '@/components/BlockItem.vue'
import Block from '@/models/Block'
import Link from '@/models/Link'

type Nullable<T> = T | null;
  
interface SelectedCircle {
  startId: string,
  startCircle: string
}


export default defineComponent({
  components: { BlockItem },
  data(): { selected: Nullable<SelectedCircle>} {
    return {
      selected: null,
    }
  },
  computed: {
    blocks (): Block[] {
      return Block.query().get()
    }
  },
  methods: {
    addBlockHandler(): void {
      Block.insert({ data: { id: null } })
    },
    deleteBlockHandler(block: Block): void {
      block.$delete()
    },
    updataBlockHandler(block: Block, x: number, y: number): void {
      block.$update({x, y})
    },
    selectHandler(id: string, circle: string): void {
      // console.log(`SELECTED`, this.selected.startId, id)
      if (this.selected && (this.selected.startId === id)) {
        console.log(`SAME_BLOCK`)
        return;
      }
      
      if (this.selected) {
        Link.insert({data: {
            id: null,
            start: this.selected.startId,
            startCircle: this.selected.startCircle,
            end: id,
            endCircle: circle,
          }
        })
        this.selected = null;
      } else {
       this.selected = { startId: id, startCircle: circle }
      }
    }
  }
})
</script>

<style scoped>

</style>