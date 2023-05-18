const { Builder, By, Key } = require('selenium-webdriver');

(async function searchTicket() {
    // launch the browser
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.manage().setTimeouts({ implicit: 10000 });

        // navigate to our application
        await driver.get("https://www.makemytrip.com/railways/");

        await driver.sleep(2000); // Add a delay of 2 second

        await driver.manage().window().maximize();

        await driver.sleep(2000); // Add a delay of 2 second

        // Check if you have landed on the correct page
        const expectedUrl = 'https://www.makemytrip.com/railways/';
        const expectedTitle = 'Book Train Ticket Online From IRCTC Authorized Partner - MakeMyTrip';

        const actualUrl = await driver.getCurrentUrl();
        const actualTitle = await driver.getTitle();

        if (actualUrl === expectedUrl && actualTitle === expectedTitle) {
            console.log('Landed on the correct page 👍');
        } else {
            console.log('Landed on a different page ❌');
        }

        // Print the URL and Title of the page
        console.log('URL:', actualUrl);
        console.log('Title:', actualTitle);

        // enter the city, where journey start
        const fromCity = "Delhi";

        await driver.findElement(By.id('fromCity')).click();

        const selectFromCity = await driver.findElement(By.xpath('//div[@class="hsw_autocomplePopup autoSuggestPlugin "]/div/input'));
        await driver.sleep(2000); // Add a delay of 2 second
        selectFromCity.sendKeys(fromCity, Key.ENTER);

        await driver.sleep(3000); // Add a delay of 3 second

        const cityList = await driver.findElements(By.css('p[class="searchedResult font14 darkText"]'));

        for (let i = 0; i < cityList.length; i++) {
            const element = cityList[i];
            const text = await element.getText();

            if (text.includes(fromCity)) {
                await element.click();
                break;
            }
        }


        // enter the city, where journey end
        const toCity = "Lucknow";

        // await driver.findElement(By.id('toCity')).click();
        const selectToCity = await driver.findElement(By.xpath('//div[@class="hsw_autocomplePopup autoSuggestPlugin "]/div/input'));
        await driver.sleep(2000); // Add a delay of 2 second
        selectToCity.sendKeys(toCity, Key.ENTER);

        await driver.sleep(3000); // Add a delay of 3 second 

        const toCityList = await driver.findElements(By.css('p[class="searchedResult font14 darkText"]'));

        for (let i = 0; i < toCityList.length; i++) {
            const element = toCityList[i];
            const text = await element.getText();

            if (text.includes(toCity)) {
                await element.click();
                break;
            }
        }

        await driver.sleep(3000); // Add a delay of 3 second

        // select travel date
        const day = "Sat";
        const month = "May";
        const date = 20;
        const year = 2023;

        await driver.findElement(By.id('travelDate')).click();

        await driver.sleep(2000); // Add a delay of 2 second

        const selectDate = await driver.findElement(By.xpath(`//div[@aria-label="${day} ${month} ${date} ${year}"]`));
        await selectDate.sendKeys(`${year}-${month}-${date}`, Key.RETURN);

        await driver.sleep(2000); // Add a delay of 2 second

        // select class
        await driver.findElement(By.xpath('//span[@data-cy="class"]')).click();
        await driver.sleep(3000); // Add a delay of 3 second
        await driver.findElement(By.xpath('//li[@data-cy="3A"]')).click();

        // click on search button
        const searchButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div/div[2]/p/a'));
        await searchButton.click();

        await driver.sleep(8000); // Add a delay of 8 second


    } finally {
        // close the browser
        await driver.quit();
    }
})();
