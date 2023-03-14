export class Grid {
    constructor(grid_size) {
        this.grid_rows = grid_size[0];
        this.grid_columns = grid_size[1];
        this.list_objects = [];
        this.grid_canvas = undefined;
        this.grid_ctx = undefined;
        this.grid_click_events = [];
    }
    generate_canvas(display_window) {
        this.grid_canvas = document.createElement("canvas");
        this.grid_canvas.width = this.grid_rows * 32 * 10;
        this.grid_canvas.height = this.grid_rows * 32 * 10;
        this.grid_ctx = this.grid_canvas.getContext("2d");
        this.grid_ctx.imageSmoothingEnabled = false;
        document.getElementById(display_window).appendChild(this.grid_canvas);
    }
    draw_grid() {
        this.grid_ctx.clearRect(0, 0, this.grid_canvas.width, this.grid_canvas.height);
        this.list_objects.forEach(val => {
            val.renderObject(this.grid_ctx);
        });
    }
}
//# sourceMappingURL=Grid.js.map