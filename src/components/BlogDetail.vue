<template>
	<div class="container">
		<div class="blog-detail">
			<blog-card :blog="blog" />
		</div>
		<div class="comment-wrapper">
			<div class="header">
				<div class="title">
					评论区
					<span class="comment-count">12</span>
				</div>
				<div class="order-category">
					<ul>
						<li class="time">时间</li>
						<li class="hot">热门</li>
					</ul>
				</div>
			</div>
			<div class="comment-list">
				
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BlogCard from './BlogCard.vue'
import blogAPI from '../api/blog'

export default {
	components: {
		BlogCard,
	},

	setup(){
		const route = useRoute()
		const blog = ref(null)

		const getBlogDetail = () => {
			blogAPI.detail({
				id: route.params.id
			}).then(res => {
				blog.value = res.data
			})
		}

		getBlogDetail()

		return {
			blog,
		}
	},
}
</script>

<style lang="stylus" scoped>
@import '../assets/styles/variables.styl' 

.container 
	height: 100vh
	background: $backgroundGrey
.comment-wrapper
	margin-top: 10px
	background: #fff
	.header
		display: flex
		padding: 20px 10px
	.header .title
		flex: 1
		font-weight: 600
		font-size: 15px
		.comment-count
			font-weight: normal
			color: #777
			letter-spacing: .8px
	.header .order-category
		width: 150px
		font-size: 14px
		ul 
			display: flex
			flex-direction: row-reverse
		ul li
			padding: 0 15px
			color: #444
		li + li 
			border-right: 1px solid #ccc
</style>