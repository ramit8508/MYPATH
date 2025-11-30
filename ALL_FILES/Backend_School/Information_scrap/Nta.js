import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const url = "https://nta.ac.in/NoticeBoardArchive"
const baseUrl = "https://nta.ac.in"; 

const fetchNotices = async () => {
    try {

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const notices = [];

        $('#noticeTable tbody tr').each((index, element) => {
            
            
            const $columns = $(element).find('td'); 

            const date = $columns.eq(1).text().trim();
            
            const $linkElement = $columns.eq(2).find('a');
            const title = $linkElement.text().trim();
            let relativeLink = $linkElement.attr('href');

            
            const link = relativeLink ? `${baseUrl}${relativeLink}` : null;

            if (title && link) {
                notices.push({ title, date, link });
            }
        });

        const filePath = path.join(process.cwd(), 'nta_notices.json');
        fs.writeFileSync(filePath, JSON.stringify(notices, null, 2));
        console.log(` Notices saved to ${filePath}`);
        console.log(`Total notices scraped: ${notices.length}`);

    } catch (error) {
        console.error(" Error fetching notices:", error.message);
    }
};

fetchNotices();
