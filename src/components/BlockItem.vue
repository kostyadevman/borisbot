<template>
  <div
    class="block"

    ref="el"
    :style="{
      width: width + 'px',
      height: width + 'px',
      top: y + 'px',
      left: x + 'px'
    }"
    @mousedown="beginMove"
    @mouseup="endMove"
  >
    <div
      v-for="circle in circles"
      :key="circle"
      :class="[
        `circle ${circle}`,
        {
          linked: isLinked(block.id, circle),
          active: isSelected(block.id, circle)
        }
      ]"
      @click="$emit('select-circle', block.id, circle)"
    >
      <button class="delete-links-btn" @click="deleteLinksHandler(block, circle)">x</button>
    </div>
    <button class="delete-btn" @click="deleteBlockHandler">x</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { BlockP, Circle, LinkP } from '@/types/types'
import Link from '@/models/Link'

interface BlockItemData {
  element: HTMLElement
  x: number
  y: number
  drag: boolean
  shiftX: number
  shiftY: number
  circles: Circle[]
}

export default defineComponent({
  props: ['block', 'selected', 'width'],
  data(): BlockItemData {
    return {
      element: this.$refs.el as HTMLElement,
      x: 0,
      y: 0,
      drag: false,
      shiftX: 0,
      shiftY: 0,
      circles: ['top', 'right', 'bottom', 'left']
    }
  },
  methods: {
    deleteBlockHandler() {
      this.$emit('delete', this.block)
    },
    deleteLinksHandler(block: BlockP, circle: Circle) {
      Link.delete((link: Link) => {
        const myLink = link as LinkP
        return (
          (myLink.start === block.id && myLink.startCircle === circle) ||
          (myLink.end === block.id && myLink.endCircle === circle)
        )
      })
    },
    beginMove(event: MouseEvent) {
      this.shiftX = event.clientX - this.element.getBoundingClientRect().left
      this.shiftY = event.clientY - this.element.getBoundingClientRect().top
      this.element.ondragstart = () => false
      this.moveAt(event)
      document.addEventListener('mousemove', this.onMouseMove)
    },
    onMouseMove(event: MouseEvent) {
      this.moveAt(event)
    },
    moveAt(event: MouseEvent) {
      this.x = event.pageX - this.shiftX
      this.y = event.pageY - this.shiftY

      this.$emit('update', this.block, this.x, this.y)
    },
    endMove() {
      document.removeEventListener('mousemove', this.onMouseMove)
      this.element.onmouseup = null
    },
    isSelected(id: string, circle: Circle) {
      if (this.$props.selected) {
        return this.$props.selected.startId === id && this.$props.selected.startCircle === circle
      }
      return false
    },
    isLinked(id: string, circle: Circle) {
      const links = Link.query()
        .where((link: Link) => {
          const myLink = link as LinkP
          return (
            (myLink.start === id && myLink.startCircle === circle) ||
            (myLink.end === id && myLink.endCircle === circle)
          )
        })
        .get()

      return links.length > 0
    }
  },
  mounted() {
    this.element = this.$refs.el as HTMLElement
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.block {
  position: absolute;
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

.linked {
  background: #a619c2;
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

.delete-links-btn {
  display: none;
  position: absolute;
  top: -20px;
  right: 10px;
  background: transparent;
  border: none;
}

.linked.active .delete-links-btn {
  display: block;
  background: transparent;
  cursor: pointer;
}

.block:hover .delete-btn {
  display: block;
  background: transparent;
  cursor: pointer;
}
</style>
