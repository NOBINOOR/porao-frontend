import React from 'react';
import ShuffleHero from '../hero/Hero';
import Pricing from '../pricing/Pricing';
import Stats from '../stats/Stats';
import Post from '../feature/tutor/post/Post';



const Home = () => {
    return (
        <div className="p-4 md:p-0 md:w-3/4 mx-auto ">
            <ShuffleHero></ShuffleHero>
            <Post/>
            {/* <Stats/> */}
            <Pricing/>
        </div>
    );
};

export default Home;