export class DesignPage{
    constructor(page){
        this.page = page;
        this.canvas = page.locator('canvas#canvas');
        this.selectTool = page.locator('div#div-tooltip-top-menu-bar-pointer');
        this.carpetAreaInfo = page.locator('div.sidepanel.open_sidenav_new');
        this.rectangleTool = page.locator('div#div-tooltip-top-menu-bar-rectangle');
        this.switchTO3D_2DView = page.locator('div#viewToggle')
        this.cannotConstructMessage = page.locator('//div[@id = "default-toast"]/div');
    }

    async clickRectangleTool(){
        await this.rectangleTool.click();
        console.log('clicked rectangle tool');
    }


    async clickSelectTool(){
        await this.selectTool.click();
        console.log('clicked select tool');
    }

    async switchView(){
        await this.switchTO3D_2DView.click();
    }

    async selectRectangle(centerX, centerY) {
        await this.page.mouse.click(centerX, centerY);
        console.log('selected rectangle with center at (' + centerX + ', ' + centerY + ')');
    }
    
    async moveSelectedRectangle(toX, toY) {
        await this.page.mouse.down();
        await this.page.mouse.move(toX, toY, { steps: 10 });
        await this.page.mouse.up();
        console.log('moved selected rectangle to (' + toX + ', ' + toY + ')');
    }
}