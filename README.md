# DownloadSavedRedditImages
Automatically download images from your saved Reddit posts from specified subreddits through a Tampermonkey script.

### Installation

1. Download and install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en).
2. Open the Tampermonkey dashboard (Click the Tampermonkey browser icon > "Dashboard").
3. Near the tab names and click the plus (+) icon to create a new script.
4. Copy the contents of [script.js](https://github.com/andrewtong0/DownloadSavedRedditImages/blob/main/script.js) into the new script.
5. In the `validSubreddits` array, add a list of strings from which you would like to download images from (e.g. `["pics", "aww"]`).
6. (Optional) Specify a custom name for images to be downloaded into in your downloads folder by altering the `downloadsFolderName` string.
7. Save the script and switch to the Tampermonkey settings (not the script-specific settings).
8. Change the `Config mode` to `Advanced`.
9. Scroll down to the download settings and find `Download Mode:` and set that to `Browser API`, then click `Save`.

### Usage

1. Visit your saved posts on Old Reddit (https://old.reddit.com/user/YOUR_USERNAME_HERE/saved).
2. (Optional) If using RES, scroll down to load posts to download (the script only downloads posts currently loaded in the browser).
3. Right click anywhere in the browser, hover over the "Tampermonkey" option, and click the "Reddit Download Saved Images" script.
4. All saved posts that were loaded in the browser should now be downloaded into their respective subreddit folders.
**NOTE: Downloaded posts are also UNSAVED by default. If you would like to keep downloaded posts in your saved posts, change the `shouldUnsaveDownloadedPosts` to `true`.**
