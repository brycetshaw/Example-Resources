import React , {useState} from 'react';

function Articles({articles}) {

    return (
        <div className="card w-50 mx-auto">
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Upvotes</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((item, i) =>
                    <tr data-testid={item} key={i}>
                        <td data-testid="article-title">{item.title}</td>
                        <td data-testid="article-upvotes">{item.upvotes}</td>
                        <td data-testid="article-date">{item.date}</td>
                    </tr>)
                }

                </tbody>
            </table>
        </div>
    );

}

export default Articles;
