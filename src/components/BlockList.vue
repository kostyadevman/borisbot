<template>
  <button class="icon" @click="addBlockHandler">
      ADD BLOCK
  </button>
  <block-item 
      class="block"
      :block="block"
      :key="block.id" 
      v-for="block in blocks" 
      @delete="deleteBlockHandler"
      @update="updataBlockHandler"
      >
    </block-item>
</template>

<script lang="ts">
import Block from '@/models/Block'
import BlockItem from '@/components/BlockItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BlockItem },
  computed: {
    blocks (): Block[] {
      return Block.query().get()
    }
  },
  methods: {
    addBlockHandler (): void {
      Block.insert({ data: { id: null } })
    },
    deleteBlockHandler (block: Block): void {
      block.$delete()
    },
    updataBlockHandler(block: Block, {x, y}): void {
      console.log(`sewe`)
      block.$update({x, y})
    }
  }
})
</script>

<style scoped>
.block {
    display: flex;
    width: 100px;
    height: 100px;
    background: blue;

}
</style>