const express = require("express");
const puppeteer = require("puppeteer");
require('dotenv').config();

function generatePDF(incrementCount) {
    return async (req, res) => {
        try {
            const { html } = req.body;
            if (!html) return res.status(400).json({ error: "HTML content required" });

            const browser = await puppeteer.launch({
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
                headless: "new",
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });

            const page = await browser.newPage();
            await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
            await page.setContent(html, { waitUntil: "networkidle0" });
            await page.evaluateHandle("document.fonts.ready");

            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
            });

            await browser.close();
            await incrementCount();

            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="cover-${Date.now()}.pdf"`,
            }).send(pdfBuffer);
        } catch (error) {
            console.error("PDF Generation Error:", error);
            res.status(500).json({ error: "Failed to generate PDF" });
        }
    };
}

module.exports = { generatePDF };