import { waitForDebugger } from "inspector";

export class DashboardPage{
    constructor(page){
        this.page = page;
        this.newProjectButton = page.locator('#new-project-button');
        this.projectNameInput = page.locator('#create-project-name');
        this.createButton = page.locator('//button[text() = "Create"]');
        this.existingProject = page.locator('//div//input[@value="Test Project"]');
        this.snaptrudeLogo = page.locator('#a-logo-with-interaction-container');
        this.moreOptions = page.locator('div.sc-cJAKoS.dNrIZs.dropdown').first();
        this.deleteButton = page.locator('//div[contains(text(),"Delete")]').first();
        this.latestCreatedModel = page.locator('div.sc-gYGZqq.bmfAuX').first();
        this.finalDeleteButton = page.locator('//button[normalize-space()="Delete"]');

    }

    async clickNewProjectButton(){
        await this.newProjectButton.click();
        console.log('clicked new project button');
    }

    async clickOnExistingProject(){
        await this.existingProject.click();
        console.log('clicked on existing project');
        
    }
    async createNewProject(projectName){
        // const generatedProjectName = this.generateProjectName(projectName);
        await this.projectNameInput.fill(projectName);
        await this.createButton.click();
        console.log('created new project');

    }

    async deleteProject(){
        await this.snaptrudeLogo.click();
        await this.page.waitForTimeout(3000);
        // await this.moreOptions.waitFor();
        await this.latestCreatedModel.hover();
        await this.moreOptions.click();
        await this.deleteButton.waitFor();
        await this.deleteButton.click();
        await this.finalDeleteButton.click();
        await this.page.waitForTimeout(3000);
        console.log('deleted project');

    }



    generateProjectName(projectName){
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${projectName} ${year}-${month}-${day}-${hours}_${minutes}_${seconds}`;
    }



}