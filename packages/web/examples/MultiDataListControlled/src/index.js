import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	MultiDataList,
	ResultList,
	SelectedFilters,
	ReactiveList,
} from '@appbaseio/reactivesearch';

import './index.css';

const Main = () => {
	const [values, setValues] = useState([]);
	return (
		<ReactiveBase
			app="meetup_app"
			url="https://xe6N9nDRV:51ea7a8a-6354-4b5f-83e1-12dce3b7ec47@arc-cluster-appbase-demo-ps1pgt.searchbase.io"
			enableAppbase
		>
			<div className="row">
				<div className="col">
					{/* controlled component */}
					<MultiDataList
						title="MultiDataList"
						componentId="CitySensor"
						dataField="group.group_topics.topic_name_raw.keyword"
						data={[
							{
								label: 'Open Source',
								value: 'Open Source',
							},
							{
								label: 'Social',
								value: 'Social',
							},
							{
								label: 'Adventure',
								value: 'Adventure',
							},
							{
								label: 'Music',
								value: 'Music',
							},
						]}
						value={values}
						onChange={setValues}
					/>
				</div>
				<div className="col">
					<SelectedFilters />
					<ReactiveList
						componentId="SearchResult"
						dataField="group.group_topics.topic_name_raw.keyword"
						title="Results"
						sortBy="asc"
						className="result-list-container"
						from={0}
						size={5}
						innerClass={{
							image: 'meetup-list-image',
						}}
						pagination
						react={{
							and: ['CitySensor'],
						}}
						render={({ data }) => (
							<ReactiveList.ResultListWrapper>
								{data.map(item => (
									<ResultList href={item.event.event_url} key={item._id}>
										<ResultList.Image small src={item.member.photo} />
										<ResultList.Content>
											<ResultList.Title>
												<div className="meetup-title">
													{item.member ? item.member.member_name : ''} is
													going to $
													{item.event ? item.event.event_name : ''}
												</div>
											</ResultList.Title>
											<ResultList.Description>
												<div className="flex column">
													<div className="meetup-location">
														<span className="location">
															<i className="fas fa-map-marker-alt" />
														</span>
														{item.group ? item.group.group_city : ''}
													</div>
													<div className="flex wrap meetup-topics">
														{item.group.group_topics
															.slice(0, 4)
															.map(tag => (
																<div
																	className="meetup-topic"
																	key={tag.topic_name}
																>
																	{tag.topic_name}
																</div>
															))}
													</div>
												</div>
											</ResultList.Description>
										</ResultList.Content>
									</ResultList>
								))}
							</ReactiveList.ResultListWrapper>
						)}
					/>
				</div>
			</div>
		</ReactiveBase>
	);
};

ReactDOM.render(<Main />, document.getElementById('root'));