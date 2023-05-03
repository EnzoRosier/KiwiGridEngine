import { GameObject } from "./GameObjectClass.js";
import { ClickEvent } from "./Events.js";

export class Grid {
    grid_rows: number;
    grid_columns: number;
    map_objects: Map<number[], GameObject>
    //list_objects: GameObject[]
    grid_canvas: HTMLCanvasElement;
    grid_ctx: CanvasRenderingContext2D;
    grid_click_events: ClickEvent[];

    constructor(grid_size: number[]) {
        this.grid_rows = grid_size[0];
        this.grid_columns = grid_size[1];
        this.map_objects = new Map<number[], GameObject>();
        this.grid_canvas = undefined;
        this.grid_ctx = undefined;
    }

    generate_canvas(display_window: string) {
        this.grid_canvas = document.createElement("canvas");
        this.grid_canvas.width = 3200;
        this.grid_canvas.height = 3200;
        this.grid_ctx = this.grid_canvas.getContext("2d");
        this.grid_ctx.imageSmoothingEnabled = false;
        document.getElementById(display_window).appendChild(this.grid_canvas);
    }

    draw_grid(zoom: number, zoom_pos: number[]) {
        this.grid_ctx.clearRect(0, 0, this.grid_canvas.width, this.grid_canvas.height);
        this.map_objects.forEach(val => {
            val.stopObjectRender();
            if (val.pos_X >= zoom_pos[0] && val.pos_X < zoom + zoom_pos[0]
                && val.pos_Y >= zoom_pos[1] && val.pos_Y < zoom + zoom_pos[1]) {
                val.renderObject(this.grid_ctx, zoom, zoom_pos);
            }

        });
    }

    addObject(object: GameObject) {
        this.map_objects.set([object.pos_X, object.pos_Y], object);
    }

}


