import React from 'react';
import NewsItem from './news_list_item'

const NewsList = (props) => {
	const items = props.news.map((item) => {
		return(
				//we need a key or an id for each item if not you will get the
				//Warning each child in an array or iterator should have a unique key
				<NewsItem key= {item.category} item={item}/>
			)
	});
	
	return(
			<div> 
				{items}
			</div>
		)
}

export default NewsList;
