import streamlit as st
from urllib.parse import urlparse
from github_client import get_repository_info,get_repository_files,GitHubAPIError
from code_analyzer import filter_source_files,collect_source_code
from ai_reviewer import review_repository, AIReviewError


st.set_page_config(
    page_title="AI Roast My GitHub",
    page_icon="🔥",
    layout="wide"
)

st.title("🔥 AI Roast My GitHub")

st.write(
    "Enter your GitHub repository URL and let AI analyze "
    "your code, identify issues, and roast your coding style."
)
st.info(
    "🔒 Privacy Notice: Repository source code will be sent "
    "to OpenAI's API to generate your code review. "
    "Please ensure you have permission to share this code "
    "and do not submit repositories containing sensitive information."
)
consent = st.checkbox(
    "I understand that my repository source code will be "
    "sent to OpenAI for analysis."
)

with st.form("repository_form"):
    repo_url = st.text_input(
        "GitHub Repository URL",
        placeholder="https://github.com/username/repository"
    )

    analyze_button = st.form_submit_button(
        "🔥 Analyze Repository",
        type="primary",
        use_container_width=True
    )

results_area = st.empty()

if analyze_button:
    with results_area.container():
        if not consent:
            st.warning("Please provide consent before analyzing the repository.")
            st.stop()

        if not repo_url:
            st.warning("Please enter a GitHub repository URL.")
            st.stop()

        parsed_url = urlparse(repo_url.strip())
        path_parts = parsed_url.path.strip("/").split("/")

        if (
            parsed_url.scheme != "https"
            or parsed_url.netloc.lower() != "github.com"
            or len(path_parts) != 2
            or not all(path_parts)
        ):
            st.error("Please enter a valid GitHub repository URL.")
            st.stop()

        owner = path_parts[0]
        repo = path_parts[1].removesuffix(".git")

        st.success("GitHub URL validated successfully!")
        try:
            #retrieve the repository information
            repo_info = get_repository_info(owner, repo)

            st.subheader("Repository Information")
            st.write(f"**Repository:** {repo_info['full_name']}")
            st.write(f"**Description:** {repo_info['description']}")
            st.write(f"**Language:** {repo_info['language']}")
            st.write(f"**Stars:** {repo_info['stargazers_count']}")
            st.write(f"**Forks:** {repo_info['forks_count']}")
            st.write(f"**Default Branch:** {repo_info['default_branch']}")

            #retrieve and filter repository files
            with st.spinner("Retrieving repository files..."):
            
                all_files = get_repository_files(owner, repo)
        
                source_files = filter_source_files(all_files)
        
            st.success("Repository files retrieved successfully!")
        
            st.write(f"Total repository files: {len(all_files)}")
            st.write(f"Supported source files: {len(source_files)}")

            #collect source code from the filtered files
            with st.spinner("Collecting source code..."):
                    source_code = collect_source_code( owner, repo, source_files)
            st.success("Source code collected successfully!")
            st.write(f"Total characters in source code: {len(source_code)}")

            # Check whether source code was collected
            if not source_code.strip():
                st.warning(
                    "No supported source code files were found "
                    "in this repository."
                )
                st.stop()

        except GitHubAPIError as error:
            st.error(f"Unable to retrieve repository: {error}")
            st.stop()

        # Step 5: Send source code to OpenAI for review
        try:
            with st.spinner("AI is reviewing your repository..."):
                review = review_repository(source_code)

            st.success("AI review completed!")

            st.subheader("🤖 AI Code Review")
            st.markdown(review)

        except AIReviewError as error:
            st.error(f"Unable to complete AI review: {error}")
            st.stop()

    