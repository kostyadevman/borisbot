
<template>
  <template v-if="lines">
    <svg
      style="position: absolute; left: 0; top: 0; z-index: -1"
      width="100vw"
      height="100vh"
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
import type { Circle, Line, LinkP, BlockP } from '@/types/types';
  

export default defineComponent({
    computed: {
        blocks(): Block[] {
            return Block.query().get()
        },
        links(): Link[] {
            return Link.query().get()
        },
        lines(): Line[] {
              return this.links.reduce((acc: Line[], link: Link) => {
                const myLink = link as LinkP;
                const startBlock = Block.find(myLink.start) as BlockP
                const endBlock = Block.find(myLink.end) as BlockP;
                endBlock?.x
                const x1 = startBlock.x + this.getOffsetX(myLink.startCircle); // абсцисса начала линии
                const y1 = startBlock.y + this.getOffsetY(myLink.startCircle); // ордината начала линии
                const x2 = endBlock.x + this.getOffsetX(myLink.endCircle); // абсцисса конца линии
                const y2 = endBlock.y +this. getOffsetY(myLink.endCircle); // ордината конца линии
                const line: Line = {x1, y1, x2, y2}
                return acc.concat(line);
              }, []);
        }
    },
    methods: {
        getOffsetX(circle: Circle) {
            switch (circle) {
                case "top":
                    return 50;
                case "right":
                    return 100;
                case "bottom":
                    return 50;
                case "left":
                    return 0;
                default:
                    return 0;
        }
        },

        getOffsetY(circle: Circle) {
            switch (circle) {
                case "top":
                    return 0;
                case "right":
                    return 50;
                case "bottom":
                    return 100;
                case "left":
                    return 50;
                default:
                    return 0;
            }
        }
    }
})
</script>
    
<style scoped>
</style>