<template>
	<div class="container">
		<textarea
			class="content"
			v-model="content"
			autofocus
			maxlength="150"
			wrap="soft"
			placeholder="请随便写点什么吧~"
			required
		>
		</textarea>
		<div class="notice">最多发布九张图片</div>
		<div class="images-wrapper">
			<div 
				v-show="imgSrcList.length"
				class="image-item-box" 
				v-for="(item,index) of imgSrcList"
				:key="index"
			>
				<div 
					class="icon-delete-box"
					@click="removeImageItem(index)"
				>
					<i class="iconfont icon-shanchu"></i>
				</div>
				<img class="image" :src="item" />
			</div>
			<div class="add-image-padding">
				<div 
					v-show="showAddImgIcon"
					class="add-image" 
					@click="$refs.file.click()"
				>
					<i class="iconfont icon-tianjia"></i>
					<input 
						ref="file" 
						type="file" 
						@change="uploadHandle" 
						multiple 
						hidden
					>
				</div>
			</div>
		</div>
		<div class="footer">
			<button class="submit" @click="submitHandle">发布</button>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import blogAPI from '../api/blog'

export default {
	component: {
		[Toast.name]: Toast,
	},

	setup(){
		const router = useRouter()
		const content = ref('')
		const imgSrcList = ref([])
		const imgFileList = []
		const allowImgType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
		// 最大图片上传大小, 5M
		const maxImgSize = 1024*1024*5
		// 做多允许上传的图片数量
		const maxImgCounts = 9

		const showAddImgIcon = computed(() => imgFileList.length < maxImgCounts)

		const submitHandle = () => {
			if ( !content.value.trim() ){
				return Toast('请随便写点什么吧')
			}
			if ( imgFileList.length < 1 ) {
				return Toast('请选择要上传的图片')
			}
			if ( imgFileList.length > maxImgCounts ){
				return Toast('最多只能上传9张图片')
			}

			Toast.loading({
        duration: 0,
        message: '发布中...',
        forbidClick: true,
      });

			const formData = new FormData()

			Array.from(imgFileList).map((file)=>{
				formData.append('file[]', file);
			})

			blogAPI.upload(formData).then(res => {
				const images = res.data

				blogAPI.add({
					images, 
					content: content.value,
				}).then(() => {
					Toast.success('发布成功')
					Toast.clear()
					router.push('/blog')
				})
			})
		}

		// validate image type
		const validType = (type) => {
			return allowImgType.indexOf(type) !== -1
		}

		// validate image size
		const validMaxSize = (size) => {
			return size <= maxImgSize
		}

		const uploadHandle = (e) => {
			const files = e.target.files

			if ( files.length > maxImgCounts || imgFileList.length > maxImgCounts ){
				return Toast('最多只能上传9张图片')
			}
			
			for ( const file of files ){
				if ( !validType(file.type) ){
					return Toast('图片类型错误')
				}
				if ( !validMaxSize(file.size) ){
					return Toast('图片大小不能超过1M')
				}
				const reader = new FileReader()
				// Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
				reader.readAsDataURL(file)
				// A handler for the load event. This event is triggered each time the reading operation is successfully completed.
				reader.onload = ()=>{
					imgSrcList.value.push(reader.result)
				}
				imgFileList.push(file)
			}
			// solving can't upload the same image
			e.target.value = null
		}

		const removeImageItem = (index) => {
			imgSrcList.value.splice(index, 1)
			imgFileList.splice(index, 1)
		}

		return {
			content,
			imgSrcList,
			showAddImgIcon,
			submitHandle,
			uploadHandle,
			removeImageItem,
		}
	},
}	
</script>

<style lang="stylus" scoped>
@import '../assets/styles/variables.styl'

.container
	overflow: hidden
.content
	width: 100%
	height: 150px
	border: none
	padding: 10px
	font-size: 15px
	color: #666
	box-sizing: border-box
.notice
	padding: 10px
	font-size: 15px
	color: #666
.images-wrapper
	display: flex
	flex-wrap: wrap
.image-item-box
	position: relative
	.icon-delete-box
		position: absolute
		top: 5px
		right: 5px
		height: 20px
		width: 20px
		border-bottom-left-radius: 15px
		background: rgba(0,0,0,.7)
	.icon-delete-box .icon-shanchu
		position: absolute
		top: 2px 
		right: 2px
		font-size: 12px
		color: #fff
.image-item-box, .add-image-padding
	height: 100px
	width: 100px
	padding: 5px
.image-item-box .image, .add-image-padding .add-image
	height: inherit
	width: inherit
.add-image-padding .add-image
	border: 1px dotted #ccc
	box-sizing: border-box
	display: flex
	align-items: center
	justify-content: center
	.icon-tianjia
		font-size: 25px
		color: #ccc

.footer .submit	
	position: fixed
	bottom: 60px
	right: 20px
	padding: 10px 20px
	font-size: 13px
	border-radius: 15px
	border: none
	background: $activeGreen
	color: #fff
</style>