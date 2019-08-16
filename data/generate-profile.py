import json
from github import Github


# username = "angel-penchev"

def main():
    username = input("What is your Github username? : ")
    data = generate_data(username)
    save_file("profile.json", data)

def generate_data(username):
    g = Github()
    user = g.get_user(username)
    repositories = g.search_repositories(query="user:%s" % username, sort="updated")
    data = {}

    data["user"] = {
        "name": user.name,
        "description": user.bio,
        "profile-picture": user.avatar_url,
        "location": user.location,
        "links": [
            {
                "title": "Github",
                "img": "",
                "href": "https://github.com/%s" % username
            },
            {
                "title": "LinkedIn",
                "img": "",
                "href": "https://linkedin.com/in/%s" % input("What is your LinkedIn username? (optional) : ")
            },
            {
                "title": "Resume",
                "img": "",
                "href": ""
            },
            {
                "title": "Email",
                "img": "",
                "href": "mailto://%s" % input("What is your Email address? (optional) : ")
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
            "name": repo.name.capitalize(),
            "description": repo.description,
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