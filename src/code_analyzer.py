from github_client import get_file_content

# Supported source code extensions
SUPPORTED_EXTENSIONS = {
    ".py", ".js", ".ts", ".jsx", ".tsx",
    ".java", ".go", ".cpp", ".cs", ".rb"
}

# Directories we don't want to analyze
EXCLUDED_DIRECTORIES = {
    "node_modules",
    ".venv",
    "venv",
    "__pycache__",
    "dist",
    "build",
    ".git",
    "logs",
    "results",
    "outputs",
    "artifacts",
    "coverage",
    ".pytest_cache"
}

def filter_source_files(files):
    filtered_files = []

    for file in files:

        # Only consider actual files, not directories
        if file["type"] != "blob":
            continue

        path = file["path"]

        # Extract the file extension
        extension = "." + path.split(".")[-1].lower() if "." in path.split("/")[-1] else ""

        # Check whether the extension is supported
        if extension not in SUPPORTED_EXTENSIONS:
            continue

        # Check whether the file belongs to an excluded directory
        path_parts = path.split("/")

        if any(part in EXCLUDED_DIRECTORIES for part in path_parts):
            continue

        filtered_files.append(file)

    return filtered_files


def collect_source_code(owner, repo, files, max_files=20,
                        max_file_size=100 * 1024,
                        max_total_chars=100_000):

    source_code = []
    total_chars = 0
    files_processed = 0

    for file in files:

        # Stop after processing the maximum number of files
        if files_processed >= max_files:
            break

        # Skip files larger than our size limit
        file_size = file.get("size")

        if file_size is not None and file_size > max_file_size:
            continue

        

        path = file["path"]

        # Retrieve the actual source code
        content = get_file_content(owner, repo, path)

        if content is None:
            continue

        # Check the actual downloaded content size
        actual_size = len(content.encode("utf-8"))

        if actual_size > max_file_size:
            continue

        # Check the total content limit
        if total_chars + len(content) > max_total_chars:
            continue

        
        # Combine filename and source code
        formatted_content = f"File: {path}\n\n{content}"

        source_code.append(formatted_content)

        total_chars += len(content)
        files_processed += 1

    return "\n\n" + "\n\n".join(source_code)
