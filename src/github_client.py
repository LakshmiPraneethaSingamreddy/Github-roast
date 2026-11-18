import requests
import base64
import os
from dotenv import load_dotenv

class GitHubAPIError(Exception):
    """Raised when a GitHub API request fails."""
    pass

load_dotenv()

github_session = requests.Session()

github_token = os.getenv("GITHUB_TOKEN")

if github_token:
    github_session.headers.update({
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json"
    })

def make_github_request(url, params=None):
    try:
        response = github_session.get(
            url,
            params=params,
            timeout=30
        )

        if response.status_code != 200:
            raise GitHubAPIError(
                f"GitHub API returned {response.status_code}: "
                f"{response.text}"
            )

        return response.json()

    except requests.exceptions.RequestException as error:
        raise GitHubAPIError(
            f"GitHub request failed: {error}"
        ) from error

def get_repository_info(owner, repo): 
    """Fetches information about a GitHub repository."""
    url = f"https://api.github.com/repos/{owner}/{repo}"

    return make_github_request(url)

def get_tree_by_sha(owner, repo, tree_sha):
    url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{tree_sha}"

    return make_github_request(url)

def get_all_repository_files(owner, repo, tree_sha):
    tree_data = get_tree_by_sha(owner, repo, tree_sha)

    if tree_data["truncated"]:
        raise GitHubAPIError(
            f"GitHub returned an incomplete tree for SHA: {tree_sha}"
        )

    if not tree_data:
        return None

    all_files = []

    for item in tree_data["tree"]:

        if item["type"] == "blob":
            all_files.append(item)

        elif item["type"] == "tree":
            sub_files = get_all_repository_files(
                owner, repo, item["sha"]
            )

            if sub_files is None:
                return None
            for file in sub_files:
                file["path"] = item["path"] + "/" + file["path"]

            all_files.extend(sub_files)

    return all_files

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

    data = make_github_request(url)

    if data["truncated"]:
        raise GitHubAPIError(
            "GitHub returned an incomplete repository tree."
        )

    return get_all_repository_files(
        owner, repo, data["sha"]
    )


def get_file_content(owner, repo, path):
    """Fetches the content of a specific file in a GitHub repository."""
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"

    data = make_github_request(url)

    if data["type"] == "file" and data.get("encoding") == "base64":
        content = base64.b64decode(data["content"])
        return content.decode("utf-8", errors="replace")

    raise GitHubAPIError(
        f"File content is unavailable or unsupported: {path}"
    )