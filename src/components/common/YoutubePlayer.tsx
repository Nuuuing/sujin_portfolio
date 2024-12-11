interface YoutubePlayerProps {
    videoId?: string;
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = (props: YoutubePlayerProps) => {
    const {videoId} = props;
    
    return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Player"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            ></iframe>
        </div>
    );
};