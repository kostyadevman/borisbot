<template>
  <template v-if="lines">
    <svg style="position: absolute; left: 0; top: 0; z-index: -1" width="100vw" height="100vh"
    :style="{
      width: width + 'px',
      height: height + 'px',
    }"
    >
      <line
        v-for="(line, keyLine) in lines"
        :key="keyLine"
        v-bind="{ ...line }"
        stroke-width="1px"
        stroke="purple"
      />
    </svg>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Block from '@/models/Block'
import Link from '@/models/Link'
import { BLOCK_WIDTH } from '@/consts/consts'
import type { Circle, Line, LinkP, BlockP } from '@/types/types'

export default defineComponent({
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  computed: {
    blocks(): Block[] {
      return Block.query().get()
    },
    links(): Link[] {
      return Link.query().get()
    },
    lines(): Line[] {
      return this.links.reduce((acc: Line[], link: Link) => {
        const myLink = link as LinkP
        const startBlock = Block.find(myLink.start) as BlockP
        const endBlock = Block.find(myLink.end) as BlockP
        const x1 = startBlock.x + this.getOffsetX(myLink.startCircle) // абсцисса начала линии
        const y1 = startBlock.y + this.getOffsetY(myLink.startCircle) // ордината начала линии
        const x2 = endBlock.x + this.getOffsetX(myLink.endCircle) // абсцисса конца линии
        const y2 = endBlock.y + this.getOffsetY(myLink.endCircle) // ордината конца линии
        const line: Line = { x1, y1, x2, y2 }
        return acc.concat(line)
      }, [])
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandler)
  },
  unmouted() {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scrollHandler() {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.height = window.innerHeight + window.scrollY
      }
      if ((window.innerWidth + window.scrollX) >= document.body.scrollWidth) {
        this.width = window.innerWidth + window.scrollX
      }
    },
    getOffsetX(circle: Circle) {
      switch (circle) {
        case 'top':
          return BLOCK_WIDTH / 2
        case 'right':
          return BLOCK_WIDTH
        case 'bottom':
          return BLOCK_WIDTH / 2
        case 'left':
          return 0
        default:
          return 0
      }
    },

    getOffsetY(circle: Circle) {
      switch (circle) {
        case 'top':
          return 0
        case 'right':
          return BLOCK_WIDTH / 2
        case 'bottom':
          return BLOCK_WIDTH
        case 'left':
          return 50
        default:
          return 0
      }
    }
  }
})
</script>

<style scoped></style>
