from src.github_client import get_repository_files
from src.code_analyzer import (
    filter_source_files,
    collect_source_code
)
from src.ai_reviewer import review_repository

owner = "LakshmiPraneethaSingamreddy"
repo = "github-roast"

files = get_repository_files(owner, repo)

if files:
    filtered_files = filter_source_files(files)

    source_code = collect_source_code(
        owner, repo, filtered_files
    )

    review = review_repository(source_code)

    print("\nAI CODE REVIEW:\n")
    print(review)