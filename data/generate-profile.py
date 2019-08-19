import json
from github import Github

def main():
    github_username = input("What is your Github username? : ")
    linkedin_username = input("What is your LinkedIn username? (skip if the same) : ")
    if (not linkedin_username):
        linkedin_username = github_username
    
    data = generate_data(github_username, linkedin_username)
    save_file("profile.json", data)

def generate_data(github_username, linkedin_username):
    g = Github()
    user = g.get_user(github_username)
    email = user.email or input("What is your Email address? : ")
    repositories = g.search_repositories(query="user:%s" % github_username, sort="updated")
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
                "img": "",
                "href": "https://github.com/%s" % github_username
            },
            {
                "title": "LinkedIn",
                "img": "",
                "href": "https://linkedin.com/in/%s" % linkedin_username
            },
            {
                "title": "Resume",
                "img": "",
                "href": ""
            },
            {
                "title": "Email",
                "img": "",
                "href": "mailto://%s" % email
            }
        ]
    }

    data["technologies"] = []
    for repo in repositories:
        languages = repo.get_languages()
        for language in languages:
            if not(language in data["technologies"]):
                data["technologies"].append(language)


    data["projects"] = []
    for repo in repositories:
        data["projects"].append({
            "title": repo.name.capitalize(),
            "description": repo.description,
            "image": "./img/profile.jpg",
            "languages": get_repo_languages(repo),
            "href_repository": repo.html_url,
            "href_preview": repo.homepage
        })

    return data


def get_repo_languages(repo):
    languages = []
    for language in repo.get_languages():
        languages.append(language)
    return languages

def save_file(filename, data):
    with open(filename, "w") as outfile:
        json.dump(data, outfile)
        print("Profile generated successfully!")

if __name__ == '__main__':
    main()