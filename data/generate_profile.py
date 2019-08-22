# For "AttributeError: 'dict' object has no attribute 'iteritems'" check the solution provided here:
# https://stackoverflow.com/questions/30418481/error-dict-object-has-no-attribute-iteritems

import json
from github import Github
from bunch import bunchify

def main():
    github_username = input("What is your Github username? : ")
    linkedin_username = input("What is your LinkedIn username? (skip if the same) : ")
    if (not linkedin_username):
        linkedin_username = github_username
    
    save_file("profile.json", generate_data(github_username, linkedin_username))

def generate_data(github_username, linkedin_username):
    g = Github()
    user = g.get_user(github_username)
    email = user.email or input("What is your Email address? : ")
    repositories = g.search_repositories(query="user:%s" % github_username, sort="updated")
    language_reference_dict = json.load(open("language_reference/language_reference.json", "r"))
    language_reference = []
    for language in language_reference_dict:
        language_reference.append(bunchify(language))
    data = {}

    data["user"] = {
        "name": user.name,
        "description": user.bio,
        "picture": user.avatar_url,
        "location": user.location,
        "email": email,
        "links": [
            {
                "title": "Github",
                "img": "./img/icons/technologies/github/github-original.svg",
                "href": "https://github.com/%s" % github_username
            },
            {
                "title": "LinkedIn",
                "img": "./img/icons/technologies/linkedin/linkedin-original.svg",
                "href": "https://linkedin.com/in/%s" % linkedin_username
            },
            {
                "title": "Resume",
                "img": "./img/icons/misc/resume/resume.png",
                "href": ""
            },
            {
                "title": "Email",
                "img": "./img/icons/misc/email/email.png",
                "href": "mailto:%s" % email
            }
        ]
    }

    content = [];
    for repo in repositories:
        languages = repo.get_languages()
        for language in languages:
            if not(language_catalog(language_reference, language) in content):
                content.append(language_catalog(language_reference, language))
    
    data["technologies"] = [
        {
            "title": "Uncategorised",
            "content": content
        }
    ]
    


    data["projects"] = []
    for repo in repositories:
        languages = []
        for language in repo.get_languages():
            languages.append(language_catalog(language_reference, language))

        data["projects"].append({
            "title": repo.name.capitalize(),
            "description": repo.description,
            "image": "./img/profile.jpg",
            "languages": languages,
            "href_repository": repo.html_url,
            "href_preview": repo.homepage
        })

        
    return data


def get_repo_languages(repo):
    languages = []
    for language in repo.get_languages():
        languages.append(language)
    return languages


def language_catalog(reference, language):
    for i in reference:
        if i.title.lower() == language.lower():
            i.title = language
            return i


def save_file(filename, data):
    with open(filename, "w") as outfile:
        json.dump(data, outfile)
        print("Profile generated successfully!")


if __name__ == '__main__':
    main()