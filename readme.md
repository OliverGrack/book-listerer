# Book listerer
An userscript to export the wish list from thalia.at. 

## How to use
1. Download [Tampermonkey](https://www.tampermonkey.net/) or a similar user script addon.
2. Copy the script from [dist/index.prod.user.js](dist/index.prod.user.js) 
  and paste it into a new user script in Tampermonkey.
3. Visit [https://www.thalia.at/shop/home/merkliste/](https://www.thalia.at/shop/home/merkliste/).
4. There should be a `Export` button in the top left corner. Click it.
5. After quite some time, depending on your internet and device speed, there will be 2 buttons: `Download as CSV` and `Download as JSON`.
6. If you want to import the data to excel press `Download as CSV` and save it somewhere
7. Do not directly click on the file, but rather open up excel, 
  and under `Data > Data from Text/CSV` import the file.

## Develop
This project is based on the [typescript userscript template by Trim21](https://github.com/Trim21/webpack-userscript-template).
Checkout [readme_typescript_user_script_template.md](readme_typescript_user_script_template.md)
