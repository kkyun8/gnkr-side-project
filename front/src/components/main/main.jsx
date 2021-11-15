import React from 'react';
import Banner from '../banner/banner';
import Nav from '../nav/nav';
import Tag from '../contents/tag/tag';
import Loading from '../common/loading';
import Feed from '../contents/feed/feed';

const Main = ({loading, data}) => {
    return (
        <>
            <Banner/>
            <Nav/>
            <div className='main_contain'>
                <section className='feed_contain'>
                    <ul>
                        {loading === undefined ? <Loading/> : data?.map(feed => <Feed key={feed.id} feed={feed} />)}
                    </ul>
                </section>
                <Tag/>
            </div>
        </>
    );
}

export default Main;