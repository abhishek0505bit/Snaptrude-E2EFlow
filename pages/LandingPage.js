export class LandingPage{
    constructor(page){
        this.page = page;
        this.url = 'https://app.snaptrude.com/';
        this.email = page.locator('input[type="email"]');
        this.password = page.locator('input[type="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async goto(){
        await this.page.goto(this.url);
        console.log('Navigated to ' + this.url);
    }

    async login(email, password){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
        console.log('Logged in');
    }
}