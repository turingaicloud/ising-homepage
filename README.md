iSING Lab Homepage
=====


### Updating Content (News, Publications and People)
The iSING Lab homepage separates rendering logic from data. The data is stored in JSON files in the `data` directory. The rendering is done in the `index.html` file. 

To update the content, simply make changes to the data files (`data-news.json`, `data-publications.json` or `data-members.json`) to add new entries on iSING Lab homepage.

As a safety measure, all changes to website should be done on a separate branch. Please fork your own branch and **send a pull request** to the `master` branch.

#### Updating data-news.json
Please add your news to the beginning of the JSON array. The first 8 news is visable on the website.

#### Updating data-members.json
Please first upload your photo (square image is preferred) to the `./members` directory and add a coresponding entry at your desired location in the JSON array.

#### Updating data-publications.json
Please add your publication to a proper location in the JSON array.




