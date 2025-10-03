const fs = require("fs");
const path = require("path");

// Create dist folder if it doesn't exist
const distDir = path.join(__dirname, "dist");
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// Template HTML (replace {{PHONE && ...}} with {{PHONE_BLOCK}})
const template = `
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body style="margin: 0; padding: 0">
        <table cellpadding="0" cellspacing="0" border="0" width="500" style="font-family: Arial, sans-serif; font-size: 12px; line-height: 22px; color: #0a2d2d; table-layout: fixed;">
            <tbody>
                <tr>
                    <!-- Left Column -->
                    <td valign="top" width="230" style="padding-right: 10px; padding-top: 7px; white-space: nowrap;">
                        <div style="font-size: 25px; font-weight: bold; color: #0a2d2d; padding-bottom: 3px; white-space: nowrap;">
                            {{FIRSTNAME}} {{LASTNAME}}
                        </div>
                        <div style="font-size: 16px; color: #0a2d2d; white-space: nowrap;">
                            {{ROLE}}
                        </div>
                        <div style="margin-top: 1px; font-weight: bold; color: #e20046;">
                            Main Office
                        </div>
                        <div style="line-height: 17px">
                            <div>The Waterman Centre Level 2 UL40/1341</div>
                            <div>Dandenong Road, Chadstone VIC 3148, Aus</div>
                        </div>
                        <!-- Buttons omitted for brevity -->
                    </td>

                    <!-- Right Column -->
                    <td valign="top" width="230" style="border-left: 1px solid #cccccc; padding-left: 10px; white-space: nowrap;">
                        <a href="https://infusion121.com.au" target="_blank">
                            <img src="https://infusion121.com.au/email-signature/infusion121.png" alt="Infusion121" width="191" style="display: block; border: 0; outline: none; text-decoration: none;" />
                        </a>

                        <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 6px; font-size: 12px; color: #0a2d2d; line-height: 19px; white-space: nowrap;">
                            <tbody>
                                <tr>
                                    <td style="padding-right: 8px">
                                        <img src="https://infusion121.com.au/email-signature/icon-envelop.png" alt="Email" width="17" height="17" style="display: block; border: 0" />
                                    </td>
                                    <td>
                                        <a href="mailto:{{EMAIL}}" style="color: #0a2d2d; text-decoration: none; font-size: 12px; white-space: nowrap;">
                                            {{EMAIL}}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-right: 8px">
                                        <img src="https://infusion121.com.au/email-signature/icon-telephone.png" alt="Phone" width="17" height="17" style="display: block; border: 0" />
                                    </td>
                                    <td>
                                        <a href="tel:{{TELEPHONE}}" style="color: #0a2d2d; text-decoration: none; font-size: 12px; white-space: nowrap;">
                                            {{TELEPHONE}}
                                        </a>
                                    </td>
                                </tr>

                                {{PHONE_BLOCK}}

                                <tr>
                                    <td style="padding-right: 8px">
                                        <img src="https://infusion121.com.au/email-signature/icon-globe-2.png" alt="Website" width="17" height="17" style="display: block; border: 0" />
                                    </td>
                                    <td>
                                        <a href="https://www.infusion121.com.au" style="color: #0a2d2d; text-decoration: none; font-size: 12px; white-space: nowrap;">
                                            www.infusion121.com.au
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
`;

// Team data
const people = [
    {
        FIRSTNAME: "Sarniel",
        LASTNAME: "Morgia",
        ROLE: "Web Developer",
        EMAIL: "niel.m@infusion121.com",
        TELEPHONE: "1300 108 507",
    },
    {
        FIRSTNAME: "Janine",
        LASTNAME: "Sebastian",
        ROLE: "Agency Traffic Manager",
        EMAIL: "janine.s@infusion121.com",
        TELEPHONE: "1300 108 507",
    },
    {
        FIRSTNAME: "Ram",
        LASTNAME: "Zabate",
        ROLE: "Marketing Co-Ordinator",
        EMAIL: "ram.z@infusion121.com",
        TELEPHONE: "1300 108 507",
    },
    {
        FIRSTNAME: "Brian",
        LASTNAME: "Hanna",
        ROLE: "Founder and CEO",
        EMAIL: "brianh@infusion121.com",
        TELEPHONE: "1300 108 507",
        PHONE: "0438 26 29 27",
    },
    {
        FIRSTNAME: "Apurva",
        LASTNAME: "Sah",
        ROLE: "Paid Marketing Specialist",
        EMAIL: "apurva.s@infusion121.com",
        TELEPHONE: "1300 108 507",
    },
];

// Generate HTML files
people.forEach((person) => {
    let html = template;

    // Generate PHONE_BLOCK only if PHONE exists
    const phoneBlock = person.PHONE
        ? `
<tr>
    <td style="padding-right: 8px">
        <img src="https://infusion121.com.au/email-signature/icon-phone.png" alt="Phone" width="17" height="17" style="display: block; border: 0" />
    </td>
    <td>
        <a href="tel:${person.PHONE.replace(
            /\s+/g,
            "",
        )}" style="color: #0a2d2d; text-decoration: none; font-size: 12px; white-space: nowrap;">
            ${person.PHONE}
        </a>
    </td>
</tr>
`
        : "";

    // Replace placeholders
    for (const key in person) {
        html = html.replace(new RegExp(`{{${key}}}`, "g"), person[key]);
    }
    html = html.replace(/{{PHONE_BLOCK}}/g, phoneBlock);

    // Write file
    const filename = `email-signature-${person.FIRSTNAME.toLowerCase()}.html`;
    fs.writeFileSync(path.join(distDir, filename), html, "utf8");
    console.log(`✅ Generated: ${filename}`);
});
