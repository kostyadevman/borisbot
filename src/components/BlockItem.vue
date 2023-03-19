
<template>
  <div  
    ref="el"
    :style="{
      top: y + 'px',
      left: x + 'px',
    }"
    @mousedown="beginMove"
    @mouseup="endMove"
  >
    <button @click="deleteClickHandler">x</button>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import Block from '@/models/Block'

export default defineComponent({
  props: { block: Block},
  data(): {element: HTMLElement, x: number, y: number, drag: boolean, shiftX: number, shiftY: number}  {
    return {
      element: this.$refs.el as HTMLElement,
      x: 0,
      y: 0,
      drag: false,
      shiftX: 0,
      shiftY: 0,
    }
  },
  methods: {
    deleteClickHandler() {
      this.$emit('delete', this.block)
    },
    beginMove(event: MouseEvent) {
      this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
      this.shiftY = event.clientY - this.element.getBoundingClientRect().top;
      this.element.ondragstart = () => false;
      this.moveAt(event);
      document.addEventListener('mousemove', this.onMouseMove);
    },
    onMouseMove(event: MouseEvent) {
      this.moveAt(event);
    },
    moveAt(event: MouseEvent) {
      this.x = event.pageX - this.shiftX;
      this.y = event.pageY - this.shiftY;

      this.$emit('update', this.block, {x: this.x, y: this.y})
    },
    endMove() {
      document.removeEventListener('mousemove', this.onMouseMove);
      this.element.onmouseup = null;
    },
  },
  mounted() {
    this.element = this.$refs.el as HTMLElement;
  }
})
</script>
  
  <style scoped>
  .block {
      position: absolute;
      display: flex;
      width: 100px;
      height: 100px;
      background: blue;
  }
  </style>