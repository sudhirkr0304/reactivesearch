<template>
	<div id="app">
		<ReactiveBase
			app="good-books-ds"
			url="https://1e47b838a035:767b5a1a-03cb-4c5f-a536-4f399c24134b@arc-cluster-appbase-tryout-k8dsnj.searchbase.io"
			:enable-appbase="true"
		>
			<DataSearch
				class="result-list-container"
				categoryField="authors.keyword"
				componentId="BookSensor"
				:dataField="['original_title', 'original_title.search']"
				:URLParams="true"
			>
				<div
					class="suggestions"
					slot="render"
					slot-scope="{
						error,
						loading,
						downshiftProps: { isOpen, highlightedIndex, getItemProps, getItemEvents },
						data: suggestions,
					}"
				>
					<ul v-if="isOpen">
						<li
							style="{ background-color: highlightedIndex ? 'grey' : 'transparent' }"
							v-for="suggestion in (suggestions || []).map(s => ({
								label: s.source.authors,
								value: s.source.authors,
								key: s._id,
							}))"
							v-bind="getItemProps({ item: suggestion })"
							v-on="getItemEvents({ item: suggestion })"
							:key="suggestion._id"
						>
							{{ suggestion.label }}
						</li>
					</ul>
				</div>
			</DataSearch>
			<ReactiveList
				componentId="SearchResult"
				data-field="original_title.keyword"
				class="result-list-container"
				:pagination="true"
				:from="0"
				:size="5"
				:react="{ and: ['BookSensor'] }"
			>
				<div slot="renderItem" slot-scope="{ item }">
					<div class="flex book-content" key="item._id">
						<img :src="item.image" alt="Book Cover" class="book-image" />
						<div class="flex column justify-center ml20">
							<div class="book-header">{{ item.original_title }}</div>
							<div class="flex column justify-space-between">
								<div>
									<div>
										by
										<span class="authors-list">{{ item.authors }}</span>
									</div>
									<div class="ratings-list flex align-center">
										<span class="stars">
											<i
												v-for="(item, index) in Array(
													item.average_rating_rounded,
												).fill('x')"
												class="fas fa-star"
												:key="index"
											/>
										</span>
										<span class="avg-rating"
											>({{ item.average_rating }} avg)</span
										>
									</div>
								</div>
								<span class="pub-year"
									>Pub {{ item.original_publication_year }}</span
								>
							</div>
						</div>
					</div>
				</div>
			</ReactiveList>
		</ReactiveBase>
	</div>
</template>

<script>
import './styles.css';

export default {
	name: 'app',
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
.suggestions {
	position: absolute;
	background-color: #ffffff;
}
</style>
