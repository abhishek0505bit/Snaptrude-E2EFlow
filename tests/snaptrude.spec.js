import { test, expect } from '@playwright/test';
import { DesignPage } from '../pages/DesignPage';
import { LandingPage } from '../pages/LandingPage';
import { DashboardPage } from '../pages/DashboardPage';
import dotenv from 'dotenv';


dotenv.config();



test('snaptrude e2e flow test includes login, creating project, creating rectangle and ', async ({ page }) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // Functional (Positve test case)
    await test.step('Login with valid credentials and create a new project', async () => {
        const landingPage = new LandingPage(page);
        const dashboardPage = new DashboardPage(page);
        await landingPage.goto();
        await landingPage.login(email, password);
        await expect(page).toHaveURL('https://app.snaptrude.com/login');

        await dashboardPage.clickNewProjectButton();
        await dashboardPage.createNewProject('Test Project');

        // await dashboardPage.clickOnExistingProject();
        await page.waitForTimeout(5000);


    });


    // Functional (Positve test case)
    await test.step('should draw a rectangle and finalize it', async () => {

        const designPage = new DesignPage(page);
        // expect canvas locator to be visible
        await designPage.canvas.waitFor();
        await expect(designPage.canvas).toBeVisible();


        // wait for 3 seconds
        await designPage.clickRectangleTool();

        // wait for 5 seconds
        await page.waitForTimeout(3000);

        await designPage.carpetAreaInfo.waitFor({ state: 'visible', timeout: 10000 });
        await expect(designPage.carpetAreaInfo).toBeVisible();

        // Ensure all fonts are loaded
        await page.evaluate(async () => {
            await document.fonts.ready;
        });

        // Disable CSS animations & transitions globally
        await page.addStyleTag({
            content: `
            *, *::before, *::after {
            transition: none !important;
            animation: none !important;
            }
        `
        });

        // Optional: wait for a short buffer (UI settle time)
        await page.waitForTimeout(1000);

        // Now take screenshot with a small threshold and higher timeout
        await expect(designPage.carpetAreaInfo).toHaveScreenshot('sidebar-before.png', {
            threshold: 0.2,      // allow some pixel variance
            timeout: 20000       // wait longer for stability
        });

        // Get canvas box position, at the center
        const box = await designPage.canvas.boundingBox();

        // console.log(`the value of canvas bounding box is ${box}`);
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;

        // Click on canvas
        await page.mouse.click(startX, startY);
        await page.mouse.move(startX + 80, startY + 80);
        await page.mouse.click(startX + 80, startY + 80);
        await page.waitForTimeout(3000);

        await expect(designPage.carpetAreaInfo).toHaveScreenshot('sidebar-after.png');

    });


    // Functional (Positve test case)
    await test.step('rectangle can be moved after the rectangle is created', async () => {
        const designPage = new DesignPage(page);
        // validate with screenshot
        const box = await designPage.canvas.boundingBox();

        console.log(`the value of canvas bounding box is ${box}`);
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;

        await page.waitForTimeout(3000);
        const beforeBuffer = await designPage.canvas.screenshot();

        await designPage.clickSelectTool();
        await designPage.selectRectangle(startX + 40, startY + 40);
        await designPage.moveSelectedRectangle(startX + 140, startY + 140);

        await page.waitForTimeout(3000);
        const afterBuffer = await designPage.canvas.screenshot();
        expect(beforeBuffer.equals(afterBuffer)).toBeFalsy();
        await page.waitForTimeout(3000);


    });


    // Functional (Negative test case)
    await test.step('should not create a rectangle of zero height and width', async () => {

        const designPage = new DesignPage(page);

        // Clear canvas (Ctrl+A → Delete)
        await page.keyboard.down('Control');
        await page.keyboard.press('a');
        await page.keyboard.up('Control');
        await page.keyboard.press('Delete');
        console.log('Cleared Canvas');

        // Get canvas box position
        const box = await designPage.canvas.boundingBox();
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;

        await designPage.clickRectangleTool();


        // Click on canvas
        await page.mouse.click(startX, startY);

        // Move + click by offsets
        await page.mouse.move(startX + 80, startY);
        await page.mouse.click(startX + 80, startY);

        await designPage.cannotConstructMessage.waitFor();
        // validate error message is visible
        await expect(designPage.cannotConstructMessage).toBeVisible();
        //validate error message text
        await expect(designPage.cannotConstructMessage).toHaveText('Cannot construct rectangle. Operation cancelled!');
        await page.waitForTimeout(3000);

    });

    // Performance 
    await test.step('should create 100 rectangles', async () => {

        const designPage = new DesignPage(page);

        // Make sure canvas is visible
        await designPage.canvas.waitFor();
        await expect(designPage.canvas).toBeVisible();

        // Get initial canvas position and size
        const box = await designPage.canvas.boundingBox();

        for (let i = 1; i <= 100; i++) {
            await designPage.clickRectangleTool();

            // Calculate shifted X and Y positions
            const offset = i * 10; // adjust step size as needed to avoid overlap
            const startX = box.x + (box.width / 4) + offset;
            const startY = box.y + (box.height / 4) + offset;

            // Draw rectangle
            await page.mouse.click(startX, startY);
            await page.mouse.move(startX + 50, startY + 50); // rectangle size
            await page.mouse.click(startX + 50, startY + 50);


            console.log(`Rectangle ${i} created at (${startX}, ${startY})`);
        }

        await page.waitForTimeout(5000);
    });


    // Cleanup
    await test.step('delete created file to avoid clutter', async () => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.deleteProject();
    });




});