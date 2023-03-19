import type { Model } from '@vuex-orm/core';

export type Circle = "top" | "right" | "bottom" | "left"

export interface BlockP extends Model {
    id: string;
    x: number;
    y: number;
}

export interface LinkP extends Model {
    end: string;
    start: string;
    endCircle: Circle;
    startCircle: Circle;
}

export interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}