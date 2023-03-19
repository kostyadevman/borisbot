
<template>
  <div 
    class="block"
    ref="el"
    :style="{
      top: y + 'px',
      left: x + 'px',
    }"
    @mousedown="beginMove"
    @mouseup="endMove"
  >
  <div
      v-for="circle in circles"
      :key="circle"
      :class="[`circle ${circle}`, {'active': isSelected(block.id, circle)}]"
      @click="$emit('select-circle', block.id, circle)"
    >
  </div>
    <button class="delete-btn" @click="deleteClickHandler">x</button>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import type { Circle } from '@/types/types'


interface BlockItemData {
  element: HTMLElement,
  x: number,
  y: number,
  drag: boolean,
  shiftX: number,
  shiftY: number,
  circles: Circle[]
}

export default defineComponent({
  props: ["block", "selected"],
  data(): BlockItemData  {
    return {
      element: this.$refs.el as HTMLElement,
      x: 0,
      y: 0,
      drag: false,
      shiftX: 0,
      shiftY: 0,
      circles: ['top', 'right', 'bottom', 'left'],
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

      this.$emit('update', this.block, this.x, this.y)
    },
    endMove() {
      document.removeEventListener('mousemove', this.onMouseMove);
      this.element.onmouseup = null;
    },
    isSelected(id: string, circle: Circle) {
      console.log(`SELECTED`, this.$props.selected)
      if (this.$props.selected) {
        return this.$props.selected.startId === id && this.$props.selected.startCircle === circle
      }
      return false;
    }
  },
  mounted() {
    this.element = this.$refs.el as HTMLElement;
  }
})
</script>
  
<style scoped>
* {
  box-sizing: border-box;
}
.block {
  position: absolute;
  width: 100px;
  height: 100px;
  background: #4472c4;
  border: 2px solid #3e5f97;
}

.circle {
  position: absolute;
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: rgb(234, 123, 123);
  border: 2px solid #fff;
  border-radius: 50%;
}

.active {
  background: #70ad47;
}

.circle:hover {
  cursor: pointer;
}
.top {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.right {
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
}
.bottom {
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
}
.left {
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
}

.delete-btn {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
}

.block:hover .delete-btn {
  display: block;
  background: transparent;
  cursor: pointer;
}
  </style>