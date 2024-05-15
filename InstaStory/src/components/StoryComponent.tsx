import { useState, useEffect } from 'react';
import Stories from 'react-insta-stories';
import { useParams, useNavigate } from 'react-router-dom';
import storiesData from "../dataSource/storiesData";


interface StoryItem {
    category: string;
    backgroundImage: string;
    caption: string;
}

export default function StoryComponent(): JSX.Element {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const navigate = useNavigate();

    function renderStories(): any[] {
        const filteredStories = storiesData.filter((story: StoryItem) => story.category === categoryName);
        return filteredStories.map(storyItem => ({
            content: ({ action }: any) => (
                <div className="w-screen h-screen" style={{ backgroundImage: `url(${storyItem.backgroundImage})` }}>
                    <div className="text-2xl text-white mt-20 font-bold">
                        <span>{storyItem.caption}</span>
                    </div>
                </div>
            )
        }));
    }

    const goToNextStory = () => {
        if (!isPaused) {
            setCurrentStoryIndex(prevIndex => (prevIndex + 1) % storiesData.length);
        }
    };

    const goToPreviousStory = () => {
        if (!isPaused) {
            setCurrentStoryIndex(prevIndex => (prevIndex - 1 + storiesData.length) % storiesData.length);
        }
    };

    const togglePause = () => {
        setIsPaused(prev => {
            if (!prev) {
                setCurrentStoryIndex(0);
            }
            return !prev;
        });
    };

    useEffect(() => {
        let storyTimer: NodeJS.Timeout;
        if (!isPaused) {
            
            storyTimer = setTimeout(() => {
                navigate('/'); 
            }, storiesData.length * 5000); 
        }

        
        return () => clearTimeout(storyTimer);
    }, [isPaused, navigate]);

    return (
        <div>
            <div className="flex justify-center items-center mt-10">
                <div className="flex justify-center items-center w-20 h-full text-black text-4xl absolute z-10 mr-[280px]" onClick={goToPreviousStory}>
                    
                </div>
                <Stories stories={renderStories()} currentIndex={currentStoryIndex} defaultInterval={5000} onAllStoriesEnd={() => navigate('/')} />
                <div className="flex justify-center items-center w-20 h-full text-black text-4xl absolute z-10 ml-[280px]" onClick={goToNextStory}>
                    
                </div>
                
            </div>
        </div>
    );
}
