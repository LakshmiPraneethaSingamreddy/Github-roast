
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
        extension = "." + path.split(".")[-1] if "." in path.split("/")[-1] else ""

        # Check whether the extension is supported
        if extension not in SUPPORTED_EXTENSIONS:
            continue

        # Check whether the file belongs to an excluded directory
        path_parts = path.split("/")

        if any(part in EXCLUDED_DIRECTORIES for part in path_parts):
            continue

        filtered_files.append(file)

    return filtered_files
