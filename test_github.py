
from src.code_analyzer import filter_source_files
from src.github_client import get_repository_info, get_repository_files, get_file_content

owner = "openai"
repo = "openai-python"

# Retrieve all repository files
files = get_repository_files(owner, repo)

if files:
    # Filter relevant source files
    filtered_files = filter_source_files(files)

    print("Total repository items:", len(files))
    print("Filtered source files:", len(filtered_files))

    print("\nFiltered file paths:\n")

    for file in filtered_files:
        print(file["path"])

