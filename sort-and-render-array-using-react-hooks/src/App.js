import React, {useState} from 'react';
import './App.css';
import 'h8k-components';
import {orderBy} from 'lodash';


import Articles from './components/Articles';

const title = "Sorting Articles";


function App({articles}) {


    const [articlesList, setArticlesList] = useState(orderBy(articles, ['upvotes'], 'desc'));


    const handleMostUpdoots = () => {
        setArticlesList(orderBy(articlesList, ['upvotes'], ['desc']));
    };

    const handleMostRecent = () => {
        setArticlesList(orderBy(articlesList, ['date'], ['desc']));
    };


    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" className="small" onClick={handleMostUpdoots}>Most Upvoted</button>
                <button data-testid="most-recent-link" className="small" onClick={handleMostRecent}>Most Recent</button>
            </div>
            <Articles articles={articlesList}/>
        </div>
    );

}

export default App;
