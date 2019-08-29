import React, { Component } from 'react';
import './Videos.css';
import data from './data.json';


class Videos extends Component {
    render() {
    	var arr = [];
	    Object.keys(data).forEach(function(key) {
	      arr.push(data[key]);
	    });
	    console.log(arr);
        return (
            <div>
                <h3>Videos</h3>
                <div className="container-video">
					<div className="row">
						<aside id="secondary" className="widget-area col-sm-12 col-lg-3 videosSB" role="complementary">
							<div className="inner">
								<a href="https://helpfortrauma.com/videos/?category=all" className="displayBlock">All Videos</a>
								<a href="https://helpfortrauma.com/videos/?category=35" className="displayBlock">For more info on ITR method</a>
								<a href="https://helpfortrauma.com/videos/?category=36" className="displayBlock">For Therapists about Trauma</a>
								<a href="https://helpfortrauma.com/videos/?category=37" className="displayBlock">Preverbal Trauma</a>
								<a href="https://helpfortrauma.com/videos/?category=38" className="displayBlock">The Instinctual Trauma Response Model</a>
								<a href="https://helpfortrauma.com/videos/?category=39" className="displayBlock">Trauma can Mimic Mental Illness</a>
								<a href="https://helpfortrauma.com/videos/?category=40" className="displayBlock">Traumatic Stress Symptoms</a>
								<a href="https://helpfortrauma.com/videos/?category=41" className="displayBlock">Voices Rooted in Trauma</a>        
								<div className="filterTitle">Filter videos by:</div>
								<a href="#" data-id="42" data-category="0" className="videoTag">60 Minutes</a>
								<a href="#" data-id="45" data-category="0" className="videoTag">cancer</a>
								<a href="#" data-id="60" data-category="0" className="videoTag">ITR Method</a> 
							</div>
						</aside>
						<section id="primary" className="content-area col-sm-12 col-lg-9 videosContentWrap">
							<main id="main" className="site-main row" role="main">
							    {arr.map((item,i) => 
									<article id="post-1297" className="col-lg-4 post-1297 post type-post status-publish format-video hentry category-for-more-info-on-itr-method post_format-post-format-video">
										<div className="entry-content videoContent">
											<a href={item.Link}></a>
											<div className="videoWrap">
												<iframe width="560" height="315" src={ item.Embed } frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
											</div>	
										</div>

										<header className="entry-header">
											<h3 className="entry-title"><a href={ item.Link } rel="bookmark">{item.Title}</a></h3>    
										</header>
								    </article>
								)}  
								<div className="paginationWrap">
									<div className="pagination">
										<span aria-current="page" className="page-numbers current">1</span>
										<a className="page-numbers" href="https://helpfortrauma.com/videos/page/2/">2</a>
										<a className="page-numbers" href="https://helpfortrauma.com/videos/page/3/">3</a>
										<a className="page-numbers" href="https://helpfortrauma.com/videos/page/4/">4</a>
										<a className="page-numbers" href="https://helpfortrauma.com/videos/page/5/">5</a>
										<a className="next page-numbers" href="https://helpfortrauma.com/videos/page/2/">Next »</a>
									</div>
								</div>      
							</main>
						</section>
		            </div>
	            </div>
            </div>
        );
    }
}

export default Videos;
