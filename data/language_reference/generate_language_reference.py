import os
import json


def main():
        save_file("language_reference.json", generate_data("../../img/icons/technologies"))

def generate_data(directory):
        directory_contents = [x[0] for x in os.walk(directory)]
        directory_contents.pop(0)
        languages = []
        for language in directory_contents:
                title = language.replace("../../img/icons/technologies/", "")
                languages.append({
                        "title": title,
                        "img": language.replace("../.", "") + "/" + title + "-original.svg"
                })

        return languages


def save_file(filename, data):
    with open(filename, "w") as outfile:
        json.dump(data, outfile)
        print("Language catalog generated successfully!")


if __name__ == '__main__':
    main()
