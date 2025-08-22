from pytube import YouTube

# Function to download video
def download_video(url, save_path="."):
    try:
        yt = YouTube(url)
        # Get the highest resolution stream
        stream = yt.streams.get_highest_resolution()
        print(f"Downloading: {yt.title}")
        stream.download(output_path=save_path)
        print("Download completed!")
    except Exception as e:
        print(f"Error: {e}")

# Replace with your YouTube URL
video_url = "https://youtube.com/shorts/s9QMumTPrWQ?si=v8FJyaRf9FVQRye3"
download_video(video_url)
