function YouTubeEmbed({ videoId }) {
  return (
    <div className="my-20 h-64 xl:mx-40 md:h-[50rem] bg-gray-100 flex items-center justify-center">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
export default YouTubeEmbed;
