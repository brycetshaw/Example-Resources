import React, {useState} from 'react';

function Slides({slides}) {

const [{index}, setState] = useState({index:0})


    function handleRestart() {
        setState({index:0});
    }

    function handlePrev() {
        setState({index:index-1});
    }

    function handleNext() {
        setState({index:index+1});
    }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button
                    data-testid="button-restart"
                    className="small outlined"
                    onClick={handleRestart}
                    disabled={index===0}
                >Restart</button>
                <button data-testid="button-prev"
                        className="small"
                        onClick={handlePrev}
                        disabled={index === 0}
                >Prev</button>
                <button
                    data-testid="button-next"
                    className="small"
                    onClick={handleNext}
                    disabled={index === slides.length-1}
                >Next</button>
            </div>
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{slides[index].title}</h1>
                <p data-testid="text">{slides[index].text}</p>
            </div>
        </div>
    );

}

export default Slides;
