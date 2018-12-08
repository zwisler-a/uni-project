// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require("jasmine-spec-reporter");
var HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");

const puppeteer = require("puppeteer");
puppeteer.executablePath();
const headlessOpts = ["--headless", "--no-sandbox", "--disable-dev-shm-usage"];

var reporter = new HtmlScreenshotReporter({
    dest: "e2e/screenshots",
    filename: "e2e-report.html"
});

exports.config = {
    allScriptsTimeout: 11000,
    specs: ["./src/**/*.e2e-spec.ts"],
    multiCapabilities: [
        {
            // Galaxy S5
            browserName: "chrome",
            chromeOptions: {
                args: ["--window-size=360,640", ...headlessOpts],
                binary: puppeteer.executablePath()
            }
        },
        {
            // IPad
            browserName: "chrome",
            chromeOptions: {
                args: ["--window-size=1024,768", ...headlessOpts],
                binary: puppeteer.executablePath()
            }
        },
        {
            // IPad
            browserName: "chrome",
            chromeOptions: {
                args: ["--window-size=1300,800", ...headlessOpts],
                binary: puppeteer.executablePath()
            }
        }
    ],
    directConnect: true,
    baseUrl: "http://localhost:4200/",
    framework: "jasmine",
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },

    /*
    beforeLaunch: function() {
        return new Promise(function(resolve) {
            reporter.beforeLaunch(resolve);
        });
    },*/

    onPrepare() {
        require("ts-node").register({
            project: require("path").join(__dirname, "./tsconfig.e2e.json")
        });
        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: { displayStacktrace: true }
            })
        );
        // jasmine.getEnv().addReporter(reporter);
    },

    // Close the report after all tests finish
    /* afterLaunch: function(exitCode) {
        return new Promise(function(resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }*/
};
