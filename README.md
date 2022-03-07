# tolerable-twitter
Small dirty extensions to change some of twitter interface

## Design
None.
UI elements are detected in the crudest way possible.
The script loop every second to try to find more stuff to remove.
Elements are merely hidden, if they are found at all.
Some parts only work in some locales.

## What it does

- hide the trending panel (english/french only)
- remove the blurry filter on images/video that you can't remove with a regular twitter setting for some reasons
- hide the message panel in the bottom right

## Installation

If you want to use that script, first install [Tampermonkey](https://www.tampermonkey.net/), then go to the gist (it is a copy of this repository, for installation purpose:
[gist link](https://gist.github.com/CleyFaye/7dafdad77c11d47f8038db3a5d7800cd/raw/bea9b605ef313c2bbb8c4289d890e99dcc507597/tolerable-twitter.user.js).
Tampermonkey should automatically asks if you want to install the script.
