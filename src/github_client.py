import requests
import base64


def get_repository_info(owner, repo): 
    """Fetches information about a GitHub repository."""
    url = f"https://api.github.com/repos/{owner}/{repo}"

    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.status_code)
        return None



def get_repository_files(owner, repo):
    """Fetches the file structure of a GitHub repository."""
    # Get repository information
    repo_info = get_repository_info(owner, repo)

    if not repo_info:
        return None

    # Identify the default branch
    branch = repo_info["default_branch"]

    # Construct the GitHub API URL
    url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}"

    # Request the complete file structure
    response = requests.get(url, params={"recursive": "1"})

    if response.status_code == 200:
        data = response.json()
        return data["tree"]
    else:
        print("Error retrieving repository files:", response.status_code)
        return None


def get_file_content(owner, repo, path):
    """Fetches the content of a specific file in a GitHub repository."""
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"

    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()

        if data["type"] == "file" and data.get("encoding") == "base64":
            content = base64.b64decode(data["content"])
            return content.decode("utf-8", errors="replace")

        print("File content is unavailable or unsupported.")
        return None

    else:
        print("Error retrieving file:", response.status_code)
        return None
