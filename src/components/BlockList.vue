<template>
  <button class="add" @click="addBlockHandler">ADD BLOCK</button>
  <block-item
    :block="block"
    :width="blockWidth"
    :selected="selected"
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
import { BLOCK_WIDTH } from '@/consts/consts'
import type { BlockP, LinkP, Circle, Nullable, SelectedCircle } from '@/types/types'

export default defineComponent({
  components: { BlockItem },
  data(): { selected: Nullable<SelectedCircle>, blockWidth: number } {
    return {
      selected: null,
      blockWidth: BLOCK_WIDTH
    }
  },
  computed: {
    blocks(): Block[] {
      return Block.query().get()
    }
  },
  methods: {
    addBlockHandler(): void {
      Block.insert({ data: { id: null } })
    },
    deleteBlockHandler(block: BlockP): void {
      block.$delete()
      Link.delete((link: Link) => {
        const myLink = link as LinkP
        return myLink.start === block.id || myLink.end === block.id
      })
    },
    updataBlockHandler(block: Block, x: number, y: number): void {
      block.$update({ x, y })
    },
    selectHandler(id: string, circle: Circle): void {
      if (this.selected && this.selected.startId === id) {
        this.selected = null
        return
      }

      if (this.selected) {
        Link.insert({
          data: {
            id: null,
            start: this.selected.startId,
            startCircle: this.selected.startCircle,
            end: id,
            endCircle: circle
          }
        })
        this.selected = null
      } else {
        this.selected = { startId: id, startCircle: circle }
      }
    }
  }
})
</script>

<style scoped>
.add {
  position: absolute;
  right: 0;
  padding: 10px;
  background: rgb(0, 200, 255);
  border: none;
  cursor: pointer;
}

.add:hover {
  opacity: 0.9;
}

.add:active {
  opacity: 0.7;
}
</style>
