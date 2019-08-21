# Portfolio Profile Generator
A simple script which uses your Github profile info to quickly generate a .json file with all the portfolio information required.

## How to use
```bash
# Install the required python modules
$ pip install -r requirements.txt

# Execute the generation script
$ python3 ./generate_profile.py
```
You will be prompted to input your Github and LinkedIn usernames, as well as your contact email address. Upon complition a [profile.json](./profile.json) file will be created, containing all the information needed for the portfolio.

## Imprtant notice
Be sure to double check all the technology/language arrays outputed in order to resolve any descrepencies. The script will look for all the languages used in all repos and match this list against [a language reference](./language-reference/language-reference.json) to convert them to valid language objects (containing "data" and "image" to be displayed in the page). If the languge is missing from the reference, it will not be outputed in [profile.json](./profile.json).

## License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://angel-penchev.mit-license.org)<br>
**Copyright 2019 © Angel Penchev**